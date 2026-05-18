import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { Users, DollarSign, CheckCircle, TrendingUp, Search, Send, X, Clock, } from "lucide-react"

const Admin = () => {
  const { users, fundUser, fetchUsers, fetchWithdrawals, updateWithdrawal } = useAuth()
  const [selectedUser, setSelectedUser] = useState(null)
  const [amount, setAmount] = useState("")
  const [success, setSuccess] = useState("")
  const [search, setSearch] = useState("")
  const [viewUser, setViewUser] = useState(null)
  const [withdrawals, setWithdrawals] = useState([])
  const [activeTab, setActiveTab] = useState("users")
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
    loadWithdrawals()
  }, [])

  const loadWithdrawals = async () => {
    const data = await fetchWithdrawals()
    setWithdrawals(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
  }

  const regularUsers = users.filter(u => u.role !== "admin")
  const filteredUsers = regularUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalFunded = regularUsers.reduce((sum, u) => sum + u.balance, 0)
  const totalInvested = regularUsers.reduce((sum, u) => sum + u.investments.reduce((s, i) => s + i.price, 0), 0)
  const totalPlans = regularUsers.reduce((sum, u) => sum + u.investments.length, 0)
  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending").length

  const handleFund = async () => {
    if (!selectedUser || !amount || Number(amount) <= 0) return
    await fundUser(selectedUser.uid, Number(amount))
    setSuccess(`$${Number(amount).toLocaleString()} funded to ${selectedUser.name}!`)
    setAmount("")
    setSelectedUser(null)
    setTimeout(() => setSuccess(""), 4000)
  }

  const handleWithdrawalAction = async (id, status) => {
    setWithdrawLoading(true)
    await updateWithdrawal(id, status)
    await loadWithdrawals()
    setWithdrawLoading(false)
  }

  const statusColor = (status) => {
    if (status === "approved") return { bg: "#22c55e22", border: "#22c55e44", text: "#4ade80" }
    if (status === "rejected") return { bg: "#E3193722", border: "#E3193744", text: "#f87171" }
    return { bg: "#f59e0b22", border: "#f59e0b44", text: "#f59e0b" }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: "80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff" }}>Admin Panel</h1>
          <p style={{ color: "#666", fontSize: "0.95rem", marginTop: "0.3rem" }}>Manage users, fund accounts, and process withdrawals.</p>
        </div>

        {/* Stats Row */}
        <div className="grid-4" style={{ marginBottom: "2rem" }}>
          {[
            { icon: <Users size={20} />, label: "Total Users", value: regularUsers.length, color: "#6366f1" },
            { icon: <DollarSign size={20} />, label: "Total Funded", value: `$${totalFunded.toLocaleString()}`, color: "#E31937" },
            { icon: <TrendingUp size={20} />, label: "Total Invested", value: `$${totalInvested.toLocaleString()}`, color: "#4ade80" },
            { icon: <Clock size={20} />, label: "Pending Withdrawals", value: pendingWithdrawals, color: "#f59e0b" },
          ].map(item => (
            <div key={item.label} style={{ padding: "1.5rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: item.color + "22", color: item.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                {item.icon}
              </div>
              <p style={{ color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{item.label}</p>
              <p style={{ color: "#fff", fontWeight: 900, fontSize: "1.6rem" }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {[
            { id: "users", label: "Users & Funding" },
            { id: "withdrawals", label: `Withdrawals ${pendingWithdrawals > 0 ? `(${pendingWithdrawals} pending)` : ""}` },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: "0.7rem 1.5rem", borderRadius: "12px", fontWeight: 700, fontSize: "0.875rem", border: "1px solid #222", cursor: "pointer", background: activeTab === tab.id ? "#E31937" : "#111", color: activeTab === tab.id ? "#fff" : "#666" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="grid-split-admin">
            {/* Fund Panel */}
            <div style={{ padding: "1.8rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e", height: "fit-content" }}>
              <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.5rem" }}>Fund User Account</h2>

              {success && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 1rem", borderRadius: "10px", background: "#22c55e22", border: "1px solid #22c55e44", color: "#4ade80", fontSize: "0.875rem", marginBottom: "1.2rem" }}>
                  <CheckCircle size={16} /> {success}
                </div>
              )}

              {selectedUser && (
                <div style={{ padding: "1rem", borderRadius: "12px", background: "#161616", border: "1px solid #E3193744", marginBottom: "1.2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.9rem" }}>
                      {selectedUser.name[0].toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{selectedUser.name}</p>
                      <p style={{ color: "#555", fontSize: "0.75rem" }}>{selectedUser.email}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "#4ade80", fontWeight: 800, fontSize: "0.9rem" }}>${selectedUser.balance.toLocaleString()}</p>
                      <p style={{ color: "#555", fontSize: "0.7rem" }}>balance</p>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Select User</label>
                  <select
                    value={selectedUser?.uid || ""}
                    onChange={(e) => {
                      const u = regularUsers.find(u => u.uid === e.target.value)
                      setSelectedUser(u || null)
                    }}
                    style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "12px", background: "#0a0a0a", border: "1px solid #222", color: selectedUser ? "#fff" : "#555", fontSize: "0.875rem", outline: "none", cursor: "pointer" }}>
                    <option value="">-- Select a user --</option>
                    {regularUsers.map(u => (
                      <option key={u.uid} value={u.uid}>{u.name} — ${u.balance.toLocaleString()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Enter Amount (USD)</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#555", fontWeight: 700 }}>$</span>
                    <input type="number" value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter any amount e.g. 2500"
                      style={{ width: "100%", padding: "0.9rem 1rem 0.9rem 2rem", borderRadius: "12px", background: "#0a0a0a", border: "1px solid #222", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <button onClick={handleFund} disabled={!selectedUser || !amount}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "1rem", borderRadius: "12px", background: !selectedUser || !amount ? "#1a1a1a" : "#E31937", color: !selectedUser || !amount ? "#444" : "#fff", fontWeight: 800, fontSize: "0.95rem", border: "none", cursor: !selectedUser || !amount ? "not-allowed" : "pointer" }}>
                  <Send size={16} /> Fund Account
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div style={{ padding: "1.8rem", borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>All Users ({regularUsers.length})</h2>
                <div style={{ position: "relative" }}>
                  <Search size={14} style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "#555" }} />
                  <input type="text" placeholder="Search users..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "0.6rem 1rem 0.6rem 2.2rem", borderRadius: "10px", background: "#0a0a0a", border: "1px solid #222", color: "#fff", fontSize: "0.8rem", outline: "none", width: "200px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.5fr", padding: "0.7rem 1rem", borderRadius: "10px", background: "#161616", marginBottom: "0.8rem" }}>
                {["User", "Balance", "Plans", ""].map(h => (
                  <span key={h} style={{ color: "#555", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "420px", overflowY: "auto" }}>
                {filteredUsers.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <p style={{ color: "#555", fontSize: "0.875rem" }}>No users registered yet.</p>
                    <p style={{ color: "#333", fontSize: "0.75rem", marginTop: "0.5rem" }}>Users appear here after they sign up.</p>
                  </div>
                ) : (
                  filteredUsers.map(u => (
                    <div key={u.uid}
                      onClick={() => setSelectedUser(u)}
                      style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.5fr", padding: "0.9rem 1rem", borderRadius: "12px", background: selectedUser?.uid === u.uid ? "#1a0a0a" : "transparent", border: selectedUser?.uid === u.uid ? "1px solid #E3193744" : "1px solid transparent", cursor: "pointer", alignItems: "center" }}
                      onMouseEnter={e => { if (selectedUser?.uid !== u.uid) e.currentTarget.style.background = "#161616" }}
                      onMouseLeave={e => { if (selectedUser?.uid !== u.uid) e.currentTarget.style.background = "transparent" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.8rem", flexShrink: 0 }}>
                          {u.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{u.name}</p>
                          <p style={{ color: "#555", fontSize: "0.72rem" }}>{u.email}</p>
                        </div>
                      </div>
                      <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.875rem" }}>${u.balance.toLocaleString()}</p>
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", background: "#E3193722", color: "#E31937", fontSize: "0.75rem", fontWeight: 700, width: "fit-content" }}>
                        {u.investments.length} plans
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setViewUser(u) }}
                        style={{ padding: "0.3rem 0.7rem", borderRadius: "6px", background: "#1e1e1e", color: "#aaa", fontSize: "0.72rem", fontWeight: 700, border: "1px solid #2a2a2a", cursor: "pointer" }}>
                        View
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* WITHDRAWALS TAB */}
        {activeTab === "withdrawals" && (
          <div style={{ borderRadius: "20px", background: "#111", border: "1px solid #1e1e1e", overflow: "hidden" }}>
            <div style={{ padding: "1.5rem 1.8rem", borderBottom: "1px solid #1e1e1e" }}>
              <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>Withdrawal Requests ({withdrawals.length})</h2>
            </div>

            {withdrawals.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem" }}>
                <p style={{ color: "#555", fontSize: "0.875rem" }}>No withdrawal requests yet.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {withdrawals.map((w, i) => {
                  const sc = statusColor(w.status)
                  return (
                    <div key={w.id} style={{ padding: "1.2rem 1.8rem", borderBottom: i < withdrawals.length - 1 ? "1px solid #161616" : "none" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.85rem", flexShrink: 0 }}>
                            {w.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{w.name}</p>
                            <p style={{ color: "#555", fontSize: "0.72rem" }}>{w.email}</p>
                            <p style={{ color: "#444", fontSize: "0.72rem", marginTop: "0.2rem" }}>{new Date(w.date).toLocaleString()}</p>
                          </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <p style={{ color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>${w.amount.toLocaleString()}</p>
                          <p style={{ color: "#666", fontSize: "0.75rem" }}>{w.method}</p>
                        </div>
                      </div>

                      {/* Wallet/Bank details */}
                      <div style={{ margin: "0.8rem 0", padding: "0.7rem 1rem", borderRadius: "8px", background: "#161616", border: "1px solid #1e1e1e" }}>
                        <p style={{ color: "#555", fontSize: "0.7rem", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{w.method === "Bank Transfer" ? "Bank Details" : "Wallet Address"}</p>
                        <p style={{ color: "#aaa", fontSize: "0.8rem", wordBreak: "break-all" }}>{w.details}</p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                        <span style={{ padding: "0.3rem 0.8rem", borderRadius: "8px", background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>
                          {w.status}
                        </span>

                        {w.status === "pending" && (
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                              onClick={() => handleWithdrawalAction(w.id, "rejected")}
                              disabled={withdrawLoading}
                              style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "#E3193722", color: "#f87171", fontWeight: 700, fontSize: "0.8rem", border: "1px solid #E3193744", cursor: "pointer" }}>
                              Reject
                            </button>
                            <button
                              onClick={() => handleWithdrawalAction(w.id, "approved")}
                              disabled={withdrawLoading}
                              style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "#22c55e", color: "#fff", fontWeight: 700, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
                              Approve
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {viewUser && (
        <div onClick={() => setViewUser(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "#111", border: "1px solid #222", borderRadius: "24px", padding: "2rem", width: "100%", maxWidth: "480px", maxHeight: "85vh", overflowY: "auto" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>User Details</h3>
              <button onClick={() => setViewUser(null)}
                style={{ background: "#1e1e1e", border: "none", color: "#aaa", cursor: "pointer", borderRadius: "8px", padding: "0.4rem", display: "flex" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", padding: "1.2rem", borderRadius: "16px", background: "#161616" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "1.2rem", flexShrink: 0 }}>
                {viewUser.name[0].toUpperCase()}
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>{viewUser.name}</p>
                <p style={{ color: "#666", fontSize: "0.85rem" }}>{viewUser.email}</p>
                <p style={{ color: "#444", fontSize: "0.72rem", marginTop: "0.2rem" }}>Joined {new Date(viewUser.createdAt).toLocaleDateString()}</p>
                <span style={{ display: "inline-block", marginTop: "0.3rem", padding: "0.2rem 0.6rem", borderRadius: "6px", background: "#22c55e22", color: "#4ade80", fontSize: "0.72rem", fontWeight: 700 }}>
                  Active User
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Account Balance", value: `$${viewUser.balance.toLocaleString()}`, color: "#4ade80" },
                { label: "Total Invested", value: `$${viewUser.investments.reduce((s, i) => s + i.price, 0).toLocaleString()}`, color: "#E31937" },
                { label: "Active Plans", value: viewUser.investments.length, color: "#f59e0b" },
                { label: "Member ID", value: `#${viewUser.uid.slice(0, 6)}`, color: "#6366f1" },
              ].map(item => (
                <div key={item.label} style={{ padding: "1rem", borderRadius: "12px", background: "#0a0a0a", border: "1px solid #1e1e1e" }}>
                  <p style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{item.label}</p>
                  <p style={{ color: item.color, fontWeight: 800, fontSize: "1.1rem" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p style={{ color: "#666", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem" }}>Investment History</p>
              {viewUser.investments.length === 0 ? (
                <p style={{ color: "#333", fontSize: "0.875rem", textAlign: "center", padding: "1.5rem" }}>No investments yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {viewUser.investments.map((inv, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.8rem 1rem", borderRadius: "10px", background: "#161616", border: "1px solid #1e1e1e" }}>
                      <div>
                        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{inv.name} Plan</p>
                        <p style={{ color: "#555", fontSize: "0.72rem" }}>{new Date(inv.date).toLocaleDateString()}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>${inv.price.toLocaleString()}</p>
                        <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 600 }}>{inv.roi} ROI</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { setSelectedUser(viewUser); setViewUser(null); setActiveTab("users") }}
              style={{ width: "100%", marginTop: "1.5rem", padding: "0.9rem", borderRadius: "12px", background: "#E31937", color: "#fff", fontWeight: 800, fontSize: "0.95rem", border: "none", cursor: "pointer" }}>
              Fund This User
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin