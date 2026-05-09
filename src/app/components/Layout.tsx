import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import {
  Search, Home, CalendarCheck, LayoutDashboard, Users, Package,
  Menu, X, Mountain, MapPin, Settings, LogIn, User, LogOut, ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada exitosamente");
    navigate("/");
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    setShowUserMenu(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-emerald-700">
            <Mountain className="w-7 h-7" />
            <span className="text-emerald-800 hidden sm:inline" style={{ fontSize: "1.25rem", fontWeight: 700 }}>EcoSpot</span>
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

            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors"
                  style={{ fontSize: "0.875rem" }}
                >
                  <div className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600 }} className="text-foreground">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p style={{ fontSize: "0.8rem", fontWeight: 600 }}>{user.name}</p>
                      <p style={{ fontSize: "0.75rem" }} className="text-muted-foreground">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full" style={{ fontSize: "0.7rem" }}>
                        {user.userType === "traveler" ? "Viajero" : user.userType === "operator" ? "Operador" : "Admin"}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </NavLink>
            )}
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

            {isAuthenticated && user ? (
              <div className="pt-2 border-t border-border space-y-1">
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>{user.name}</p>
                      <p style={{ fontSize: "0.75rem" }} className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors bg-red-600 text-white hover:bg-red-700"
                  style={{ fontWeight: 600 }}
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors bg-emerald-600 text-white hover:bg-emerald-700"
                style={{ fontWeight: 600 }}
              >
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </NavLink>
            )}
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
          <p>&copy; 2026 EcoSpot - Gestión de Turismo Económico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
