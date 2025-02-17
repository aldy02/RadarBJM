import Gambar from "../assets/loginPhoto.svg";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import Latar from "../assets/bg.png";
import Mail from "../assets/loginIcon.svg";
import Password from "../assets/password.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://localhost:5000/login", {
                email,
                password
            }, { headers: { "Content-Type": "application/json" } });

            const token = response.data.token
            const role = response.data.role
            localStorage.setItem("token", token);
            localStorage.setItem("avatar", response.data.avatar); // Simpan avatar
            localStorage.setItem("role", role); // Simpan role di localStorage

            // ✅ Decode token untuk mendapatkan user_id
            const decodedToken = jwtDecode(token);
            localStorage.setItem("user_id", decodedToken.id);  // Simpan user_id di localStorage

            // ✅ Cek role dan arahkan ke halaman yang sesuai
            if (role === "Admin") {
                navigate("/admin/users");  // Jika admin
            } else {
                navigate("/");  // Jika customer
            }

        } catch (err) {
            setError(err.response?.data?.error || "Login failed, please try again.");
        }
    };

    return (
        <div className="flex space-x-[300px] justify-center px-28 pt-14 min-h-screen items-center bg-cover bg-center" style={{ backgroundImage: `url(${Latar})` }}>
            <Navbar />

            <motion.div
                className="w-[30%]"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-[#5AC9E8] text-5xl font-medium mt-2.5 mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    LOGIN
                </motion.h1>

                <form onSubmit={handleLogin}>
                    <motion.div
                        className="mb-4 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}>
                        <img src={Mail} alt="Email Icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 opacity-80" />
                        <input
                            type="email"
                            className="w-full bg-[#DEE8EE] px-14 py-3 rounded text-[#184A73] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </motion.div>

                    <motion.div
                        className="mb-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}>
                        <img src={Password} alt="Password Icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 opacity-80" />
                        <input
                            type="password"
                            className="w-full text-[#184A73] bg-[#DEE8EE] px-14 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </motion.div>

                    {/* Error */}
                    {error &&
                        <div className="flex items-center p-4 mb-6 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div>
                                <span className="font-medium">Error!</span> {error}
                            </div>
                        </div>
                    }

                    <motion.button
                        type="submit"
                        className="w-full bg-[#5AC9E8] hover:bg-[#7facd9] text-white font-semibold py-3 rounded transition duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}>
                        ENTER
                    </motion.button>
                </form>
            </motion.div>

            {/* Bagian Kanan: Gambar dengan Animasi Masuk + Floating Loop */}
            <motion.img
                src={Gambar}
                alt="Login Illustration"
                className="h-80 rounded-lg shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}  // Fade In & Scale saat Load
                animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -20, 0]  // Floating setelah selesai load
                }}
                transition={{
                    scale: { duration: 1, delay: 0.5 }, // Durasi awal fade in
                    opacity: { duration: 1, delay: 0.5 },
                    y: { repeat: Infinity, duration: 3, ease: "easeInOut" } // Floating Loop
                }}
            />
        </div>
    );
}
