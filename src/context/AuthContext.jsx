import { createContext, useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore"
import { auth, db } from "../firebase"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUser({ uid: firebaseUser.uid, ...docSnap.data() })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"))
    const list = snapshot.docs.map(d => ({ uid: d.id, ...d.data() }))
    setUsers(list.filter(u => u.role !== "admin"))
  }

  const register = async (name, email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = {
        name,
        email,
        role: "user",
        balance: 0,
        investments: [],
        createdAt: new Date().toISOString()
      }
      await setDoc(doc(db, "users", cred.user.uid), newUser)
      setUser({ uid: cred.user.uid, ...newUser })
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const login = async (email, password) => {
    try {
      if (email === "admin@muskverse.com" && password === "admin123") {
        const adminUser = {
          uid: "admin",
          name: "Admin",
          email,
          role: "admin",
          balance: 0,
          investments: []
        }
        setUser(adminUser)
        return { success: true }
      }
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const docSnap = await getDoc(doc(db, "users", cred.user.uid))
      if (docSnap.exists()) {
        setUser({ uid: cred.user.uid, ...docSnap.data() })
      }
      return { success: true }
    } catch (err) {
      return { success: false, message: "Invalid email or password" }
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setUsers([])
  }

  const fundUser = async (uid, amount) => {
    try {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) return
      const current = docSnap.data().balance || 0
      await updateDoc(docRef, { balance: current + Number(amount) })
      await fetchUsers()
    } catch (err) {
      console.error("Fund error:", err.message)
      alert("Error funding account: " + err.message)
    }
  }

  const invest = async (plan) => {
    if (!user || user.balance < plan.price) return { success: false, message: "Insufficient balance" }
    try {
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      const current = docSnap.data()
      const updatedInvestments = [
        ...(current.investments || []),
        { ...plan, date: new Date().toISOString(), status: "active", expectedReturn: (plan.price * parseFloat(plan.roi) / 100) + plan.price }
      ]
      await updateDoc(docRef, {
        balance: current.balance - plan.price,
        investments: updatedInvestments
      })
      const updated = { ...user, balance: user.balance - plan.price, investments: updatedInvestments }
      setUser(updated)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const requestWithdrawal = async (amount, method, details) => {
    if (!user || user.balance < amount) return { success: false, message: "Insufficient balance" }
    try {
      const withdrawal = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        amount: Number(amount),
        method,
        details,
        status: "pending",
        date: new Date().toISOString()
      }
      await addDoc(collection(db, "withdrawals"), withdrawal)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const fetchWithdrawals = async () => {
    try {
      const snapshot = await getDocs(collection(db, "withdrawals"))
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (err) {
      console.error("Fetch withdrawals error:", err)
      return []
    }
  }

  const updateWithdrawal = async (id, status) => {
    try {
      await updateDoc(doc(db, "withdrawals", id), { status })
    } catch (err) {
      console.error("Update withdrawal error:", err)
    }
  }

  const refreshUser = async () => {
    if (!user || user.uid === "admin") return
    const docSnap = await getDoc(doc(db, "users", user.uid))
    if (docSnap.exists()) {
      setUser({ uid: user.uid, ...docSnap.data() })
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#E31937", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>M</div>
          <p style={{ color: "#666", fontSize: "0.875rem" }}>Loading Musk Verse...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, users, register, login, logout, fundUser, invest, fetchUsers, requestWithdrawal, fetchWithdrawals, updateWithdrawal, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}