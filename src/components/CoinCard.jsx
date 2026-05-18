import { useNavigate } from "react-router-dom"
import { TrendingUp, TrendingDown } from "lucide-react"

const CoinCard = ({ coin }) => {
  const navigate = useNavigate()
  const isPositive = coin.change >= 0

  return (
    <div onClick={() => navigate(`/asset/${coin.id}`)}
      className="flex items-center justify-between p-4 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform"
      style={{ background: "#111111", border: "1px solid #1e1e1e" }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
          style={{ background: coin.color + "22", color: coin.color }}>
          {coin.symbol.slice(0, 2)}
        </div>
        <div>
          <p className="text-white font-bold text-sm">{coin.name}</p>
          <p className="text-gray-500 text-xs">{coin.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-bold text-sm">${coin.price.toLocaleString()}</p>
        <div className={`flex items-center gap-1 justify-end text-xs font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? "+" : ""}{coin.change}%
        </div>
      </div>
    </div>
  )
}

export default CoinCard