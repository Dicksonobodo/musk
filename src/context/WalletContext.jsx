import { createContext } from "react"
import { useAuth } from "../hooks/useAuth"

export const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
  const { user } = useAuth()

  const balance = user?.balance || 0
  const investments = user?.investments || []
  const totalInvested = investments.reduce((sum, inv) => sum + inv.price, 0)

  return (
    <WalletContext.Provider value={{ balance, investments, totalInvested }}>
      {children}
    </WalletContext.Provider>
  )
}