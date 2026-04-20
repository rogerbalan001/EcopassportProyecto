import { useState } from "react";
import { CalendarCheck, CreditCard, CheckCircle, PartyPopper, XCircle, ChevronRight, ArrowRight } from "lucide-react";
import { reservations as initialReservations, type ReservationStatus } from "../data/mockData";
import { toast } from "sonner";

const statusConfig: Record<ReservationStatus, { color: string; bg: string; icon: React.ElementType }> = {
  Solicitado: { color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: CalendarCheck },
  Aceptado: { color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: CheckCircle },
  Pagado: { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: CreditCard },
  Disfrutado: { color: "text-purple-700", bg: "bg-purple-50 border-purple-200", icon: PartyPopper },
  Cancelado: { color: "text-red-700", bg: "bg-red-50 border-red-200", icon: XCircle },
};

const statusFlow: ReservationStatus[] = ["Solicitado", "Aceptado", "Pagado", "Disfrutado"];

export function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">("all");

  const filtered = filterStatus === "all" ? reservations : reservations.filter((r) => r.status === filterStatus);

  const advanceStatus = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const idx = statusFlow.indexOf(r.status);
        if (idx < 0 || idx >= statusFlow.length - 1) return r;
        const next = statusFlow[idx + 1];
        toast.success(`Reserva ${r.id} actualizada a: ${next}`);
        return { ...r, status: next, ...(next === "Pagado" ? { paymentMethod: "PayPal" } : {}) };
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Gestión de Reservas</h1>
      <p className="text-muted-foreground mb-6">Flujo de transacciones: Solicitado → Aceptado → Pagado → Disfrutado</p>

      {/* Status flow diagram */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-white p-4 rounded-xl border border-border">
        {statusFlow.map((s, i) => {
          const cfg = statusConfig[s];
          return (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${cfg.bg}`}>
                <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                <span className={cfg.color} style={{ fontSize: "0.8rem", fontWeight: 600 }}>{s}</span>
              </div>
              {i < statusFlow.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", ...statusFlow, "Cancelado"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full border transition-colors ${
              filterStatus === s ? "bg-emerald-600 text-white border-emerald-600" : "border-border hover:bg-muted"
            }`}
            style={{ fontSize: "0.8rem" }}
          >
            {s === "all" ? "Todas" : s}
          </button>
        ))}
      </div>

      {/* Reservations list */}
      <div className="space-y-4">
        {filtered.map((res) => {
          const cfg = statusConfig[res.status];
          const canAdvance = statusFlow.indexOf(res.status) >= 0 && statusFlow.indexOf(res.status) < statusFlow.length - 1;
          return (
            <div key={res.id} className="bg-white rounded-xl border border-border p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{res.accommodationName}</h3>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${cfg.bg}`}>
                      <cfg.icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                      <span className={cfg.color} style={{ fontSize: "0.75rem", fontWeight: 600 }}>{res.status}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    <div><span style={{ fontWeight: 600 }}>Huésped:</span> {res.guestName}</div>
                    <div><span style={{ fontWeight: 600 }}>Check-in:</span> {res.checkIn}</div>
                    <div><span style={{ fontWeight: 600 }}>Check-out:</span> {res.checkOut}</div>
                    <div><span style={{ fontWeight: 600 }}>Huéspedes:</span> {res.guests}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-emerald-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>${res.totalPrice}</p>
                    {res.paymentMethod && (
                      <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Vía {res.paymentMethod}</p>
                    )}
                  </div>
                  {canAdvance && (
                    <button
                      onClick={() => advanceStatus(res.id)}
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Avanzar <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              {/* Payment section for Aceptado status */}
              {res.status === "Aceptado" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p style={{ fontSize: "0.85rem", fontWeight: 600 }} className="text-amber-800 mb-2">Pasarela de Pago</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => advanceStatus(res.id)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        style={{ fontSize: "0.8rem" }}
                      >
                        <CreditCard className="w-4 h-4" /> Pagar con PayPal
                      </button>
                      <button
                        onClick={() => advanceStatus(res.id)}
                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
                        style={{ fontSize: "0.8rem" }}
                      >
                        <CreditCard className="w-4 h-4" /> Pagar con Tarjeta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <CalendarCheck className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p>No hay reservas con ese estado</p>
        </div>
      )}
    </div>
  );
}
