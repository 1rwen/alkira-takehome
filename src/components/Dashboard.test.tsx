import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import { Dashboard } from "./Dashboard"
import type { MockUser } from "@/lib/mockUsers"

function renderDashboard(user: MockUser) {
  return render(
    <AuthContext.Provider value={{ user, login: () => {}, logout: () => {} }}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

describe("Dashboard role-based access", () => {
  it("hides edit actions for read-only users", () => {
    renderDashboard({ email: "viewer@example.com", password: "password123", role: "read-only" })

    expect(screen.queryByRole("button", { name: /edit/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument()
    expect(screen.getByText(/read-only access/i)).toBeInTheDocument()
  })

  it("shows edit actions for read-write users", () => {
    renderDashboard({ email: "editor@example.com", password: "password123", role: "read-write" })

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument()
  })
})