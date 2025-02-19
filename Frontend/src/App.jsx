import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Iklan from './pages/Iklan.jsx';
import Pesan from './pages/Pesan.jsx';
import AdminUsersData from './pages/AdminUsersData.jsx';
import AdminPesanan from './pages/AdminPesanan.jsx';
import AdminProduk from './pages/AdminProduk.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Showcase from './pages/Showcase.jsx'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/iklan" element={<Iklan />} />
        <Route path="/pesan" element={<Pesan />} />
        <Route path="/showcase" element={<Showcase />} />

        {/* Rute khusus Admin yang membutuhkan login */}
        <Route element={<ProtectedRoute role="Admin" />}>
          <Route path="/admin/users" element={<AdminUsersData />} />
          <Route path="/admin/pesanan" element={<AdminPesanan />} />
          <Route path="/admin/produk" element={<AdminProduk />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;