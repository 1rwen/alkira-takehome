import { describe, it, expect } from "vitest"
import { findUser } from "./mockUsers"

describe("findUser", () => {
  it("finds a user with correct credentials", () => {
    const user = findUser("viewer@example.com", "password123")
    expect(user).toBeDefined()
    expect(user?.role).toBe("read-only")
  })

  it("is case-insensitive on email", () => {
    const user = findUser("VIEWER@example.com", "password123")
    expect(user).toBeDefined()
  })

  it("returns undefined for wrong password", () => {
    const user = findUser("viewer@example.com", "wrongpassword")
    expect(user).toBeUndefined()
  })

  it("returns undefined for unknown email", () => {
    const user = findUser("nobody@example.com", "password123")
    expect(user).toBeUndefined()
  })
})