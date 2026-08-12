import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginForm } from "@/components/LoginForm"
import { MFAForm } from "@/components/MFAForm"
import { SignUpForm } from "@/components/SignUpForm"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/mfa" element={<MFAForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App