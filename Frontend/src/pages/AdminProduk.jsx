import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavbarAdmin from "../components/navbaradmin";

export default function AdminProduk() {
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editProduk, setEditProduk] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/produk")
            .then(response => {
                setProduk(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Gagal mengambil data produk:", error);
                setLoading(false);
            });
    }, []);

    const handleEditClick = (produk) => {
        setEditProduk(produk);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        setEditProduk({ ...editProduk, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                paket: editProduk.paket,
                tipe: editProduk.tipe,
                durasi: editProduk.durasi,
                harga: Array.isArray(editProduk.harga) 
                    ? editProduk.harga.map(h => ({ ukuran: h.ukuran, price: h.price })) 
                    : editProduk.harga
            };
    
            await axios.put(`http://localhost:5000/api/produk/${editProduk.id}`, updatedData);
            setProduk(produk.map(item => (item.id === editProduk.id ? { ...item, ...updatedData } : item)));
            setIsModalOpen(false);
            alert("Produk berhasil diperbarui.");
        } catch (error) {
            console.error("Gagal memperbarui produk:", error);
            alert("Terjadi kesalahan saat memperbarui produk.");
        }
    };
    

    const handleDeleteProduk = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/produk/${id}`);
            setProduk(produk.filter(item => item.id !== id));
            alert("Produk berhasil dihapus.");
        } catch (error) {
            console.error("Gagal menghapus produk:", error);
            alert("Terjadi kesalahan saat menghapus produk.");
        }
    };

    return (
        <div className="bg-[#072140] pt-40 pb-24 px-28 text-white w-full min-h-screen">
            <NavbarAdmin bgColor="bg-[#001328]" />
            <motion.h1
                className="text-[#DAE7EA] font-semibold text-[40px] mb-12 text-center"
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -70, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            >
                PRODUK KAMI
            </motion.h1>

            {loading ? (
                <p className="text-center text-lg">Loading data...</p>
            ) : (
                <motion.div 
                    className="overflow-x-auto shadow-lg rounded-lg"
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.table 
                        className="w-full border border-gray-600 text-[#C9E1E8] rounded-lg overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } }
                        }}
                    >
                        <thead className="bg-[#14335c] text-lg">
                            <tr>
                                <th className="border border-gray-600 px-6 py-3">Nama Paket</th>
                                <th className="border border-gray-600 px-6 py-3">Tipe</th>
                                <th className="border border-gray-600 px-6 py-3">Durasi</th>
                                <th className="border border-gray-600 px-6 py-3">Harga</th>
                                <th className="border border-gray-600 px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produk.map((item, index) => (
                                <motion.tr 
                                    key={index} 
                                    className="text-center bg-[#194377] hover:bg-[#0b4068] transition-all duration-300"
                                    variants={{
                                        hidden: { opacity: 0, x: -100 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                >
                                    <td className="border border-gray-600 px-6 py-3">{item.paket}</td>
                                    <td className="border border-gray-600 px-6 py-3">{item.tipe}</td>
                                    <td className="border border-gray-600 px-6 py-3">{item.durasi}</td>
                                    <td className="border border-gray-600 px-6 py-3">
                                        {Array.isArray(item.harga)
                                            ? item.harga.map((h, i) => (
                                                <div key={i}>
                                                    {h.ukuran}: Rp{h.price.toLocaleString()}
                                                </div>
                                            ))
                                            : `Rp${Number(item.harga).toLocaleString()}`}
                                    </td>
                                    <td className="border border-gray-600 px-6 py-3 flex justify-center gap-2">
                                        <motion.button 
                                            onClick={() => handleEditClick(item)} 
                                            className="bg-[#39b151] px-5 py-3 rounded-lg hover:bg-green-700"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Edit
                                        </motion.button>
                                        <motion.button 
                                            onClick={() => handleDeleteProduk(item.id)} 
                                            className="bg-[#c93434] px-5 py-3 rounded-lg hover:bg-red-800"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Delete
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>
                </motion.div>
            )}

            {isModalOpen && editProduk && (
                <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div className="bg-[#14335c] p-6 rounded-lg w-[700px] text-white max-h-[85vh] overflow-auto sm:max-h-[90vh]" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <h2 className="text-2xl font-semibold mb-6">Edit Produk</h2>
                        <div className="space-y-4">
                            <label>Nama Paket</label>
                            <input type="text" name="paket" value={editProduk.paket || ""} onChange={handleChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                            <label>Tipe</label>
                            <input type="text" name="tipe" value={editProduk.tipe || ""} onChange={handleChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                            <label>Durasi</label>
                            <input type="text" name="durasi" value={editProduk.durasi || ""} onChange={handleChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                            <label>Harga</label>
                            {Array.isArray(editProduk.harga) ? (
                                editProduk.harga.map((h, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={h.ukuran}
                                            disabled
                                            className="w-1/2 px-4 py-2 bg-gray-200 text-black rounded-md"
                                        />
                                        <input
                                            type="number"
                                            value={h.price}
                                            onChange={(e) => {
                                                const newHarga = [...editProduk.harga];
                                                newHarga[i].price = Number(e.target.value);
                                                setEditProduk({ ...editProduk, harga: newHarga });
                                            }}
                                            className="w-1/2 px-4 py-2 bg-white text-black rounded-md"
                                        />
                                    </div>
                                ))
                            ) : (
                                <input
                                    type="number"
                                    name="harga"
                                    value={editProduk.harga}
                                    onChange={(e) => setEditProduk({ ...editProduk, harga: Number(e.target.value) })}
                                    className="w-full px-4 py-2 bg-white text-black rounded-md"
                                />
                            )}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button onClick={handleSave} className="bg-[#39b151] px-5 py-3 rounded-lg mr-3 hover:bg-green-700">Save</button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-[#c93434] px-5 py-3 rounded-lg hover:bg-red-800">Cancel</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
