import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const canEdit = user?.role === "read-write"

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <CardDescription>
            Signed in as {user?.email} ({user?.role})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <p className="mb-3">Document: Q3 Report</p>

            {canEdit ? (
              <div className="flex gap-2">
                <Button size="sm">Edit</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                You have read-only access. Editing is disabled.
              </p>
            )}
          </div>

          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}