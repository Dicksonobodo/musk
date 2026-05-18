import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Eye, EyeOff, Check } from "lucide-react"

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) { setError("All fields are required"); return }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return }
    setLoading(true)
    setError("")
    const result = register(form.name, form.email, form.password)
    setLoading(false)
    if (!result.success) setError(result.message)
    else navigate("/dashboard")
  }

  const perks = [
    "Access to 10+ crypto & stock markets",
    "Real-time portfolio tracking",
    "Multiple investment plans",
    "24/7 secure platform",
  ]

  return (
    <div className="auth-grid" style={{ background: "#0a0a0a" }}>

      {/* Left Panel - hidden on mobile */}
      <div className="hide-mobile" style={{ position: "relative", background: "linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem", borderRight: "1px solid #1e1e1e", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", borderRadius: "50%", background: "#E3193715", filter: "blur(80px)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>M</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: "1.2rem" }}>MUSK VERSE</span>
        </div>
        <h2 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: "1rem" }}>
          Start Building<br />
          <span style={{ color: "#E31937" }}>Your Wealth.</span>
        </h2>
        <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Join thousands of investors already growing their portfolio on Musk Verse.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          {perks.map(perk => (
            <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#E3193722", border: "1px solid #E3193766", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={12} color="#E31937" />
              </div>
              <span style={{ color: "#aaa", fontSize: "0.875rem" }}>{perk}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "1.5rem", borderRadius: "16px", background: "#111", border: "1px solid #1e1e1e" }}>
          <p style={{ color: "#aaa", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
            "Musk Verse completely changed how I invest. The returns are incredible and the platform is so easy to use."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.875rem" }}>J</div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>James O.</p>
              <p style={{ color: "#555", fontSize: "0.75rem" }}>Investor since 2024</p>
            </div>
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

          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>Create Account</h1>
          <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#E31937", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
          </p>

          {error && (
            <div style={{ padding: "0.9rem 1rem", borderRadius: "10px", background: "#E3193722", border: "1px solid #E3193744", color: "#ff6b6b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Full Name</label>
              <input
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="John Doe"
                style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "12px", background: "#111", border: "1px solid #222", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>

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
                  placeholder="Min. 6 characters"
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
              {loading ? "Creating account..." : "Create Account →"}
            </button>

            <p style={{ color: "#444", fontSize: "0.75rem", textAlign: "center", lineHeight: 1.6 }}>
              By creating an account you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register