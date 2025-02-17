-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2025 at 08:17 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `radarbjm`
--

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `kota` varchar(100) NOT NULL,
  `kode_pos` varchar(20) NOT NULL,
  `paket` varchar(255) NOT NULL,
  `ukuran` varchar(100) NOT NULL,
  `durasi` varchar(50) NOT NULL,
  `metode_pembayaran` varchar(255) NOT NULL,
  `total_harga` int(11) NOT NULL,
  `status` enum('pending','paid','canceled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expired_time` timestamp GENERATED ALWAYS AS (`created_at` + interval 72 hour) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id`, `user_id`, `nama`, `alamat`, `kota`, `kode_pos`, `paket`, `ukuran`, `durasi`, `metode_pembayaran`, `total_harga`, `status`, `created_at`) VALUES
(1, 8, 'Kania', 'Jl. Dahlina Raya No. 15 ', 'Banjarbaru', '76255', 'Paket A - Baris', '1 Baris', '7 Hari', 'GoPay - 081234567890', 45000, 'pending', '2025-02-17 07:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `produk_iklan`
--

CREATE TABLE `produk_iklan` (
  `id` int(11) NOT NULL,
  `paket` varchar(255) NOT NULL,
  `tipe` varchar(100) NOT NULL,
  `durasi` varchar(50) NOT NULL,
  `harga` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`harga`)),
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk_iklan`
--

INSERT INTO `produk_iklan` (`id`, `paket`, `tipe`, `durasi`, `harga`, `image`) VALUES
(1, 'Paket A', 'BARIS', '1 Hari - 7 Hari', '[{\"ukuran\": \"1 Baris\", \"price\": 100000}, {\"ukuran\": \"5 Baris\", \"price\": 450000}, {\"ukuran\": \"10 Baris\", \"price\": 850000}]', '/uploads/ads5.svg'),
(2, 'Paket B', 'KOLOM', '1 Hari - 7 Hari', '[{\"ukuran\": \"10 CM\", \"price\": 1500000}, {\"ukuran\": \"20 CM\", \"price\": 2800000}, {\"ukuran\": \"30 CM\", \"price\": 3800000}]', '/uploads/ads1.svg'),
(3, 'Paket C', 'DISPLAY', '1 Hari - 7 Hari', '[{\"ukuran\": \"1/4 Halaman\", \"price\": 5000000}, {\"ukuran\": \"1/2 Halaman\", \"price\": 7000000}, {\"ukuran\": \"1 Halaman\", \"price\": 12000000}]', '/uploads/ads3.svg'),
(4, 'Paket Kombo 1', 'BARIS KOLOM DISPLAY 1/4', '7 Hari', '9000000', '/uploads/ads4.svg'),
(5, 'Paket Kombo 2', 'KOLOM DISPLAY 1/2', '7 Hari', '14000000', '/uploads/ads2.svg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('Laki-laki','Perempuan') NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('admin','customer') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `gender`, `address`, `city`, `photo`, `role`, `created_at`) VALUES
(7, 'admin@radarbjm.com', 'adminRadar', '$2b$10$TkYBmJ6laxT3fKZ6C1itbOKchzPofl0GwZzqvJ8erUgmCHZCTeCsq', 'Laki-laki', 'Jl. Dahlina Raya No. 15', 'Banjarmasin', '/uploads/admin.jpg', 'admin', '2025-02-15 08:10:43'),
(8, 'user1@gmail.com', 'pelanggan1_bjm', '$2b$10$DXUp7sgn5Mi6cg80v7cNWOQAaBWEzEJpQw15Dw.KqTF/eKQMw38me', 'Perempuan', 'Jl. Mistar Cokro No. 1', 'Banjarbaru', '/uploads/user1.jpg', 'customer', '2025-02-15 08:10:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `produk_iklan`
--
ALTER TABLE `produk_iklan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `produk_iklan`
--
ALTER TABLE `produk_iklan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
