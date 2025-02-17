import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Cart from "../assets/cart.svg";

export default function Navbar({ bgColor }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const avatar = localStorage.getItem("avatar");

        if (token) {
            setIsLoggedIn(true);
            if (avatar) {
                setUserAvatar(avatar);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("avatar");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        setIsLoggedIn(false);
        setUserAvatar(null);
        navigate("/login");
    };

    return (
        <nav className={`fixed z-50 top-0 left-0 w-screen px-28 py-7 shadow-md transition-colors duration-300 ${bgColor}`}>
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="h-10" />
                </Link>

                <div className="flex space-x-6">
                    <Link to="/" className="relative text-xl text-[#5AC9E8] hover:text-[#91e6fd] transition-colors group">
                        Beranda
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#5AC9E8] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/showcase" className="relative text-xl text-[#5AC9E8] hover:text-[#91e6fd] transition-colors group">
                        Showcase
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#5AC9E8] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/iklan" className="relative text-xl text-[#5AC9E8] hover:text-[#91e6fd] transition-colors group">
                        Ruang Iklan
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#5AC9E8] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/pesan" className="group">
                        <div className="flex justify-center items-center">
                            <img src={Cart} alt="Cart Icon" className="h-9 mr-3 group-hover:opacity-80 transition-opacity duration-300" />
                            <p className="relative text-xl text-[#5AC9E8] hover:text-[#91e6fd] transition-colors">
                                Pesan
                            </p>
                        </div>
                    </Link>
                    <div className="h-7 border-1 rounded border-[#5AC9E8]"></div>

                    {isLoggedIn ? (
                        <div className="relative group cursor-pointer">
                            {userAvatar && (
                                <img
                                    src={userAvatar}
                                    alt="User Avatar"
                                    className="h-11 w-11 rounded-full border-2 border-[#5AC9E8] hover:opacity-80"
                                />
                            )}
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
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
            </div>
        </nav>
    );
}