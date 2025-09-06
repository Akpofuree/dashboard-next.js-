// app/login/page.tsx
import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      <LoginForm />
    </main>
  );
}
