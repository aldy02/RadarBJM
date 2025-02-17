import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavbarAdmin from "../components/navbaradmin";

export default function AdminPesanan() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/pesanan")
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch orders data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#072140] pt-40 px-28 text-white w-full min-h-screen">
            <NavbarAdmin bgColor="bg-[#001328]" />
            <motion.h1
                className="text-[#DAE7EA] font-semibold text-[40px] mb-12 text-center"
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -70, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}>
                PESANAN USER
            </motion.h1>

            {loading ? (
                <p className="text-center text-lg">Loading data...</p>
            ) : (
                <motion.div
                    className="overflow-x-auto shadow-lg rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>

                    <table className="w-full border border-gray-600 text-[#C9E1E8] rounded-lg overflow-hidden">
                        <thead className="bg-[#14335c] text-lg">
                            <tr>
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
                            {orders.map((order, index) => (
                                <motion.tr
                                    key={order.id}
                                    className="text-center bg-[#194377] hover:bg-[#0b4068] transition-all duration-300"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}>

                                    <td className="border border-gray-600 px-6 py-3">{order.nama}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.alamat}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.kota}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.paket}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.metode_pembayaran}</td>
                                    <td className="border border-gray-600 px-6 py-3">{order.total_harga}</td>
                                    <td className="border border-gray-600 px-6 py-3">
                                        <span className={`font-semibold ${order.status === 'paid' ? 'text-green-500' : order.status === 'canceled' ? 'text-red-500' : 'text-yellow-500'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-600 px-6 py-3">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all">Delete</button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
}