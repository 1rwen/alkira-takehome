import { createContext, useContext, useState, type ReactNode } from "react"
import type { MockUser } from "@/lib/mockUsers"

interface AuthContextType {
  user: MockUser | null
  login: (user: MockUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)

  const login = (user: MockUser) => setUser(user)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

// auth context to hold the logged in user across screens