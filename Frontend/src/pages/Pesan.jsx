import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import axios from "axios";

export default function Pesan() {
  const userId = localStorage.getItem("user_id");
  console.log("User ID:", userId);
  const [formData, setFormData] = useState({
    user_id: 1, // ID user (nanti bisa diambil dari context/auth)
    nama: "",
    alamat: "",
    kota: "",
    kodePos: "",
    paket: "",
    ukuran: "",
    durasi: "",
    metodePembayaran: "",
    total_harga: 0, // Total harga nanti bisa dihitung berdasarkan paket & durasi
  });

  const [ukuranOptions, setUkuranOptions] = useState([]);
  const [durasiOptions, setDurasiOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Jika paket atau durasi berubah, hitung ulang harga
      if (updatedForm.paket && updatedForm.durasi) {
        updatedForm.total_harga = hitungHarga(updatedForm.paket, updatedForm.durasi);
      }

      return updatedForm;
    });

    if (name === "paket") {
      let newUkuranOptions = [];
      let newDurasiOptions = [];

      switch (value) {
        case "Paket A - Baris":
          newUkuranOptions = ["1 Baris", "5 Baris", "10 Baris"];
          newDurasiOptions = ["1 Hari", "2 Hari", "3 Hari", "4 Hari", "5 Hari", "6 Hari", "7 Hari"];
          break;
        case "Paket B - Kolom":
          newUkuranOptions = ["10 CM", "20 CM", "30 CM"];
          newDurasiOptions = ["1 Hari", "2 Hari", "3 Hari", "4 Hari", "5 Hari", "6 Hari", "7 Hari"];
          break;
        case "Paket C - Display":
          newUkuranOptions = ["1/4 Halaman", "1/2 Halaman", "1 Halaman"];
          newDurasiOptions = ["1 Hari", "2 Hari", "3 Hari", "4 Hari", "5 Hari", "6 Hari", "7 Hari"];
          break;
        case "Paket Kombo 1 - Baris Kolom Display 1/4":
          newUkuranOptions = ["Baris Kolom Display 1/4"];
          newDurasiOptions = ["7 Hari"];
          break;
        case "Paket Kombo 2 - Kolom Display 1/2":
          newUkuranOptions = ["Kolom Display 1/2"];
          newDurasiOptions = ["7 Hari"];
          break;
        default:
          newUkuranOptions = [];
          newDurasiOptions = [];
      }

      setUkuranOptions(newUkuranOptions);
      setDurasiOptions(newDurasiOptions);

      setFormData((prev) => ({
        ...prev,
        ukuran: "",
        durasi: "",
        total_harga: 0, // Reset harga jika paket berubah
      }));
    }
  };

  // Hitung Harga
  const hitungHarga = (paket, durasi) => {
    const hargaPaket = {
      "Paket A - Baris": 10000,
      "Paket B - Kolom": 20000,
      "Paket C - Display": 50000,
      "Paket Kombo 1 - Baris Kolom Display 1/4": 70000,
      "Paket Kombo 2 - Kolom Display 1/2": 90000,
    };

    const hargaDurasi = {
      "1 Hari": 1,
      "2 Hari": 1.8,
      "3 Hari": 2.5,
      "4 Hari": 3,
      "5 Hari": 3.5,
      "6 Hari": 4,
      "7 Hari": 4.5,
    };

    return hargaPaket[paket] * (hargaDurasi[durasi] || 1);
  };


  // Function kirim pesanan
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.paket || !formData.ukuran || !formData.durasi) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      if (!token) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/pesan", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,  // Kirim token ke backend
          "Content-Type": "application/json"
        }
      }
      );

      alert("Pesanan berhasil dibuat!");
      console.log("Pesanan ID:", response.data.orderId);
    } catch (error) {
      console.error("Gagal mengirim pesanan:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan, coba lagi nanti.");
    }
  };

  return (
    <div className="w-full bg-[#072140] text-white">
      <Navbar bgColor="bg-[#001328]" />

      <div className="px-28 pb-24">
        <motion.h1
          className="text-[#5AC9E8] text-[54px] pt-36 mb-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          PILIH PAKET
        </motion.h1>

        {/* Form Container */}
        <motion.div
          className="bg-[#1A3E6F] p-10 rounded-xl shadow-lg flex gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>

          {/* Section Kiri */}
          <div className="w-1/2">
            <label className="block mb-2 font-medium">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8] mb-4"
            />

            <label className="block mb-2 font-medium">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8] mb-4"
            />

            <label className="block mb-2 font-medium">Kota</label>
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8] mb-4"
            />

            <label className="block mb-2 font-medium">Kode Pos</label>
            <input
              type="text"
              name="kodePos"
              value={formData.kodePos}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8]"
            />
          </div>

          {/* Section Kanan */}
          <div className="w-1/2">
            <label className="block mb-2 font-medium">Jenis Paket</label>
            <select
              name="paket"
              value={formData.paket}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8] mb-4"
            >
              <option value="">Pilih Paket</option>
              <option value="Paket A - Baris">Paket A - Baris</option>
              <option value="Paket B - Kolom">Paket B - Kolom</option>
              <option value="Paket C - Display">Paket C - Display</option>
              <option value="Paket Kombo 1 - Baris Kolom Display 1/4">Paket Kombo 1</option>
              <option value="Paket Kombo 2 - Kolom Display 1/2">Paket Kombo 2</option>
            </select>

            <label className="block mb-2 font-medium">Ukuran</label>
            <select
              name="ukuran"
              value={formData.ukuran}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8] mb-4"
              disabled={ukuranOptions.length === 0}
            >
              <option value="">Pilih Ukuran</option>
              {ukuranOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className="block mb-2 font-medium">Durasi</label>
            <select
              name="durasi"
              value={formData.durasi}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8] mb-4"
              disabled={durasiOptions.length === 0}
            >
              <option value="">Pilih Durasi</option>
              {durasiOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className="block mb-2 font-medium">Metode Pembayaran</label>
            <select
              name="metodePembayaran"
              value={formData.metodePembayaran}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#072140] text-white border border-[#5AC9E8] focus:outline-none focus:ring-2 focus:ring-[#5AC9E8]"
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="BNI Virtual Account - 988123456789">BNI Virtual Account - 988123456789</option>
              <option value="BRI Virtual Account - 880123456789">BRI Virtual Account - 880123456789</option>
              <option value="GoPay - 081234567890">GoPay - 081234567890</option>
            </select>
          </div>
        </motion.div>

        {/* Tombol */}
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={handleSubmit} // Submit ke db
            className="w-[50%] bg-[#5AC9E8] hover:bg-[#7facd9] text-white font-semibold py-3 rounded-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PESAN
          </motion.button>

        </div>

      </div>

      <Footer />
    </div>
  );
}