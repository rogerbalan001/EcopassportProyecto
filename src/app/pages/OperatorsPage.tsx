import { useState } from "react";
import { MapPin, Mail, Phone, CheckCircle, AlertCircle, Plus, X, Send } from "lucide-react";
import { operators as initialOperators, accommodations } from "../data/mockData";
import { toast } from "sonner";

export function OperatorsPage() {
  const [operators, setOperators] = useState(initialOperators);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", serviceName: "", serviceType: "posada", price: "", capacity: "", location: "", description: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.serviceName) {
      toast.error("Completa los campos obligatorios");
      return;
    }
    const newOp = {
      id: `op-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      services: 1,
      verified: false,
    };
    setOperators((prev) => [...prev, newOp]);
    setForm({ name: "", email: "", phone: "", serviceName: "", serviceType: "posada", price: "", capacity: "", location: "", description: "" });
    setShowForm(false);
    toast.success("Servicio registrado exitosamente. Pendiente de verificación.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>Gestión de Publicaciones</h1>
          <p className="text-muted-foreground">Operadores locales pueden registrar sus servicios</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" /> Registrar Servicio
        </button>
      </div>

      {/* Registration form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Nuevo Servicio Turístico</h2>
            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Nombre del Operador *</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="Empresa o persona" />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="contacto@email.com" />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Teléfono</label>
              <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="+58 412-XXXXXXX" />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Nombre del Servicio *</label>
              <input value={form.serviceName} onChange={(e) => setForm((p) => ({ ...p, serviceName: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="Ej: Posada Vista Mar" />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Tipo</label>
              <select value={form.serviceType} onChange={(e) => setForm((p) => ({ ...p, serviceType: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background">
                <option value="posada">Posada</option>
                <option value="camping">Camping</option>
                <option value="hostel">Hostel</option>
                <option value="cabaña">Cabaña</option>
                <option value="eco-lodge">Eco-Lodge</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Ubicación</label>
              <input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="Ciudad o destino" />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Precio por Noche ($)</label>
              <input type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="25" />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Capacidad (personas)</label>
              <input type="number" value={form.capacity} onChange={(e) => setForm((p) => ({ ...p, capacity: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="10" />
            </div>
          </div>
          <div className="mb-4">
            <label style={{ fontSize: "0.8rem" }} className="block mb-1">Descripción</label>
            <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} className="w-full p-2.5 border border-border rounded-lg bg-input-background" placeholder="Describe tu servicio..." />
          </div>
          <button onClick={handleSubmit} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl transition-colors">
            <Send className="w-4 h-4" /> Registrar
          </button>
        </div>
      )}

      {/* Operators list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {operators.map((op) => {
          const opAccommodations = accommodations.filter((a) => a.operatorId === op.id);
          return (
            <div key={op.id} className="bg-white rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{op.name}</h3>
                {op.verified ? (
                  <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                    <CheckCircle className="w-3 h-3" /> Verificado
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                    <AlertCircle className="w-3 h-3" /> Pendiente
                  </span>
                )}
              </div>
              <div className="space-y-1.5 text-muted-foreground mb-4" style={{ fontSize: "0.8rem" }}>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {op.email}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {op.phone}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {op.services} servicio(s) registrado(s)</p>
              </div>
              {opAccommodations.length > 0 && (
                <div className="border-t border-border pt-3">
                  <p style={{ fontSize: "0.75rem", fontWeight: 600 }} className="mb-2">Servicios:</p>
                  {opAccommodations.map((a) => (
                    <div key={a.id} className="flex justify-between items-center py-1" style={{ fontSize: "0.8rem" }}>
                      <span>{a.name}</span>
                      <span className="text-emerald-700" style={{ fontWeight: 600 }}>${a.pricePerNight}/n</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
