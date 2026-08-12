import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { LoginForm } from "@/components/LoginForm"
import { MFAForm } from "@/components/MFAForm"
import { SignUpForm } from "@/components/SignUpForm"
import { Dashboard } from "@/components/Dashboard"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/mfa" element={<MFAForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App