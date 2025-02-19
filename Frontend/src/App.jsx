import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { Routes, Route } from "react-router-dom";
import Iklan from './pages/Iklan.jsx';
import Pesan from './pages/Pesan.jsx';
import AdminUsersData from './pages/AdminUsersData.jsx';
import AdminPesanan from './pages/AdminPesanan.jsx';
import AdminProduk from './pages/AdminProduk.jsx'
import AdminInvoice from './pages/AdminInvoice.jsx'

function App() {

  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/users" element={<AdminUsersData />} />
      <Route path="/admin/pesanan" element={<AdminPesanan />} />
      <Route path="/admin/produk" element={<AdminProduk />} />
      <Route path="/admin/invoice" element={<AdminInvoice />} />
      <Route path="/login" element={<Login />} />
      <Route path="/iklan" element={<Iklan />} />
      <Route path="/pesan" element={<Pesan />} />
      </Routes>
    </div>
  )
}

export default App
