import { useAuth } from "../hooks/useAuth"
import { useWallet } from "../hooks/useWallet"
import { plans } from "../data/plans"
import { coins } from "../data/coins"
import PlanCard from "../components/PlanCard"
import PriceChart from "../components/PriceChart"
import { generateChartData } from "../data/coins"
import { useState, useEffect } from "react"
import { TrendingUp, Wallet, Clock, ArrowRight, X, CheckCircle, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user, requestWithdrawal, refreshUser } = useAuth()
  const { balance, investments, totalInvested } = useWallet()
  const navigate = useNavigate()
  const [chartData] = useState(generateChartData())
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [withdrawForm, setWithdrawForm] = useState({ amount: "", method: "Bitcoin", details: "" })
  const [withdrawStatus, setWithdrawStatus] = useState(null)
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  useEffect(() => {
    refreshUser()
  }, [])

  const totalROI = investments.reduce((sum, inv) => {
    const roi = parseFloat(inv.roi) || 0
    return sum + (inv.price * roi / 100)
  }, 0)

  const handleWithdraw = async () => {
    if (!withdrawForm.amount || !withdrawForm.details) {
      setWithdrawStatus({ type: "error", message: "Please fill all fields" })
      return
    }
    if (Number(withdrawForm.amount) > balance) {
      setWithdrawStatus({ type: "error", message: "Amount exceeds your balance" })
      return
    }
    setWithdrawLoading(true)
    const result = await requestWithdrawal(
      Number(withdrawForm.amount),
      withdrawForm.method,
      withdrawForm.details
    )
    setWithdrawLoading(false)
    if (result.success) {
      setWithdrawStatus({ type: "success", message: "Withdrawal request submitted! Admin will process it shortly." })
      setWithdrawForm({ amount: "", method: "Bitcoin", details: "" })
      setTimeout(() => { setShowWithdraw(false); setWithdrawStatus(null) }, 3000)
    } else {
      setWithdrawStatus({ type: "error", message: result.message })
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: "80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ color: "#666", fontSize: "0.875rem" }}>Welcome back,</p>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff" }}>{user?.name} 👋</h1>
          </div>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button onClick={() => setShowWithdraw(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.5rem", borderRadius: "12px", background: "#111", color: "#fff", fontWeight: 700, fontSize: "0.875rem", border: "1px solid #222", cursor: "pointer" }}>
              Withdraw
            </button>
            <button onClick={() => navigate("/markets")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.5rem", borderRadius: "12px", background: "#E31937", color: "#fff", fontWeight: 700, fontSize: "0.875rem", border: "none", cursor: "pointer" }}>
              Invest Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.8rem", borderRadius: "20px", background: "linear-gradient(135deg, #E31937 0%, #8B0000 100%)" }}>
            <p style={{ color: "#ffaaaa", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Total Balance</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", marginBottom: "0.3rem" }}>${balance.toLocaleString()}</h2>
            <p style={{ color: "#ffaaaa", fontSize: "0.8rem" }}>Available to invest or withdraw</p>
          </div>
          {[
            { icon: <TrendingUp size={20} />, label: "Total Invested", value: `$${totalInvested.toLocaleString()}` },
            { icon: <Clock size={20} />, label: "Active Plans", value: investments.length },
            { icon: <Wallet size={20} />, label: "Expected ROI", value: `$${totalROI.toLocaleString()}` },
          ].map(item => (
            <div key={item.label} style={{ padding: "1.8rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#E3193722", color: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                {item.icon}
              </div>
              <p style={{ color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{item.label}</p>
              <p style={{ color: "#fff", fontWeight: 900, fontSize: "1.6rem" }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Chart + Investments */}
        <div className="grid-split-wide" style={{ marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.8rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>Portfolio Performance</h3>
              <span style={{ color: "#4ade80", fontSize: "0.8rem", fontWeight: 700 }}>+17.5% overall</span>
            </div>
            <PriceChart data={chartData} color="#E31937" />
          </div>

          <div style={{ padding: "1.8rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e" }}>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1rem", marginBottom: "1.5rem" }}>Active Investments</h3>
            {investments.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "180px", gap: "1rem" }}>
                <TrendingUp size={32} color="#333" />
                <p style={{ color: "#555", fontSize: "0.875rem", textAlign: "center" }}>No active investments yet.</p>
                <button onClick={() => navigate("/markets")}
                  style={{ padding: "0.6rem 1.2rem", borderRadius: "10px", background: "#E31937", color: "#fff", fontWeight: 700, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
                  Browse Markets
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", maxHeight: "300px", overflowY: "auto" }}>
                {investments.map((inv, i) => {
                  const roi = parseFloat(inv.roi) || 0
                  const expectedReturn = inv.price + (inv.price * roi / 100)
                  const profit = inv.price * roi / 100
                  return (
                    <div key={i} style={{ padding: "1rem", borderRadius: "12px", background: "#161616", border: "1px solid #1e1e1e" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                        <div>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{inv.name} Plan</p>
                          <p style={{ color: "#555", fontSize: "0.72rem" }}>{new Date(inv.date).toLocaleDateString()} · {inv.duration}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>${inv.price.toLocaleString()}</p>
                          <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 600 }}>+${profit.toLocaleString()} expected</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{ height: "4px", borderRadius: "2px", background: "#222", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: "35%", borderRadius: "2px", background: "linear-gradient(90deg, #E31937, #ff6b6b)" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
                        <span style={{ color: "#555", fontSize: "0.68rem" }}>In Progress</span>
                        <span style={{ color: "#E31937", fontSize: "0.68rem", fontWeight: 600 }}>{inv.roi} ROI · ${expectedReturn.toLocaleString()} total</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Markets */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>Quick Markets</h3>
            <button onClick={() => navigate("/markets")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#E31937", fontWeight: 700, fontSize: "0.8rem", background: "none", border: "none", cursor: "pointer" }}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          <div className="grid-5">
            {coins.slice(0, 5).map(coin => (
              <div key={coin.id} onClick={() => navigate(`/asset/${coin.id}`)}
                style={{ padding: "1.2rem", borderRadius: "16px", background: "#111", border: "1px solid #1e1e1e", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = coin.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: coin.color + "22", color: coin.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 900, marginBottom: "0.8rem" }}>
                  {coin.symbol.slice(0, 2)}
                </div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.2rem" }}>{coin.symbol}</p>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: "0.95rem", marginBottom: "0.2rem" }}>${coin.price.toLocaleString()}</p>
                <p style={{ color: coin.change >= 0 ? "#4ade80" : "#f87171", fontSize: "0.75rem", fontWeight: 600 }}>
                  {coin.change >= 0 ? "+" : ""}{coin.change}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1rem", marginBottom: "1.2rem" }}>Investment Plans</h3>
          <div className="grid-4">
            {plans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdraw && (
        <div onClick={() => setShowWithdraw(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "#111", border: "1px solid #222", borderRadius: "24px", padding: "2rem", width: "100%", maxWidth: "440px" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>Request Withdrawal</h3>
              <button onClick={() => setShowWithdraw(false)}
                style={{ background: "#1e1e1e", border: "none", color: "#aaa", cursor: "pointer", borderRadius: "8px", padding: "0.4rem", display: "flex" }}>
                <X size={18} />
              </button>
            </div>

            {/* Balance info */}
            <div style={{ padding: "1rem", borderRadius: "12px", background: "#161616", border: "1px solid #1e1e1e", marginBottom: "1.5rem" }}>
              <p style={{ color: "#666", fontSize: "0.75rem", marginBottom: "0.3rem" }}>Available Balance</p>
              <p style={{ color: "#4ade80", fontWeight: 900, fontSize: "1.5rem" }}>${balance.toLocaleString()}</p>
            </div>

            {withdrawStatus && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 1rem", borderRadius: "10px", background: withdrawStatus.type === "success" ? "#22c55e22" : "#E3193722", border: `1px solid ${withdrawStatus.type === "success" ? "#22c55e44" : "#E3193744"}`, color: withdrawStatus.type === "success" ? "#4ade80" : "#ff6b6b", fontSize: "0.875rem", marginBottom: "1.2rem" }}>
                {withdrawStatus.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {withdrawStatus.message}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Amount (USD)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#555", fontWeight: 700 }}>$</span>
                  <input type="number" value={withdrawForm.amount}
                    onChange={e => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                    placeholder="Enter amount"
                    style={{ width: "100%", padding: "0.9rem 1rem 0.9rem 2rem", borderRadius: "12px", background: "#0a0a0a", border: "1px solid #222", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Withdrawal Method</label>
                <select value={withdrawForm.method}
                  onChange={e => setWithdrawForm({ ...withdrawForm, method: e.target.value })}
                  style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "12px", background: "#0a0a0a", border: "1px solid #222", color: "#fff", fontSize: "0.875rem", outline: "none" }}>
                  <option>Bitcoin</option>
                  <option>Ethereum</option>
                  <option>USDT</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                  {withdrawForm.method === "Bank Transfer" ? "Bank Details" : "Wallet Address"}
                </label>
                <textarea value={withdrawForm.details}
                  onChange={e => setWithdrawForm({ ...withdrawForm, details: e.target.value })}
                  placeholder={withdrawForm.method === "Bank Transfer" ? "Bank name, account number, account name..." : "Enter your wallet address..."}
                  rows={3}
                  style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "12px", background: "#0a0a0a", border: "1px solid #222", color: "#fff", fontSize: "0.875rem", outline: "none", resize: "none", boxSizing: "border-box" }}
                />
              </div>

              <button onClick={handleWithdraw} disabled={withdrawLoading}
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "#E31937", color: "#fff", fontWeight: 800, fontSize: "0.95rem", border: "none", cursor: "pointer", opacity: withdrawLoading ? 0.7 : 1 }}>
                {withdrawLoading ? "Submitting..." : "Submit Withdrawal Request"}
              </button>

              <p style={{ color: "#444", fontSize: "0.75rem", textAlign: "center" }}>
                Withdrawal requests are processed by admin within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard