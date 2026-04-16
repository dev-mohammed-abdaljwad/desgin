import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "../ui/FloatingWhatsApp";
import { MobileNav } from "./MobileNav";
import { AdminAccessButton } from "./AdminAccessButton";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-[var(--font-body)]">
      <Navigation />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileNav />
      <AdminAccessButton />
    </div>
  );
}