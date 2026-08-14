import { describe, it, expect } from "vitest"
import { validateEmail, validatePassword } from "./validation"

describe("validateEmail", () => {
  it("returns an error when empty", () => {
    expect(validateEmail("")).toBe("Email is required")
  })

  it("returns an error for invalid format", () => {
    expect(validateEmail("not-an-email")).toBe("Enter a valid email address")
  })

  it("returns null for a valid email", () => {
    expect(validateEmail("user@example.com")).toBeNull()
  })
})

describe("validatePassword", () => {
  it("returns an error when empty", () => {
    expect(validatePassword("")).toBe("Password is required")
  })

  it("returns an error when under 8 characters", () => {
    expect(validatePassword("short")).toBe("Password must be at least 8 characters")
  })

  it("returns null for a valid password", () => {
    expect(validatePassword("password123")).toBeNull()
  })
})