import { Link } from "react-router-dom"
import { coins } from "../data/coins"
import { plans } from "../data/plans"
import CoinCard from "../components/CoinCard"
import PlanCard from "../components/PlanCard"
import { ArrowRight, Shield, Zap, Globe } from "lucide-react"

const Landing = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>

      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 50%, #E3193733 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "50%", opacity: 0.05, background: "repeating-linear-gradient(45deg, #E31937 0px, #E31937 1px, transparent 1px, transparent 40px)" }} />

        <div className="hero-grid" style={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "999px", background: "#E3193722", color: "#E31937", border: "1px solid #E3193744", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              <Zap size={12} /> Next-Gen Investment Platform
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, color: "#fff", marginBottom: "1.5rem" }}>
              INVEST IN<br /><span style={{ color: "#E31937" }}>THE FUTURE</span>
            </h1>
            <p style={{ color: "#888", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "480px" }}>
              Introducing Musk Verse — the next-gen investment platform designed to reshape global wealth through crypto and stock markets.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2rem", borderRadius: "12px", background: "#E31937", color: "#fff", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                Start Investing <ArrowRight size={18} />
              </Link>
              <Link to="/markets" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2rem", borderRadius: "12px", background: "#111", color: "#fff", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", border: "1px solid #222" }}>
                View Markets
              </Link>
            </div>
            <div style={{ display: "flex", gap: "2rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #1e1e1e", flexWrap: "wrap" }}>
              {[{ value: "25.0K+", label: "Active Investors" }, { value: "$50.0M", label: "Total Invested" }, { value: "17.5%", label: "Avg ROI" }].map(s => (
                <div key={s.label}>
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff" }}>{s.value}</p>
                  <p style={{ fontSize: "0.75rem", color: "#666" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Card - hidden on mobile via CSS */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "300px", background: "#111", borderRadius: "24px", border: "1px solid #222", padding: "1.5rem", boxShadow: "0 40px 80px rgba(227,25,55,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontWeight: 900, color: "#E31937", fontSize: "0.8rem" }}>M MUSK VERSE</span>
                <span style={{ fontSize: "0.7rem", color: "#555" }}>Portfolio</span>
              </div>
              <div style={{ background: "linear-gradient(135deg, #E31937, #8B0000)", borderRadius: "14px", padding: "1.2rem", marginBottom: "1rem" }}>
                <p style={{ color: "#ffaaaa", fontSize: "0.7rem", marginBottom: "4px" }}>Total Balance</p>
                <p style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 900 }}>$48,240.00</p>
                <p style={{ color: "#ffaaaa", fontSize: "0.72rem", marginTop: "4px" }}>+4.52% today</p>
              </div>
              {coins.slice(0, 4).map(coin => (
                <div key={coin.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #1a1a1a" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: coin.color + "22", color: coin.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 900 }}>
                      {coin.symbol.slice(0, 2)}
                    </div>
                    <span style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>{coin.symbol}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 700 }}>${coin.price.toLocaleString()}</p>
                    <p style={{ color: coin.change >= 0 ? "#4ade80" : "#f87171", fontSize: "0.68rem" }}>{coin.change >= 0 ? "+" : ""}{coin.change}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff" }}>Why Musk Verse?</h2>
          <p style={{ color: "#666", marginTop: "0.5rem" }}>Built for the next generation of investors</p>
        </div>
        <div className="grid-3">
          {[
            { icon: <Shield size={26} />, title: "Secure Platform", desc: "Bank-grade security protecting your investments around the clock with military-grade encryption." },
            { icon: <Zap size={26} />, title: "Instant Returns", desc: "Watch your portfolio grow in real time with our live market feeds and instant settlement." },
            { icon: <Globe size={26} />, title: "Global Markets", desc: "Access crypto and stocks from anywhere in the world with zero geographical restrictions." },
          ].map(item => (
            <div key={item.title} style={{ padding: "2rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "#E3193722", color: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
                {item.icon}
              </div>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MARKETS */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "#fff" }}>Live Markets</h2>
          <Link to="/markets" style={{ color: "#E31937", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid-2">
          {coins.slice(0, 6).map(coin => <CoinCard key={coin.id} coin={coin} />)}
        </div>
      </div>

      {/* PLANS */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff" }}>Investment Plans</h2>
          <p style={{ color: "#666", marginTop: "0.5rem" }}>Choose a plan that fits your goals</p>
        </div>
        <div className="grid-4">
          {plans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ borderRadius: "24px", padding: "clamp(2rem, 5vw, 4rem)", background: "linear-gradient(135deg, #E31937 0%, #8B0000 100%)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>Ready to Start Investing?</h3>
            <p style={{ color: "#ffaaaa", fontSize: "0.95rem" }}>Join 25,000+ investors already growing their wealth.</p>
          </div>
          <Link to="/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "14px", background: "#fff", color: "#E31937", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Landing