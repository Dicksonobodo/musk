const StatCard = ({ label, value, icon }) => {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-2xl"
      style={{ background: "#111111", border: "1px solid #1e1e1e" }}>
      <span className="text-gray-400 text-xs uppercase tracking-widest">{label}</span>
      <span className="text-white text-2xl font-black">{value}</span>
      {icon && <span className="text-gray-500 text-xs">{icon}</span>}
    </div>
  )
}

export default StatCard