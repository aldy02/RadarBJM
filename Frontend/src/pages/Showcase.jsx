import { useState } from "react";
import { motion } from "framer-motion";
import Arrow from "../assets/arrow.svg";
import Navbar from "../components/navbar";
import Iklan1 from "../assets/iklan1.png"
import Iklan2 from "../assets/iklan2.png"
import Iklan3 from "../assets/iklan3.jpg"
import Iklan4 from "../assets/iklan4.jpg"
import Iklan5 from "../assets/iklan5.jpg"
import Footer from "../components/footer";


const adsData = [
    {
        id: 1,
        image: Iklan1,
        title: "Contoh Iklan 1"
    },
    {
        id: 2,
        image: Iklan2,
        title: "Contoh Iklan 2"
    },
    {
        id: 3,
        image: Iklan3,
        title: "Contoh Iklan 3"
    },
    {
        id: 4,
        image: Iklan4,
        title: "Contoh Iklan 4"
    },
    {
        id: 5,
        image: Iklan5,
        title: "Contoh Iklan 5"
    },
];

const Showcase = () => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        if (index < adsData.length - 3) setIndex(index + 1);
    };

    const prevSlide = () => {
        if (index > 0) setIndex(index - 1);
    };

    return (
        <div>

            <div className="w-full px-28 flex flex-col items-center justify-center bg-[#072140] h-screen">
                <Navbar bgColor="bg-[#001328]" />
                <motion.h2
                    className="text-[#5AC9E8] text-[54px] mb-16"
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: -70, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                >
                    SHOWCASE IKLAN
                </motion.h2>

                <div className="relative flex items-center w-full">
                    {/* Tombol Kiri */}
                    <motion.button
                        onClick={prevSlide}
                        className="bg-transparent p-2 mr-8"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src={Arrow} alt="Previous" className="h-7 rotate-90" />
                    </motion.button>

                    {/* Carousel Container */}
                    <motion.div
                        className="flex gap-10 overflow-hidden w-full"
                        whileInView={{ y: 0, opacity: 1 }}
                        initial={{ y: 100, opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    >
                        {adsData.slice(index, index + 3).map((ad) => (
                            <motion.div
                                key={ad.id}
                                className="w-1/3 bg-[#1A3E6F] rounded p-5 shadow-lg flex flex-col items-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <img
                                    src={ad.image}
                                    alt={ad.title}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                     <h3 className="text-xl mt-6 font-bold text-white">{ad.title}</h3>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Tombol Kanan */}
                    <motion.button
                        onClick={nextSlide}
                        className="bg-transparent p-2 ml-8"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src={Arrow} alt="Next" className="h-7 -rotate-90" />
                    </motion.button>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default Showcase;
