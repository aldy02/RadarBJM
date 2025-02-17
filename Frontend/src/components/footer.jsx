import Location from "../assets/location.svg";
import Mail from "../assets/email.svg";
import Contact from "../assets/contact.svg";

export default function Footer() {
    return (
        <div className="bg-[#001328]">
            <div className="text-[#d1d1d1] px-28 flex py-12">
                <div>
                    <h3 className="text-2xl">Lokasi</h3>
                    <div className="flex mt-6">
                        <img
                            src={Location}
                            alt="Location Icon"
                            className="h-5 mr-6 mt-1.5"
                        />
                        <div>
                            <p className="mb-1 text-sm">
                                Gedung Biru, Jalan Ahmad Yani Km 26,9, Landasan Ulin, Kota
                                Banjarbaru
                            </p>
                            <p className=" text-sm">
                                Kantor Biro Banjarmasin, Jalan Brigjen H Hasan Basry No E-31 A
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-20">
                    <h3 className="text-2xl">Sosial Media</h3>
                    <div className="flex mt-6">
                        <img src={Contact} alt="Location Icon" className="h-7 mr-6" />
                        <div>
                            <p className="mb-1 text-sm">0511-4706151</p>
                            <p className="text-sm">0511-3304884</p>
                        </div>
                    </div>
                    <div className="flex mt-3">
                        <img src={Mail} alt="Location Icon" className="h-4 mr-8 mt-0.5" />
                        <p className="text-sm">redaksi@radarbanjarmasin.co.id</p>
                    </div>
                </div>
            </div>
            <div className="text-[#959595] opacity-80 border-t-2 border-[#959595] py-2 px-28 flex justify-center items-center">
                <p>© 2025 Kondro. Aplikasi Penjualan Ruang Iklan Di Koran</p>
            </div>
        </div>
    );
}
