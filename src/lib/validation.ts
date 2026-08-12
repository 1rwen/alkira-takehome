export function validateEmail(email: string): string | null {
  if (!email) return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Enter a valid email address"
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required"
  if (password.length < 8) return "Password must be at least 8 characters"
  return null
}