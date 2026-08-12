import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

// Hardcoded so you can actually test the flow without real OTP infra
const MOCK_OTP = "123456"

export function MFAForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string })?.email

  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!code) {
      setError("Enter the code sent to your email")
      return
    }
    if (code !== MOCK_OTP) {
      setError("Invalid code. Try again.")
      return
    }

    setError("")
    // Real login success — redirect wherever your authenticated app lives
    navigate("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verify it's you</CardTitle>
          <CardDescription>
            {email
              ? `Enter the 6-digit code sent to ${email}`
              : "Enter the 6-digit code sent to your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="otp">Verification code</Label>
              <Input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <Button type="submit" className="w-full">
              Verify
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              For this demo, the code is {MOCK_OTP}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}