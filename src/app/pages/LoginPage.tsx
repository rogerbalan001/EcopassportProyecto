import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, User, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "traveler" as "traveler" | "operator" | "admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister) {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Completa todos los campos");
        return;
      }
      login({
        name: formData.name,
        email: formData.email,
        userType: formData.userType,
      });
      toast.success(`Cuenta creada exitosamente para ${formData.name}`);
    } else {
      if (!formData.email || !formData.password) {
        toast.error("Completa todos los campos");
        return;
      }
      login({
        name: formData.name || "Usuario Demo",
        email: formData.email,
        userType: "traveler",
      });
      toast.success("Inicio de sesión exitoso");
    }

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-2xl mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }} className="mb-2">
            {isRegister ? "Crear Cuenta" : "Bienvenido"}
          </h1>
          <p className="text-muted-foreground">
            {isRegister
              ? "Únete a nuestra comunidad de turismo económico"
              : "Accede a tu cuenta para continuar"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-border shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2 text-foreground">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2 text-foreground">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2 text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                  className="w-full pl-11 pr-12 py-3 border border-border rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2 text-foreground">
                  Tipo de Usuario
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData((p) => ({ ...p, userType: e.target.value }))}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="traveler">Viajero</option>
                  <option value="operator">Operador Turístico</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors shadow-lg shadow-emerald-600/30"
              style={{ fontWeight: 600 }}
            >
              {isRegister ? (
                <>
                  <UserPlus className="w-5 h-5" /> Crear Cuenta
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" /> Iniciar Sesión
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
              {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="ml-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                style={{ fontWeight: 600 }}
              >
                {isRegister ? "Iniciar Sesión" : "Crear Cuenta"}
              </button>
            </p>
          </div>

          {/* Demo credentials */}
          {!isRegister && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p style={{ fontSize: "0.75rem", fontWeight: 600 }} className="text-blue-700 mb-1">
                Credenciales de demostración:
              </p>
              <p style={{ fontSize: "0.7rem" }} className="text-blue-600">
                Email: demo@turismo.com<br />
                Password: demo123
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
          Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
        </p>
      </div>
    </div>
  );
}
