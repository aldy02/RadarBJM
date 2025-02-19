require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const verifyToken = require("./middleware/auth"); // Import middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Menyajikan gambar secara publik

// Koneksi ke database MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// API: Login User
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Buat URL lengkap untuk avatar
        const avatarUrl = user.photo ? `http://localhost:5000${user.photo}` : null;

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, avatar: avatarUrl }, // Tambahkan role ke token
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, avatar: avatarUrl, role: user.role }); // Kirim role ke frontend
    });
});

// API: GET semua iklan
app.get("/api/produk", (req, res) => {
    const query = "SELECT * FROM produk_iklan";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Gagal mengambil data" });
        }

        // Pastikan harga di-parse jika masih berupa string
        const parsedResults = results.map(item => ({
            ...item,
            harga: typeof item.harga === "string" ? JSON.parse(item.harga) : item.harga,
            image: `http://localhost:5000${item.image}`
        }));

        res.json(parsedResults);
    });
});

// API: Menyimpan Pesanan (POST)
app.post("/api/pesan", verifyToken, (req, res) => {
    const { nama, alamat, kota, kodePos, paket, ukuran, durasi, metodePembayaran, total_harga } = req.body;
    const user_id = req.user.id; // Ambil user_id dari token

    if (!nama || !alamat || !kota || !kodePos || !paket || !ukuran || !durasi || !metodePembayaran || !total_harga) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = `
        INSERT INTO pesanan (user_id, nama, alamat, kota, kode_pos, paket, ukuran, durasi, metode_pembayaran, total_harga, status, created_at, expired_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW() + INTERVAL 72 HOUR)
    `;

    db.query(query, [user_id, nama, alamat, kota, kodePos, paket, ukuran, durasi, metodePembayaran, total_harga], (err, result) => {
        if (err) {
            console.error("Gagal menyimpan pesanan:", err);
            return res.status(500).json({ error: "Gagal menyimpan pesanan" });
        }
        res.status(201).json({ message: "Pesanan berhasil dibuat", orderId: result.insertId });
    });
});

// API: GET semua pengguna
app.get("/api/users", (req, res) => {
    const query = "SELECT id, email, username, gender, address, city, photo, role FROM users";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Gagal mengambil data pengguna:", err);
            return res.status(500).json({ error: "Gagal mengambil data pengguna" });
        }

        // Format data
        const users = results.map(user => ({
            ...user,
            photo: user.photo ? `http://localhost:5000${user.photo}` : null
        }));

        res.json(users);
    });
});

// API: Update user data (PUT)
app.put("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const { email, username, gender, address, city, photo, role } = req.body;

    // Validasi input
    if (!email || !username || !gender || !address || !city || !role) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    // Ambil foto lama dari database jika tidak ada foto baru yang dikirimkan
    const getUserQuery = `SELECT photo FROM users WHERE id = ?`;
    db.query(getUserQuery, [userId], (err, result) => {
        if (err) {
            console.error("Gagal mengambil data pengguna:", err);
            return res.status(500).json({ error: "Gagal mengambil data pengguna" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Pengguna tidak ditemukan" });
        }

        // Jika tidak ada foto baru, gunakan foto lama
        const currentPhoto = photo || result[0].photo;

        const updateQuery = `
            UPDATE users
            SET email = ?, username = ?, gender = ?, address = ?, city = ?, photo = ?, role = ?
            WHERE id = ?
        `;

        db.query(updateQuery, [email, username, gender, address, city, currentPhoto, role, userId], (err, result) => {
            if (err) {
                console.error("Gagal memperbarui data pengguna:", err);
                return res.status(500).json({ error: "Gagal memperbarui data pengguna" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Pengguna tidak ditemukan" });
            }

            res.json({ message: "Data pengguna berhasil diperbarui" });
        });
    });
});

// API: Update data pesanan
app.put("/api/pesanan/:id", (req, res) => {
    const orderId = req.params.id;
    const { nama, alamat, kota, status } = req.body;

    if (!nama || !alamat || !kota || !status) {
        return res.status(400).json({ error: "Nama, alamat, kota, dan status harus diisi" });
    }

    const validStatuses = ["pending", "paid", "canceled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Status tidak valid" });
    }

    const updateQuery = `
        UPDATE pesanan
        SET nama = ?, alamat = ?, kota = ?, status = ?
        WHERE id = ?
    `;

    db.query(updateQuery, [nama, alamat, kota, status, orderId], (err, result) => {
        if (err) {
            console.error("Gagal memperbarui pesanan:", err);
            return res.status(500).json({ error: "Gagal memperbarui pesanan" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pesanan tidak ditemukan" });
        }

        res.json({ message: "Pesanan berhasil diperbarui", status });
    });
});

// API: Hapus pengguna berdasarkan ID
app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    const deleteQuery = "DELETE FROM users WHERE id = ?";
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            console.error("Gagal menghapus pengguna:", err);
            return res.status(500).json({ error: "Gagal menghapus pengguna" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pengguna tidak ditemukan" });
        }

        res.json({ message: "Pengguna berhasil dihapus" });
    });
});

// API: Get data pesanan
app.get("/api/pesanan", (req, res) => {
    const query = "SELECT * FROM pesanan";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching data", error: err });
        }
        res.json(results);
    });
});

// API: Hapus pesanan berdasarkan ID
app.delete("/api/pesanan/:id", (req, res) => {
    const orderId = req.params.id;

    const deleteQuery = "DELETE FROM pesanan WHERE id = ?";
    db.query(deleteQuery, [orderId], (err, result) => {
        if (err) {
            console.error("Gagal menghapus pesanan:", err);
            return res.status(500).json({ error: "Gagal menghapus pesanan" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pesanan tidak ditemukan" });
        }

        res.json({ message: "Pesanan berhasil dihapus" });
    });
});

// API: Get produk data untuk admin
app.get("/api/produk", (req, res) => {
    const query = "SELECT * FROM produk_iklan";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Gagal mengambil data" });
        }

        const parsedResults = results.map(item => ({
            ...item,
            harga: item.harga ? JSON.parse(item.harga) : item.harga
        }));

        res.json(parsedResults);
    });
});

// API: Edit produk tanpa mengubah harga
app.put("/api/produk/:id", (req, res) => {
    const produkId = req.params.id;
    const { paket, tipe, durasi } = req.body;

    if (!paket || !tipe || !durasi) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const updateQuery = `
        UPDATE produk_iklan 
        SET paket = ?, tipe = ?, durasi = ?
        WHERE id = ?
    `;

    db.query(updateQuery, [paket, tipe, durasi, produkId], (err, result) => {
        if (err) {
            console.error("Gagal mengupdate produk:", err);
            return res.status(500).json({ error: "Gagal mengupdate produk" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produk tidak ditemukan" });
        }

        res.json({ message: "Produk berhasil diperbarui" });
    });
});

// API: Hapus produk berdasarkan ID
app.delete("/api/produk/:id", (req, res) => {
    const produkId = req.params.id;

    const deleteQuery = "DELETE FROM produk_iklan WHERE id = ?";

    db.query(deleteQuery, [produkId], (err, result) => {
        if (err) {
            console.error("Gagal menghapus produk:", err);
            return res.status(500).json({ error: "Gagal menghapus produk" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produk tidak ditemukan" });
        }

        res.json({ message: "Produk berhasil dihapus" });
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});