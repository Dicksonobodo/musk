import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    const result = await login(form.email, form.password)
    setLoading(false)
    if (!result.success) setError(result.message)
    else navigate("/dashboard")
  }

  return (
    <div className="auth-grid" style={{ background: "#0a0a0a" }}>

      {/* Left Panel - hidden on mobile */}
      <div className="hide-mobile" style={{ position: "relative", background: "linear-gradient(135deg, #E31937 0%, #6B0000 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#E31937", fontWeight: 900, fontSize: "1.1rem" }}>M</span>
            </div>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: "1.2rem" }}>MUSK VERSE</span>
          </div>
          <h2 style={{ fontSize: "3rem", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Welcome<br />Back.
          </h2>
          <p style={{ color: "#ffaaaa", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Sign in to access your portfolio, track your investments, and grow your wealth.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { value: "25.0K+", label: "Active Investors" },
              { value: "$50.0M", label: "Total Invested" },
              { value: "17.5%", label: "Average ROI" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />
                <span style={{ color: "#fff", fontWeight: 800 }}>{s.value}</span>
                <span style={{ color: "#ffaaaa", fontSize: "0.875rem" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", minHeight: "100vh" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Mobile logo */}
          <div className="show-mobile" style={{ display: "none", alignItems: "center", gap: "0.6rem", marginBottom: "2rem" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900 }}>M</span>
            </div>
            <span style={{ color: "#fff", fontWeight: 900 }}>MUSK VERSE</span>
          </div>

          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>Sign In</h1>
          <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#E31937", fontWeight: 700, textDecoration: "none" }}>Create one free</Link>
          </p>

          {error && (
            <div style={{ padding: "0.9rem 1rem", borderRadius: "10px", background: "#E3193722", border: "1px solid #E3193744", color: "#ff6b6b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Email Address</label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "12px", background: "#111", border: "1px solid #222", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "0.9rem 3rem 0.9rem 1rem", borderRadius: "12px", background: "#111", border: "1px solid #222", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "#E31937", color: "#fff", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login