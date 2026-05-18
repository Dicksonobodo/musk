import { Link, useLocation } from "react-router-dom"
import { Home, TrendingUp, LayoutDashboard, Settings } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

const BottomNav = () => {
  const location = useLocation()
  const { user } = useAuth()
  const active = (path) => location.pathname === path

  if (!user) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-6 py-3"
      style={{ background: "rgba(10,10,10,0.98)", borderTop: "1px solid #1e1e1e" }}>
      <Link to="/" className={`flex flex-col items-center gap-1 text-xs ${active("/") ? "text-red-500" : "text-gray-500"}`}>
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link to="/markets" className={`flex flex-col items-center gap-1 text-xs ${active("/markets") ? "text-red-500" : "text-gray-500"}`}>
        <TrendingUp size={20} />
        <span>Markets</span>
      </Link>
      <Link to="/dashboard" className={`flex flex-col items-center gap-1 text-xs ${active("/dashboard") ? "text-red-500" : "text-gray-500"}`}>
        <LayoutDashboard size={20} />
        <span>Portfolio</span>
      </Link>
      {user.role === "admin" && (
        <Link to="/admin" className={`flex flex-col items-center gap-1 text-xs ${active("/admin") ? "text-red-500" : "text-gray-500"}`}>
          <Settings size={20} />
          <span>Admin</span>
        </Link>
      )}
    </div>
  )
}

export default BottomNav