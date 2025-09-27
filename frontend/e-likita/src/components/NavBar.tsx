import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/e-Likita.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }: {isActive: boolean}) =>
    `px-3 py-2 rounded-md transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600 flex flex-col gap-1 md:flex-row justify-center items-center">
        <div>
          <img src={logo} alt="Company Logo" className="w-[50px] h-auto" />
        </div>
        <div>e-Likita</div>
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4">
        <NavLink to="/" className={linkClasses}>Home</NavLink>
        <NavLink to="/login" className={linkClasses}>Login</NavLink>
        <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg flex flex-col gap-2 p-4 md:hidden">
          <NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/login" className={linkClasses} onClick={() => setIsOpen(false)}>Login</NavLink>
          <NavLink to="/contact" className={linkClasses} onClick={() => setIsOpen(false)}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}
