export type Role = "read-only" | "read-write"

// acts like a database by using hard coded predefined array

export interface MockUser {
  email: string
  password: string
  role: Role
}

export const MOCK_USERS: MockUser[] = [
  { email: "viewer@example.com", password: "password123", role: "read-only" },
  { email: "editor@example.com", password: "password123", role: "read-write" },
]

export function findUser(email: string, password: string): MockUser | undefined {
  return MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
}