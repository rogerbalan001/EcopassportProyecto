import { Outlet, NavLink, useLocation } from "react-router";
import { useState } from "react";
import {
  Search, Home, CalendarCheck, LayoutDashboard, Users, Package,
  Menu, X, Mountain, MapPin, Settings, LogIn, User
} from "lucide-react";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/search", label: "Buscar", icon: Search },
  { to: "/packages", label: "Paquetes", icon: Package },
  { to: "/reservations", label: "Reservas", icon: CalendarCheck },
  { to: "/community", label: "Comunidad", icon: Users },
  { to: "/operators", label: "Operadores", icon: MapPin },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin", label: "Administración", icon: Settings },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-emerald-700">
            <Mountain className="w-7 h-7" />
            <span className="text-emerald-800 hidden sm:inline" style={{ fontSize: "1.25rem", fontWeight: 700 }}>TurismoEco</span>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-3">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                  style={{ fontSize: "0.875rem" }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <NavLink
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              <LogIn className="w-4 h-4" />
              Iniciar Sesión
            </NavLink>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-white px-4 pb-4 pt-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive ? "bg-emerald-50 text-emerald-700" : "text-muted-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors bg-emerald-600 text-white hover:bg-emerald-700"
              style={{ fontWeight: 600 }}
            >
              <LogIn className="w-4 h-4" />
              Iniciar Sesión
            </NavLink>
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 text-emerald-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center" style={{ fontSize: "0.875rem" }}>
          <p>&copy; 2026 TurismoEco - Gestión de Turismo Económico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
