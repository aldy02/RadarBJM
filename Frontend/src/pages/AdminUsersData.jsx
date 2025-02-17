import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavbarAdmin from "../components/navbaradmin";

export default function AdminUsersData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        gender: "",
        address: "",
        city: "",
        role: "",
    });

    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Gagal mengambil data:", error);
                setLoading(false);
            });
    }, []);

    // Fungsi untuk membuka modal edit
    const openEditModal = (user) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            gender: user.gender,
            address: user.address,
            city: user.city,
            role: user.role,
        });
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal edit
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // Fungsi untuk menangani perubahan input dalam form edit
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi untuk menyimpan perubahan user
    const handleSaveChanges = async () => {
        if (!selectedUser) return;

        try {
            // Kirim perubahan ke server
            const response = await axios.put(`http://localhost:5000/api/users/${selectedUser.id}`, formData);

            // Setelah berhasil update, ambil ulang data terbaru dari server
            const updatedUsersResponse = await axios.get("http://localhost:5000/api/users");

            // Update state users dengan data terbaru dari server
            setUsers(updatedUsersResponse.data);

            alert("Data user berhasil diperbarui!");
            closeModal(); // Tutup modal setelah menyimpan
        } catch (error) {
            console.error("Gagal memperbarui data:", error);
            alert("Terjadi kesalahan saat memperbarui data.");
        }
    };

    return (
        <div className="bg-[#072140] pt-40 px-28 text-white w-full min-h-screen">
            <NavbarAdmin bgColor="bg-[#001328]" />
            <motion.h1
                className="text-[#DAE7EA] font-semibold text-[40px] mb-12 text-center"
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: -70, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}>
                PRODUK KAMI
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
                                <th className="border border-gray-600 px-6 py-3">Username</th>
                                <th className="border border-gray-600 px-6 py-3">Email</th>
                                <th className="border border-gray-600 px-6 py-3">Jenis Kelamin</th>
                                <th className="border border-gray-600 px-6 py-3">Alamat</th>
                                <th className="border border-gray-600 px-6 py-3">Kota</th>
                                <th className="border border-gray-600 px-6 py-3">Role</th>
                                <th className="border border-gray-600 px-6 py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    className="text-center bg-[#194377] hover:bg-[#0b4068] transition-all duration-300"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}>

                                    <td className="border border-gray-600 px-6 py-3 flex items-center space-x-3">
                                        {user.photo ? (
                                            <img src={user.photo} alt="User" className="w-10 h-10 rounded-full border-2 border-[#5AC9E8]" />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm">N/A</span>
                                            </div>
                                        )}
                                        <span>{user.username}</span>
                                    </td>

                                    <td className="border border-gray-600 px-6 py-3">{user.email}</td>
                                    <td className="border border-gray-600 px-6 py-3">{user.gender}</td>
                                    <td className="border border-gray-600 px-6 py-3">{user.address}</td>
                                    <td className="border border-gray-600 px-6 py-3">{user.city}</td>
                                    <td className={`border border-gray-600 px-6 py-3 font-semibold ${user.role === 'admin' ? 'text-red-500' : 'text-green-500'}`}>{user.role}</td>

                                    <td className="border border-gray-600 px-6 py-3">
                                        <button onClick={() => openEditModal(user)} className="bg-[#39b151] w-20 text-[#dfeaed] py-2 rounded-lg mr-2 hover:bg-green-700 transition-all">Edit</button>
                                        <button className="bg-[#c93434] w-20 px-4 py-2 rounded-lg hover:bg-red-700 text-[#dfeaed] transition-all">Delete</button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>

                    </table>
                </motion.div>
            )}

            {/* Modal Edit */}
            {isModalOpen && (
                <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        className="bg-[#14335c] p-6 rounded-lg w-[700px] text-white max-h-[85vh] overflow-auto sm:max-h-[90vh]"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>

                        <h2 className="text-2xl font-semibold mb-6">Edit User</h2>

                        {/* Grid lebih panjang */}
                        <div className="grid grid-cols-2 gap-6">

                            {/* Kolom 1 */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">Username</label>
                                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                                </div>

                                <div>
                                    <label className="block mb-2">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                                </div>

                                <div>
                                    <label className="block mb-2">Jenis Kelamin</label>
                                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-3 bg-white text-black rounded-md">
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                            </div>

                            {/* Kolom 2 */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">Alamat</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                                </div>

                                <div>
                                    <label className="block mb-2">Kota</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-white text-black rounded-md" />
                                </div>

                                <div>
                                    <label className="block mb-2">Role</label>
                                    <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-4 py-3 bg-white text-black rounded-md">
                                        <option value="admin">Admin</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Tombol di bawah */}
                        <div className="flex justify-end mt-6">
                            <button onClick={handleSaveChanges} className="bg-[#39b151] px-5 py-3 rounded-lg mr-3 hover:bg-green-700">Save</button>
                            <button onClick={closeModal} className="bg-[#c93434] px-5 py-3 rounded-lg hover:bg-red-800">Cancel</button>
                        </div>

                    </motion.div>
                </motion.div>
            )}

        </div>
    );
}
