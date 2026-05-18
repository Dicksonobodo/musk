import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { LogOut, User, Menu, X,  } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(10,10,10,0.97)", borderBottom: "1px solid #1e1e1e", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: "0.95rem" }}>M</span>
            </div>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: "1rem", letterSpacing: "-0.5px" }}>
              MUSK <span style={{ color: "#E31937" }}>VERSE</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[{ to: "/", label: "Home" }, { to: "/markets", label: "Markets" }, { to: "/dashboard", label: "Portfolio" }].map(link => (
              <Link key={link.to} to={link.to}
                style={{ color: location.pathname === link.to ? "#fff" : "#666", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {user ? (
              <>
                <Link to={user.role === "admin" ? "/admin" : "/dashboard"}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#aaa", fontSize: "0.875rem", textDecoration: "none" }}>
                  <User size={15} /> {user.name}
                </Link>
                <button onClick={handleLogout}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1.2rem", borderRadius: "8px", background: "#E31937", color: "#fff", fontWeight: 700, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: "#aaa", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>Login</Link>
                <Link to="/register" style={{ padding: "0.5rem 1.4rem", borderRadius: "8px", background: "#E31937", color: "#fff", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button className="show-mobile" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "0.5rem" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="show-mobile" style={{ position: "fixed", top: "64px", left: 0, right: 0, bottom: "80px", background: "#0a0a0a", zIndex: 49, padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem", borderTop: "1px solid #1e1e1e", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[{ to: "/", label: "Home" }, { to: "/markets", label: "Markets" }, { to: "/dashboard", label: "Portfolio" }].map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, textDecoration: "none", padding: "0.5rem 0" }}>
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {user ? (
              <>
                <div style={{ padding: "1.2rem", borderRadius: "12px", background: "#111", border: "1px solid #1e1e1e" }}>
                  <p style={{ color: "#666", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Signed in as</p>
                  <p style={{ color: "#fff", fontSize: "1rem", fontWeight: 700 }}>{user.name}</p>
                </div>
                <button onClick={handleLogout}
                  style={{ padding: "1rem", borderRadius: "12px", background: "#E31937", color: "#fff", fontWeight: 700, fontSize: "1rem", border: "none", cursor: "pointer", width: "100%" }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  style={{ padding: "1rem", borderRadius: "12px", background: "#111", color: "#fff", fontWeight: 700, fontSize: "1rem", textDecoration: "none", textAlign: "center", border: "1px solid #222", width: "100%", boxSizing: "border-box", display: "block" }}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  style={{ padding: "1rem", borderRadius: "12px", background: "#E31937", color: "#fff", fontWeight: 700, fontSize: "1rem", textDecoration: "none", textAlign: "center", width: "100%", boxSizing: "border-box", display: "block" }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar