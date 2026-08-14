# Take-Home Exercise: Login + MFA
An authentication experience demonstrating login, MFA, form validation, and basic access control. 

# Technologies used
- React - UI Library
- TypeScript
- Vite
- Tailwind CSS v4
- schdcn (Base UI / Nova Preset) - Component Library (Button , Input, Label, Card)
- React Router (react-router-dom) - client-side routing
- React Context AP - global auth state
- Vitest + React Testing Library — unit and component testing

In this project, no backend/database was used as all authentication is purely mocked client-side per the assignment requirements.

# Setup / Install Instructions
1. Clone or download the project.
2. Install dependencies:
Setup / Install Instructions
```
npm install
```
Start the dev server:
```
npm run dev
```

## Mock User Credentials / Roles

Two mock accounts are hardcoded in `src/lib/mockUsers.ts`:

| Email | Password | Role | Access |
|---|---|---|---|
| `viewer@example.com` | `password123` | `read-only` | Dashboard renders without Edit/Delete controls |
| `editor@example.com` | `password123` | `read-write` | Dashboard renders with Edit/Delete controls enabled |

Both accounts use the same mock OTP code for MFA (see below).

## How to Test the Login / MFA Flow

1. Go to `/` (the login screen).
2. Any attempt with an empty email/password, an invalid email format, and a password under 8 characters, confirms inline validation errors appear for each case.
3. Enter valid credentials requirement for either mock user above and submit.
4. You'll be routed to `/mfa`. Enter the mock code **`123456`**.
   - Entering an incorrect code shows an error and does not proceed.
   - Entering the correct code logs you in and redirects to `/dashboard`.
5. On `/dashboard`, confirm the UI matches the logged-in user's role (see table above).
6. Try navigating directly to `/dashboard` in a fresh tab/session without logging in — you should be redirected back to `/`, since the route is guarded.
7. From `/`, click "Sign up" to confirm it navigates to `/signup` as a separate screen. Submitting valid values there mocks account creation and redirects back to `/`.
8. Use the "Log out" button on the dashboard to clear the session and confirm you're returned to `/`.

## Running Automated Tests

Unit and component tests are written with **Vitest** and **React Testing Library**.

Run the full suite:
```bash
npm test
```

Run in watch mode while developing:
```bash
npm run test:watch
```

**Coverage:**
- `src/lib/validation.test.ts` — email and password validation rules
- `src/lib/mockUsers.test.ts` — mock user lookup (correct/incorrect credentials, case-insensitivity)
- `src/components/LoginForm.test.tsx` — empty-field validation, invalid email format, invalid credentials
- `src/components/Dashboard.test.tsx` — role-based rendering (read-only users don't see Edit/Delete controls; read-write users do)

End-to-end coverage of the full login → MFA → dashboard flow was intentionally left to manual testing (see the section above) rather than automated, given the take-home's scope — but the underlying logic each step depends on (validation, user lookup, role gating) is unit/component tested.
## Key Design Decisions and Assumptions

- **Mock data over persistence:** Per the assignment ("mock users/roles are acceptable, no backend authentication required"), user records live in a static in-memory array (`MOCK_USERS`) rather than a database. Nothing is written to disk, state resets on page refresh or dev server restart.
- **Separation of authentication vs. authorization:** `ProtectedRoute` only checks *whether* a user is logged in (binary), while role-based UI logic in `Dashboard` checks *what* that user is allowed to do (graded by role). Keeping these separate makes it straightforward to add more roles later without touching routing logic.
- **Hiding vs. disabling edit controls:** For read-only users, Edit/Delete buttons are hidden entirely rather than shown in a disabled state. This was a judgment call for cleaner UX, both approaches satisfy the requirement, and the code can be adjusted to render disabled buttons instead if that's preferred.
- **MFA code is single-use, hardcoded, and visible in the UI** (`123456`) since there's no real backend or delivery mechanism (email/SMS) to generate or send a live code. This makes the flow fully testable without any real infrastructure.
- **Sign-up is intentionally minimal:** per the assignment ("full registration is not required"), the sign-up screen validates and navigates but doesn't add the user to `MOCK_USERS` or otherwise persist the new account.
- **React Context over a state management library:** given the app's small scope (a single `user` object shared across a few screens), Context was sufficient and avoided the overhead of introducing Redux/Zustand/etc.

## Known Limitations

- **No real persistence.** Refreshing the page clears the logged-in session (Context state is in-memory only) and any "created" accounts from Sign Up are not actually stored anywhere.
- **No real credential security.** Passwords are stored and compared as plain text in a source file. This is intentional for a mock demo but would never be acceptable in production (no hashing, no salting, no encryption at rest or in transit).
- **No real MFA delivery.** The OTP code is hardcoded and displayed directly in the UI rather than sent via email/SMS/authenticator app.
- **Sign-up doesn't create usable accounts.** Since new users aren't added to `MOCK_USERS`, you can't actually log in with an account created through the Sign Up screen, only the two seeded mock accounts work.
- **Only two roles/two mock accounts exist.** The role system is easily extensible, but only `read-only` and `read-write` are currently modeled.
- **No route persistence across refresh.** Because auth state isn't persisted (e.g., to `localStorage`), refreshing the browser while on `/dashboard` will redirect back to `/`, even though you were previously authenticated.

