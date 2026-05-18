import { useParams, useNavigate } from "react-router-dom"
import { coins, generateChartData } from "../data/coins"
import { plans } from "../data/plans"
import PriceChart from "../components/PriceChart"
import PlanCard from "../components/PlanCard"
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

const AssetDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const coin = coins.find(c => c.id === Number(id))
  const [chartData] = useState(generateChartData())

  if (!coin) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Asset not found.</p>
    </div>
  )

  const isPositive = coin.change >= 0

  return (
    <div className="min-h-screen px-6 pt-28 pb-24">
      {/* Back */}
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 text-sm mb-6 hover:text-white">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-black"
            style={{ background: coin.color + "22", color: coin.color }}>
            {coin.symbol.slice(0, 2)}
          </div>
          <div>
            <h1 className="text-xl font-black text-white">{coin.name}</h1>
            <p className="text-gray-500 text-sm">{coin.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-white">${coin.price.toLocaleString()}</p>
          <div className={`flex items-center gap-1 justify-end text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {isPositive ? "+" : ""}{coin.change}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 rounded-2xl mb-6"
        style={{ background: "#111", border: "1px solid #1e1e1e" }}>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Price Chart</p>
        <PriceChart data={chartData} color={coin.color} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Open", value: `$${(coin.price * 0.98).toFixed(2)}` },
          { label: "High", value: `$${(coin.price * 1.04).toFixed(2)}` },
          { label: "Low", value: `$${(coin.price * 0.95).toFixed(2)}` },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center gap-1 p-3 rounded-2xl"
            style={{ background: "#111", border: "1px solid #1e1e1e" }}>
            <p className="text-gray-500 text-xs">{item.label}</p>
            <p className="text-white font-bold text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-black text-white mb-4">Investment Plans</h2>
        <div className="flex flex-col gap-4">
          {plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AssetDetail