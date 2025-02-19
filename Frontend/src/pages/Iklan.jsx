import Navbar from "../components/navbar";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Arrow from "../assets/arrow.svg";
import axios from "axios";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export default function Iklan() {
  const [index, setIndex] = useState(0);
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/produk")
      .then((response) => {
        setProduk(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data produk");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const prevSlide = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (index < produk.length - 3) {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full  bg-[#072140]">
      <Navbar bgColor="bg-[#001328]" />
      <div className="px-28">
        {/* Title */}
        <div className="flex justify-center">
          <motion.h2
            className="text-[#DAE7EA] text-[50px] pt-36 mb-18"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -70, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
            PRODUK KAMI
          </motion.h2>
        </div>

        <div className="relative flex items-center pb-24">

          {/* Arrow Left */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -40, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
            <motion.button
              onClick={prevSlide}
              className={`bg-transparent p-2 mr-8 w-full ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              disabled={index === 0}>
              <img src={Arrow} alt="Previous" className="h-7 rotate-90" />
            </motion.button>
          </motion.div>

          {/* Cards Container */}
          <motion.div
            className="flex gap-10 overflow-hidden w-full rounded-xl"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}>

            {produk.slice(index, index + 3).map((item, i) => (
              <motion.div
                key={i}
                className="w-1/3 bg-[#1A3E6F] rounded p-3 shadow-lg flex flex-col items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}>

                {/* Gambar dengan animasi sclae */}
                <motion.img
                  src={item.image}
                  alt={item.paket}
                  className="h-50 object-cover rounded-md mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Paket dengan animasi scale-up */}
                <motion.h3
                  className="text-lg font-bold text-[#DAE7EA] mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  {item.paket}
                </motion.h3>

                {/* Tipe dengan animasi fade-in */}
                <motion.p
                  className="text-[#3FFBF8] text-[26px] font-medium text-center mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}>
                  {item.tipe}
                </motion.p>

                {/* Harga dengan animasi fade-in */}
                <motion.div
                  className="text-[#DAE7EA] text-center h-50 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}>

                  <p className="font-semibold">Harga:</p>
                  <ul className="list-none">
                    {Array.isArray(item.harga) ? (
                      item.harga.map((h, j) => (
                        <li key={j}>
                          {h.ukuran}: <span>Rp {h.price.toLocaleString()}</span>
                        </li>
                      ))
                    ) : (
                      <li>Rp {item.harga.toLocaleString()}</li>
                    )}
                  </ul>
                  <p className="mt-5 font-medium">{item.durasi}</p>
                </motion.div>

                {/* Button */}
                <motion.button
                  className="w-[80%] mt-3 mb-8 bg-[#5AC9E8] hover:bg-[#7facd9] text-white font-semibold py-3 rounded transition duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  onClick={() => navigate("/pesan")}
                >
                  PESAN
                </motion.button>
              </motion.div>

            ))}
          </motion.div>
          {/* Cards Container */}


          {/* Arrow Right */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 40, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>

            <motion.button
              onClick={nextSlide}
              className={`bg-transparent p-2 ml-8 w-full ${index >= produk.length - 3 ? "opacity-50 cursor-not-allowed" : ""}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              disabled={index >= produk.length - 3}>
              <img src={Arrow} alt="Next" className="h-7 rotate-270" />
            </motion.button>

          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}