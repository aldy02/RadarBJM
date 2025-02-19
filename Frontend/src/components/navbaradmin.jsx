import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function NavbarAdmin({ bgColor }) {
    const navigate = useNavigate();
    const userAvatar = localStorage.getItem("avatar");

    const handleLogout = () => {
        localStorage.removeItem("avatar");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        navigate("/login");
    };

    return (
        <nav className={`fixed z-50 top-0 left-0 w-screen px-28 py-7 shadow-md transition-colors duration-300 ${bgColor}`}>
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <img src={Logo} alt="Logo" className="h-10" />
                </Link>

                {/* Menu Navigasi */}
                <div className="flex space-x-6">
                    <Link to="/admin/users" className="relative text-xl text-[#5AC9E8] hover:text-[#91E6FD] transition-colors group">
                        Users
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#5AC9E8] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/admin/produk" className="relative text-xl text-[#5AC9E8] hover:text-[#91E6FD] transition-colors group">
                        Produk
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#5AC9E8] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/admin/pesanan" className="relative text-xl text-[#5AC9E8] hover:text-[#91E6FD] transition-colors group">
                        Pesanan
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#5AC9E8] transition-all duration-300 group-hover:w-full"></span>
                    </Link> 
                </div>

                {/* Avatar atau Login Button */}
                {userAvatar ? (
                    <div className="relative group cursor-pointer">
                        <img
                            src={userAvatar || null}
                            alt="User Avatar"
                            className="h-11 w-11 rounded-full border-2 border-[#5AC9E8] hover:opacity-80"
                        />
                        {/* Dropdown Logout */}
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                                onClick={handleLogout} 
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="px-5 py-1 text-[#5AC9E8] hover:text-[#91E6FD] hover:border-[#91E6FD] border border-[#5AC9E8] text-xl bg-[#0D223A] rounded-xl hover:bg-[#304053] transition-all duration-300 shadow-md">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
