import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { LoginForm } from "./LoginForm"

function renderLoginForm() {
  return render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  )
}

describe("LoginForm", () => {
  it("shows validation errors on empty submit", async () => {
    renderLoginForm()
    const user = userEvent.setup()

    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(await screen.findByText("Email is required")).toBeInTheDocument()
    expect(await screen.findByText("Password is required")).toBeInTheDocument()
  })

  it("shows an error for invalid email format", async () => {
    renderLoginForm()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), "not-an-email")
    await user.type(screen.getByLabelText(/password/i), "password123")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument()
  })

  it("shows an error for unmatched credentials", async () => {
    renderLoginForm()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), "nobody@example.com")
    await user.type(screen.getByLabelText(/password/i), "password123")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(await screen.findByText("Invalid email or password")).toBeInTheDocument()
  })
})