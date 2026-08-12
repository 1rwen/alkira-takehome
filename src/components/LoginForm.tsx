import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
import { validateEmail, validatePassword } from "@/lib/validation"

export function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError ?? undefined,
        password: passwordError ?? undefined,
      })
      return
    }

    setErrors({})
    // In a real app you'd verify credentials against a backend here.
    // For this flow, passing validation sends the user to the MFA step.
    navigate("/mfa", { state: { email } })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}