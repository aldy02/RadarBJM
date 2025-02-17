# Aplikasi Penjualan Ruang Iklan Di Koran RadarBJM

Aplikasi **Penjualan Ruang Iklan Di Koran RadarBJM** adalah sebuah proyek berbasis **Node.js**, **Express**, dan **React** yang memerlukan **database MySQL**. Project ini menggunakan **TailwindCSS** untuk styling dan **Framer-Motion** untuk animasi. Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi ini di lokal.

---

## **Persyaratan**
Sebelum menjalankan aplikasi, pastikan Anda sudah menginstal:
1. **Node.js** (Minimal versi 14) → [Download Node.js](https://nodejs.org/)
2. **Git & Git Bash** → [Download Git](https://git-scm.com/)
3. **XAMPP** (untuk menjalankan Apache dan MySQL) → [Download XAMPP](https://www.apachefriends.org/)
4. **Visual Studio Code (VS Code)** → [Download VS Code](https://code.visualstudio.com/)

### **Cara Mengecek Instalasi**
Setelah menginstal **Node.js** dan **Git**, pastikan mereka telah terinstal dengan menjalankan perintah berikut di terminal (**Git Bash** atau **Command Prompt**):

```sh
node -v  # Mengecek versi Node.js
git --version  # Mengecek versi Git
```

Jika perintah di atas menampilkan versi yang valid, berarti instalasi berhasil.

---

## **Langkah-Langkah Menjalankan Aplikasi**

### **1. Clone Repository**
Buka **Visual Studio Code** dan jalankan terminal, lalu clone repository menggunakan HTTPS:

```sh
git clone https://github.com/username/repository-radarbjm.git
```

Setelah cloning selesai, masuk ke folder proyek:

```sh
cd repository-radarbjm
```

### **2. Import Database ke phpMyAdmin**
- Buka **XAMPP**, lalu nyalakan **Apache** dan **MySQL**.
- Akses **phpMyAdmin** melalui browser: `http://localhost/phpmyadmin`
- **Import** file database (`radarbjm.sql`) yang ada di dalam folder repository.

### **3. Jalankan Backend**
- Buka **Git Bash** dan masuk ke folder backend:

```sh
cd Backend/
```

- Install dependensi backend dengan perintah:

```sh
npm install
```

- Jalankan server backend:

```sh
node server.js
```

Jika berhasil, server backend akan berjalan dan menampilkan pesan seperti:

```sh
Server running on port 5000
```

### **4. Jalankan Frontend**
- Buka terminal baru dan masuk ke folder frontend:

```sh
cd ../Frontend/
```

- Install dependensi frontend:

```sh
npm install
```

- Jalankan aplikasi frontend:

```sh
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000/` (atau port lain yang ditampilkan di terminal).

---

## **Selesai!** 🎉
Sekarang aplikasi **RadarBJM** sudah berjalan di lokal. Jika ada masalah, pastikan semua langkah diikuti dengan benar.

---

## **Troubleshooting**
Jika mengalami kendala:
- **Backend tidak berjalan?** Cek apakah **Node.js** sudah diinstal dan port 5000 tidak sedang digunakan.
- **Database error?** Pastikan database sudah di-import dan MySQL sedang berjalan.
- **Frontend tidak muncul?** Pastikan tidak ada error di terminal dan semua dependensi sudah diinstal.

Jika masih mengalami kendala, silakan cek dokumentasi tambahan atau ajukan pertanyaan di issue repository ini.

---

**Happy Coding! 🚀**

