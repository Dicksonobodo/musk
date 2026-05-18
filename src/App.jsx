import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { WalletProvider } from "./context/WalletContext"
import Navbar from "./components/Navbar"
import BottomNav from "./components/BottomNav"
import ProtectedRoute from "./components/ProtectedRoute"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Markets from "./pages/Markets"
import AssetDetail from "./pages/AssetDetail"
import Admin from "./pages/Admin"

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
          <BottomNav />
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App