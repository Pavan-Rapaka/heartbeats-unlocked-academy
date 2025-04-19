
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-primary py-4 text-primary-foreground text-center text-sm mt-auto">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} MyECGProject - An Interactive ECG Learning Platform
        </div>
      </footer>
    </div>
  );
};

export default Layout;
