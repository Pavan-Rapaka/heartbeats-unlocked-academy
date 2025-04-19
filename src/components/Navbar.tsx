
import { Link } from "react-router-dom";
import { Heart, BookOpen, BookCheck, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-lg font-bold text-medical-red">
              <Heart className="h-6 w-6 mr-2 text-medical-red" />
              <span className="hidden sm:block">MyECGProject</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-1">
            <NavLink to="/tutorials" icon={<BookOpen className="h-4 w-4 mr-2" />} label="Tutorials" />
            <NavLink to="/quiz" icon={<BookCheck className="h-4 w-4 mr-2" />} label="Quiz" />
            <NavLink to="/dashboard" icon={<BarChart3 className="h-4 w-4 mr-2" />} label="Dashboard" />
            <NavLink to="/admin" icon={<Shield className="h-4 w-4 mr-2" />} label="Admin" />
          </div>
          <div className="md:hidden">
            <Button variant="outline" size="sm">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink = ({ to, icon, label }: NavLinkProps) => {
  return (
    <Button asChild variant="ghost" className="flex items-center" size="sm">
      <Link to={to}>
        {icon}
        {label}
      </Link>
    </Button>
  );
};

export default Navbar;
