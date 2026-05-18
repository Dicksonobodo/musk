import { useAuth } from "../hooks/useAuth"
import { useWallet } from "../hooks/useWallet"
import { CheckCircle } from "lucide-react"

const PlanCard = ({ plan }) => {
  const { invest } = useAuth()
  const { balance } = useWallet()

  const handleInvest = () => {
    if (balance < plan.price) {
      alert("Insufficient balance. Please contact admin to fund your account.")
      return
    }
    const result = invest(plan)
    if (result.success) {
      alert(`Successfully invested in ${plan.name} plan!`)
    } else {
      alert(result.message)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl"
      style={{ background: "#111111", border: `1px solid ${plan.color}44` }}>
      <div className="flex items-center justify-between">
        <span className="font-black text-lg" style={{ color: plan.color }}>{plan.name}</span>
        <span className="text-xs px-2 py-1 rounded-full font-semibold"
          style={{ background: plan.color + "22", color: plan.color }}>
          {plan.roi} ROI
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { label: "Minimum", value: `$${plan.price.toLocaleString()}` },
          { label: "Duration", value: plan.duration },
          { label: "Returns", value: plan.roi },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <CheckCircle size={14} style={{ color: plan.color }} />
            <span className="text-gray-400">{item.label}:</span>
            <span className="text-white font-semibold">{item.value}</span>
          </div>
        ))}
      </div>

      <button onClick={handleInvest}
        className="w-full py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
        style={{ background: plan.color }}>
        Invest Now
      </button>
    </div>
  )
}

export default PlanCard