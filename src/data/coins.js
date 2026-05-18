export const coins = [
  { id: 1, symbol: "BTC", name: "Bitcoin", price: 67842.30, change: 2.4, color: "#F7931A" },
  { id: 2, symbol: "ETH", name: "Ethereum", price: 3521.10, change: -1.2, color: "#627EEA" },
  { id: 3, symbol: "TSLA", name: "Tesla Stock", price: 248.42, change: 1.8, color: "#E31937" },
  { id: 4, symbol: "SOL", name: "Solana", price: 182.55, change: 5.1, color: "#9945FF" },
  { id: 5, symbol: "BNB", name: "Binance Coin", price: 412.30, change: 0.9, color: "#F3BA2F" },
  { id: 6, symbol: "XRP", name: "Ripple", price: 0.62, change: -0.5, color: "#00AAE4" },
  { id: 7, symbol: "ADA", name: "Cardano", price: 0.45, change: 3.2, color: "#0033AD" },
  { id: 8, symbol: "DOGE", name: "Dogecoin", price: 0.18, change: 7.5, color: "#C2A633" },
  { id: 9, symbol: "MATIC", name: "Polygon", price: 0.88, change: -2.1, color: "#8247E5" },
  { id: 10, symbol: "AVAX", name: "Avalanche", price: 38.92, change: 4.3, color: "#E84142" },
]

export const generateChartData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    price: Math.floor(Math.random() * 5000) + 1000,
  }))
}