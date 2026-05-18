import { useState } from "react"
import { coins } from "../data/coins"
import { useNavigate } from "react-router-dom"
import { Search, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"

const Markets = () => {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const navigate = useNavigate()

  const filtered = coins.filter(c => {
    const matchQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.symbol.toLowerCase().includes(query.toLowerCase())
    const matchTab = activeTab === "All" || (activeTab === "Stocks" && c.symbol === "TSLA") || (activeTab === "Crypto" && c.symbol !== "TSLA")
    return matchQuery && matchTab
  })

  const topGainers = [...coins].sort((a, b) => b.change - a.change).slice(0, 3)
  const topLosers = [...coins].sort((a, b) => a.change - b.change).slice(0, 3)

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: "80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>Markets</h1>
          <p style={{ color: "#666", fontSize: "0.95rem" }}>Live prices across all assets. Click any asset to invest.</p>
        </div>

        {/* Gainers & Losers */}
        <div className="grid-split" style={{ marginBottom: "2rem" }}>
          {[
            { title: "Top Gainers", icon: <TrendingUp size={18} color="#4ade80" />, list: topGainers, positive: true },
            { title: "Top Losers", icon: <TrendingDown size={18} color="#f87171" />, list: topLosers, positive: false },
          ].map(section => (
            <div key={section.title} style={{ padding: "1.5rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
                {section.icon}
                <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem" }}>{section.title}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {section.list.map(coin => (
                  <div key={coin.id} onClick={() => navigate(`/asset/${coin.id}`)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: coin.color + "22", color: coin.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 900 }}>
                        {coin.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{coin.symbol}</p>
                        <p style={{ color: "#555", fontSize: "0.75rem" }}>{coin.name}</p>
                      </div>
                    </div>
                    <span style={{ color: section.positive ? "#4ade80" : "#f87171", fontWeight: 700, fontSize: "0.875rem" }}>
                      {section.positive ? "+" : ""}{coin.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Search + Tabs */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#555" }} />
            <input type="text" placeholder="Search assets..."
              value={query} onChange={(e) => setQuery(e.target.value)}
              style={{ width: "100%", padding: "0.8rem 1rem 0.8rem 2.8rem", borderRadius: "12px", background: "#111", border: "1px solid #222", color: "#fff", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["All", "Crypto", "Stocks"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "0.6rem 1.2rem", borderRadius: "10px", fontWeight: 700, fontSize: "0.8rem", border: "1px solid #222", cursor: "pointer", background: activeTab === tab ? "#E31937" : "#111", color: activeTab === tab ? "#fff" : "#666" }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table — desktop */}
        <div className="hide-mobile" style={{ borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr", padding: "1rem 1.5rem", borderBottom: "1px solid #1e1e1e" }}>
            {["Asset", "Price", "24h Change", "Volume", "Action"].map(h => (
              <span key={h} style={{ color: "#555", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
            ))}
          </div>
          {filtered.map((coin, i) => (
            <div key={coin.id}
              style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr", padding: "1rem 1.5rem", borderBottom: i < filtered.length - 1 ? "1px solid #1a1a1a" : "none", alignItems: "center", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#161616"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              onClick={() => navigate(`/asset/${coin.id}`)}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: coin.color + "22", color: coin.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900 }}>
                  {coin.symbol.slice(0, 2)}
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{coin.name}</p>
                  <p style={{ color: "#555", fontSize: "0.75rem" }}>{coin.symbol}</p>
                </div>
              </div>
              <p style={{ color: "#fff", fontWeight: 700 }}>${coin.price.toLocaleString()}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                {coin.change >= 0 ? <TrendingUp size={14} color="#4ade80" /> : <TrendingDown size={14} color="#f87171" />}
                <span style={{ color: coin.change >= 0 ? "#4ade80" : "#f87171", fontWeight: 700, fontSize: "0.875rem" }}>
                  {coin.change >= 0 ? "+" : ""}{coin.change}%
                </span>
              </div>
              <p style={{ color: "#666", fontSize: "0.875rem" }}>${(coin.price * 48200).toLocaleString(undefined, { notation: "compact" })}</p>
              <button onClick={(e) => { e.stopPropagation(); navigate(`/asset/${coin.id}`) }}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.4rem 1rem", borderRadius: "8px", background: "#E3193722", color: "#E31937", fontWeight: 700, fontSize: "0.8rem", border: "1px solid #E3193744", cursor: "pointer" }}>
                Invest <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Cards — mobile */}
        <div className="show-mobile" style={{ display: "none", flexDirection: "column", gap: "0.8rem" }}>
          {filtered.map(coin => (
            <div key={coin.id} onClick={() => navigate(`/asset/${coin.id}`)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", borderRadius: "16px", background: "#111", border: "1px solid #1e1e1e", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: coin.color + "22", color: coin.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900 }}>
                  {coin.symbol.slice(0, 2)}
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{coin.name}</p>
                  <p style={{ color: "#555", fontSize: "0.75rem" }}>{coin.symbol}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>${coin.price.toLocaleString()}</p>
                <p style={{ color: coin.change >= 0 ? "#4ade80" : "#f87171", fontSize: "0.8rem", fontWeight: 600 }}>
                  {coin.change >= 0 ? "+" : ""}{coin.change}%
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Markets