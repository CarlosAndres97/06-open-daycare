import { BrandPanel } from "@/components/auth/BrandPanel";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col lg:grid lg:grid-cols-[1.05fr_1fr]">
      <BrandPanel className="hidden lg:flex" />
      <BrandPanel compact className="flex lg:hidden" />
      <main className="flex-1 flex items-center justify-center p-10">
        <LoginForm />
      </main>
    </div>
  );
}
