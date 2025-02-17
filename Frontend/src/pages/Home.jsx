import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import photo1 from "../assets/photo1.webp";
import Latar from "../assets/bg.png";
import Arrow from "../assets/arrow.svg";
import { motion } from "framer-motion";

const kegiatanSosial = [
  { id: 1, title: "Donasi Buku", description: "Menyumbangkan buku ke perpustakaan desa.", image: photo1 },
  { id: 2, title: "Bakti Sosial", description: "Membantu warga kurang mampu dengan sembako.", image: photo1 },
  { id: 3, title: "Edukasi Anak", description: "Mengajarkan anak-anak di daerah terpencil.", image: photo1 },
  { id: 4, title: "Pembersihan Pantai", description: "Membersihkan sampah di pesisir pantai.", image: photo1 },
  { id: 5, title: "Penanaman Pohon", description: "Menanam pohon untuk lingkungan hijau.", image: photo1 },
];

export default function Home() {
  const [bgColor, setBgColor] = useState("bg-transparent");

  // Carousel
  const [index, setIndex] = useState(0);
  const nextSlide = () => {
    setIndex((prev) => (prev < kegiatanSosial.length - 3 ? prev + 1 : prev));
  };
  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  // Carousel

  useEffect(() => {
    const fotoSection = document.querySelector(".foto");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgColor("bg-[#0C223B]");
        } else {
          setBgColor("bg-[#001328]");
        }
      },
      { threshold: 0.7 }
    );
    if (fotoSection) observer.observe(fotoSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#001328]">
      <Navbar bgColor={bgColor} />
      <div className="content flex justify-center items-center px-28 h-screen" style={{ backgroundImage: `url(${Latar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="w-[60%] mt-26">
          {/* Animasi Slide dari Kiri */}
          <motion.h2
            className="text-[#DAE7EA] text-3xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            WELCOME TO
          </motion.h2>

          <motion.h1
            className="text-[#5AC9E8] text-[54px] mt-2.5 mb-10"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            RADAR BANJARMASIN
          </motion.h1>

          <motion.p
            className="text-[#DAE7EA] w-[75%] text-[18px]"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            Radar Banjarmasin adalah surat kabar harian yang terbit di
            Kalimantan Selatan sejak 25 Januari 2001. Diterbitkan oleh PT Duta
            Banua Banjar, koran ini merupakan bagian dari jaringan media
            nasional Jawa Pos News Network dengan induk harian Jawa Pos. Saat
            ini, Radar Banjarmasin terbit setiap hari dengan 20 halaman.
          </motion.p>

          {/* Tombol Scroll */}
          <motion.div
            className="flex mt-24 items-center w-32 cursor-pointer h-20"
            whileHover={{ scale: 1.1 }} // Efek zoom in saat hover
            transition={{ duration: 0.3 }}
          >
            <img src={Arrow} alt="Arrow" className="h-6 mr-3" />
            <motion.p
              className="text-xl text-[#5AC9E8] relative overflow-hidden"
              whileHover={{ color: "#DAE7EA" }} // Warna berubah saat hover
            >
              SCROLL
            </motion.p>
          </motion.div>
        </div>

        {/* Photo Radar BJM */}
        <div className="pt-6 w-[40%]">
          <motion.img
            src={photo1}
            alt="Photo Radar BJM"
            className="shadow-[12px_12px_5px_#5AC9E8] rounded"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />
        </div>
      </div>


      {/* Section2- Sejarah*/}
      <div className="foto h-screen flex flex-row justify-center items-center px-28">
        <div className="flex w-full">
          <div className="flex items-center justify-center">
            <motion.img
              src={photo1}
              alt="Photo Radar BJM"
              className="shadow-[12px_12px_5px_#5AC9E8] rounded"
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }} // Memastikan animasi bisa diputar ulang
            />
          </div>
          <div className="w-[70%] flex-col justify-center flex pl-36">
            <motion.h1
              className="text-[#5AC9E8] text-[54px] mt-2.5 mb-8"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: 100, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              SEJARAH
            </motion.h1>

            <motion.p
              className="text-[#DAE7EA] w-full text-[18px]"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Pada awal kemunculannya, koran ini dikenal sebagai Radar Banjar
              dan merupakan sisipan dari Jawa Pos yang terbit dengan 8 halaman.
              Dipasarkan bersama surat kabar induknya di wilayah Kalimantan
              Selatan, Radar Banjar saat itu didukung oleh 7 jurnalis dan 2
              redaktur, termasuk pemimpin redaksi. Seiring dengan respons
              positif dari masyarakat, Radar Banjar bertransformasi menjadi
              surat kabar mandiri pada tahun 2002 dengan nama Radar Banjarmasin
              dan tagline "Pelopor Inovasi Selalu Lebih Maju". Tagline ini
              kemudian berubah menjadi "Paling Paham Soal Banua" untuk
              menegaskan fokus pada isu-isu lokal.
            </motion.p>

            <motion.p
              className="text-xl text-[#5AC9E8] mt-12"
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              NEXT
            </motion.p>
          </div>
        </div>
      </div>

      {/* Section 3 Kegiatan Sosial */}
      <div className="w-full px-28 flex flex-col items-center justify-center bg-[#072140] h-screen">
        <div>
          <motion.h2
            className="text-[#5AC9E8] text-[54px] mb-18"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -70, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
            KEGIATAN & PERASN SOSIAL
          </motion.h2>
        </div>
        <div className="relative flex items-center w-full">
          {/* Tombol Kiri */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -40, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
            <motion.button
              onClick={prevSlide}
              className="bg-transparent p-2 mr-8 w-full"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={Arrow} alt="Previous" className="h-7 rotate-90" />
            </motion.button>
          </motion.div>
          {/* Carousel Container */}
          <motion.div className="flex gap-10 overflow-hidden w-full"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {kegiatanSosial.slice(index, index + 3).map((activity) => (
              <motion.div
                key={activity.id}
                className="w-1/3 bg-[#1A3E6F] rounded p-5 shadow-lg flex flex-col items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">{activity.title}</h3>
                <p className="text-gray-300 text-center">{activity.description}</p>
              </motion.div>
            ))}
          </motion.div>
          {/* Tombol Kanan */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 40, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
            <motion.button
              onClick={nextSlide}
              className="bg-transparent p-2 ml-8 w-full"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={Arrow} alt="Next" className="h-7 rotate-270" />
            </motion.button>
          </motion.div>
        </div>
      </div>
      {/* Section 3 Kegiatan Sosial */}
      <Footer />
    </div>
  );
}
