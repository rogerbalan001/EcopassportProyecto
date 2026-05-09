import { useState } from "react";
import { X, Lock, CheckCircle2, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  description: string;
};

type Step = "login" | "review" | "processing" | "success";

export function PayPalCheckoutModal({ open, onClose, onSuccess, amount, description }: Props) {
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const reset = () => {
    setStep("login");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Credenciales inválidas. Ingresa un email válido y contraseña de al menos 4 caracteres.");
      return;
    }
    setError("");
    setStep("review");
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onSuccess();
        reset();
      }, 1400);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* PayPal header bar */}
        <div className="bg-[#003087] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-0.5" style={{ fontSize: "1.4rem", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.5px" }}>
            <span className="text-white">Pay</span>
            <span className="text-[#009cde]">Pal</span>
          </div>
          <button onClick={handleClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === "login" && (
            <>
              <div className="text-center mb-5">
                <p className="text-gray-600 mb-1" style={{ fontSize: "0.85rem" }}>Pagar a EcoSpot</p>
                <p style={{ fontSize: "1.6rem", fontWeight: 700 }} className="text-gray-900">${amount.toFixed(2)} USD</p>
                <p className="text-gray-500 mt-1" style={{ fontSize: "0.75rem" }}>{description}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email o número de móvil"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[#0070ba] rounded-md outline-none"
                  style={{ fontSize: "0.9rem" }}
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[#0070ba] rounded-md outline-none"
                  style={{ fontSize: "0.9rem" }}
                  required
                />
                {error && <p className="text-red-600" style={{ fontSize: "0.75rem" }}>{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white py-3 rounded-full transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Iniciar sesión
                </button>
                <div className="text-center">
                  <a className="text-[#0070ba] hover:underline cursor-pointer" style={{ fontSize: "0.8rem" }}>
                    ¿Tienes problemas para iniciar sesión?
                  </a>
                </div>
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-gray-500" style={{ fontSize: "0.75rem" }}>o</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>
                <button
                  type="button"
                  className="w-full bg-white border-2 border-[#0070ba] text-[#0070ba] hover:bg-blue-50 py-3 rounded-full transition-colors"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Crear cuenta
                </button>
              </form>

              <div className="flex items-center justify-center gap-1.5 mt-5 text-gray-500">
                <Lock className="w-3 h-3" />
                <span style={{ fontSize: "0.7rem" }}>Transacciones seguras · Protección al comprador</span>
              </div>
            </>
          )}

          {step === "review" && (
            <>
              <p className="text-gray-600 mb-4" style={{ fontSize: "0.85rem" }}>Revisa tu pago</p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div>
                    <p className="text-gray-500" style={{ fontSize: "0.7rem" }}>PAGAR CON</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>Saldo PayPal</p>
                    <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>{email}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#0070ba] flex items-center justify-center text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                    PP
                  </div>
                </div>
                <div className="flex justify-between" style={{ fontSize: "0.85rem" }}>
                  <span className="text-gray-600">Subtotal</span>
                  <span>${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: "0.85rem" }}>
                  <span className="text-gray-600">Comisión</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  <span>Total</span>
                  <span>${amount.toFixed(2)} USD</span>
                </div>
              </div>

              <p className="text-gray-500 mb-4" style={{ fontSize: "0.7rem" }}>
                Al hacer clic en "Pagar ahora", aceptas las condiciones de uso de PayPal.
              </p>

              <button
                onClick={handlePay}
                className="w-full bg-[#ffc439] hover:bg-[#f5b820] text-[#003087] py-3 rounded-full transition-colors"
                style={{ fontSize: "0.95rem", fontWeight: 700, fontStyle: "italic" }}
              >
                Pagar ahora
              </button>
              <button
                onClick={() => setStep("login")}
                className="w-full mt-2 text-[#0070ba] hover:underline py-2"
                style={{ fontSize: "0.8rem" }}
              >
                Cancelar y volver
              </button>
            </>
          )}

          {step === "processing" && (
            <div className="py-12 text-center">
              <Loader2 className="w-14 h-14 mx-auto mb-4 text-[#0070ba] animate-spin" />
              <p style={{ fontSize: "1rem", fontWeight: 600 }} className="text-gray-800">Procesando pago...</p>
              <p className="text-gray-500 mt-1" style={{ fontSize: "0.8rem" }}>No cierres esta ventana</p>
            </div>
          )}

          {step === "success" && (
            <div className="py-10 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
              <p style={{ fontSize: "1.1rem", fontWeight: 700 }} className="text-gray-900">¡Pago completado!</p>
              <p className="text-gray-600 mt-1" style={{ fontSize: "0.85rem" }}>Se envió el recibo a {email}</p>
              <p className="text-gray-800 mt-4" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                ${amount.toFixed(2)} USD
              </p>
              <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>ID Transacción: PP-{Date.now().toString().slice(-10)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
