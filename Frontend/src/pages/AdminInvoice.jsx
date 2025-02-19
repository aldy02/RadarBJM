import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavbarAdmin from "../components/navbaradmin";

export default function AdminInvoice() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/invoices")
            .then(response => {
                setInvoices(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Gagal mengambil data invoice:", error);
                setLoading(false);
            });
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/invoices/${id}`, { status });
            setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status } : inv));
            alert("Status berhasil diperbarui.");
        } catch (error) {
            console.error("Gagal memperbarui status:", error);
            alert("Terjadi kesalahan saat memperbarui status.");
        }
    };

    return (
        <div className="bg-[#072140] pt-40 pb-24 px-28 text-white w-full min-h-screen">
            <NavbarAdmin bgColor="bg-[#001328]" />
            <motion.h1
                className="text-[#DAE7EA] font-semibold text-[40px] mb-12 text-center"
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -70, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            >
                DAFTAR INVOICE
            </motion.h1>

            {loading ? (
                <p className="text-center text-lg">Loading data...</p>
            ) : (
                <motion.div className="overflow-x-auto shadow-lg rounded-lg"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <table className="w-full border border-gray-600 text-[#C9E1E8] rounded-lg overflow-hidden">
                        <thead className="bg-[#14335c] text-lg">
                            <tr>
                                <th className="border border-gray-600 px-6 py-3">Nama</th>
                                <th className="border border-gray-600 px-6 py-3">Paket</th>
                                <th className="border border-gray-600 px-6 py-3">Ukuran</th>
                                <th className="border border-gray-600 px-6 py-3">Durasi</th>
                                <th className="border border-gray-600 px-6 py-3">Total Harga</th>
                                <th className="border border-gray-600 px-6 py-3">Status</th>
                                <th className="border border-gray-600 px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv, index) => (
                                <tr key={index} className="text-center bg-[#194377] hover:bg-[#0b4068] transition-all duration-300">
                                    <td className="border border-gray-600 px-6 py-3">{inv.nama}</td>
                                    <td className="border border-gray-600 px-6 py-3">{inv.paket}</td>
                                    <td className="border border-gray-600 px-6 py-3">{inv.ukuran}</td>
                                    <td className="border border-gray-600 px-6 py-3">{inv.durasi}</td>
                                    <td className="border border-gray-600 px-6 py-3">Rp{Number(inv.total_harga).toLocaleString()}</td>
                                    <td className="border border-gray-600 px-6 py-3 font-semibold text-yellow-400">{inv.status}</td>
                                    <td className="border border-gray-600 px-6 py-3 flex justify-center gap-2">
                                        <button onClick={() => updateStatus(inv.id, 'paid')} className="bg-[#39b151] px-4 py-2 rounded-lg hover:bg-green-700">Tandai Lunas</button>
                                        <button onClick={() => updateStatus(inv.id, 'canceled')} className="bg-[#c93434] px-4 py-2 rounded-lg hover:bg-red-800">Batalkan</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
}