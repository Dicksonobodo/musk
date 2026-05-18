import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const PriceChart = ({ data, color = "#E31937" }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" stroke="#333" tick={{ fill: "#666", fontSize: 11 }} />
        <YAxis stroke="#333" tick={{ fill: "#666", fontSize: 11 }} />
        <Tooltip
          contentStyle={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "8px", color: "#fff" }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default PriceChart