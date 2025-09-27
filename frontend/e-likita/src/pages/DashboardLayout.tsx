import { NavLink, Outlet } from "react-router-dom"
import { Home, User, Menu } from "lucide-react"
import { useState } from "react"

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white shadow-lg">
        {/* Brand */}
        <div className="flex h-16 items-center justify-center border-b text-xl font-extrabold tracking-wide text-blue-600 shadow-sm">
          E-Health
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <NavLink
            to="/portal"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <Home className="h-5 w-5" />
            <span>Consultation</span>
          </NavLink>
          <NavLink
            to="/portal/profile"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Top Navbar with Hamburger */}
      <div className="md:hidden relative border-b bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-xl font-extrabold text-blue-600">E-Health</div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <nav className="absolute left-0 right-0 top-full z-50 flex flex-col rounded-b-md border bg-white shadow-lg">
            <NavLink
              to="/portal"
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              Consultation
            </NavLink>
            <NavLink
              to="/portal/profile"
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              Profile
            </NavLink>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-10">
        <Outlet/>
      </div>
    </div>
  )
}
