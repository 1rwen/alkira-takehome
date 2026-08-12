import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import type { ReactNode } from "react"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// a guard for a user that tries to enter /dashboard without being logging in