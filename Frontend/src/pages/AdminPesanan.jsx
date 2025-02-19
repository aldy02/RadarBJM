import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavbarAdmin from "../components/navbaradmin";

export default function AdminPesanan() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editOrder, setEditOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get("http://localhost:5000/api/pesanan")
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch orders data:", error);
                setLoading(false);
            });
    };

    const handleEditClick = (order) => {
        setEditOrder(order);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        setEditOrder({ ...editOrder, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updatedData = {
            nama: editOrder.nama,
            alamat: editOrder.alamat,
            kota: editOrder.kota,
            status: editOrder.status
        };

        axios.put(`http://localhost:5000/api/pesanan/${editOrder.id}`, updatedData)
            .then(response => {
                setOrders(prevOrders => prevOrders.map(order =>
                    order.id === editOrder.id ? { ...order, ...updatedData } : order
                ));
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error("Failed to update order:", error);
                alert("Gagal memperbarui pesanan. Silakan coba lagi.");
            });
    };
    
    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/pesanan/${orderId}`);
            setOrders(orders.filter(order => order.id !== orderId));
            alert("Pesanan berhasil dihapus.");
        } catch (error) {
            console.error("Gagal menghapus pesanan:", error);
            alert("Terjadi kesalahan saat menghapus pesanan.");
        }
    };

    return (
        <div className="bg-[#072140] pt-40 px-28 text-white w-full min-h-screen">
            <NavbarAdmin bgColor="bg-[#001328]" />
            <motion.h1
                className="text-[#DAE7EA] font-semibold text-[40px] mb-12 text-center"
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -70, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}>
                PESANAN USER
            </motion.h1>

            {loading ? (
                <p className="text-center text-lg">Loading data...</p>
            ) : (
                <motion.div className="overflow-x-auto shadow-lg rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <table className="w-full border border-gray-600 text-[#C9E1E8] rounded-lg overflow-hidden">
                        <thead className="bg-[#14335c] text-lg">
                            <tr>
                                <th className="border border-gray-600 px-6 py-3">Invoice ID</th>
                                <th className="border border-gray-600 px-6 py-3">Nama</th>
                                <th className="border border-gray-600 px-6 py-3">Alamat</th>
                                <th className="border border-gray-600 px-6 py-3">Kota</th>
                                <th className="border border-gray-600 px-6 py-3">Paket</th>
                                <th className="border border-gray-600 px-6 py-3">Metode Pembayaran</th>
                                <th className="border border-gray-600 px-6 py-3">Total Harga</th>
                                <th className="border border-gray-600 px-6 py-3">Status</th>
                                <th className="border border-gray-600 px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="text-center bg-[#194377] hover:bg-[#0b4068] transition-all duration-300">
                                    <td className="border border-gray-600 px-6 py-3">{order.invoice_id}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.nama}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.alamat}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.kota}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.paket}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.metode_pembayaran}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.total_harga}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.status}</td>
                                    <td className="border border-gray-600 px-6 py-3 flex justify-center gap-2">
                                        <button onClick={() => handleEditClick(order)} className="bg-[#39b151] px-5 py-3 rounded-lg hover:bg-green-700">Edit</button>
                                        <button onClick={() => handleDeleteOrder(order.id)} className="bg-[#c93434] px-5 py-3 rounded-lg hover:bg-red-800">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
            {isModalOpen && (
                <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div className="bg-[#14335c] p-6 rounded-lg w-[700px] text-white max-h-[85vh] overflow-auto sm:max-h-[90vh]" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <h2 className="text-2xl font-semibold mb-6">Edit Pesanan</h2>
                        <div className="space-y-4">
                            <label>Nama</label>
                            <input type="text" name="nama" value={editOrder.nama} onChange={handleChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                            <label>Alamat</label>
                            <input type="text" name="alamat" value={editOrder.alamat} onChange={handleChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                            <label>Kota</label>
                            <input type="text" name="kota" value={editOrder.kota} onChange={handleChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                            <label>Status</label>
                            <select name="status" value={editOrder.status} onChange={handleChange} className="w-full px-4 py-3 bg-white text-black rounded-md">
                                <option value="pending">Pending</option>
                                <option value="canceled">Canceled</option>
                                <option value="paid">Paid</option>
                            </select>
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
