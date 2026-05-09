import { useParams, useNavigate } from "react-router";
import { Star, MapPin, Clock, ArrowLeft, Calendar, Check, Users } from "lucide-react";
import { packages } from "../data/mockData";
import { useState } from "react";
import { toast } from "sonner";

export function PackageDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }} className="mb-4">Paquete no encontrado</h1>
        <button
          onClick={() => navigate("/packages")}
          className="flex items-center gap-2 mx-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a Paquetes
        </button>
      </div>
    );
  }

  const handleReservation = () => {
    if (!selectedDate) {
      toast.error("Selecciona una fecha de inicio");
      return;
    }
    toast.success(`Paquete "${pkg.name}" reservado exitosamente`);
    navigate("/reservations");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>{pkg.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span style={{ fontWeight: 600 }}>{pkg.rating}</span>
              <span className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>(89 reseñas)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span style={{ fontSize: "0.85rem" }}>{pkg.destination}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span style={{ fontSize: "0.85rem" }}>{pkg.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-12 h-12 text-blue-600" />
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>Paquete {pkg.name}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">Descripción del Paquete</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Disfruta de una experiencia inolvidable en {pkg.destination} con nuestro paquete {pkg.name}.
                Este tour está diseñado para viajeros económicos que buscan aprovechar al máximo su presupuesto sin sacrificar calidad.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Durante {pkg.duration}, explorarás los mejores lugares de {pkg.destination} con todas las comodidades incluidas.
                Un viaje perfecto para conocer la cultura local, disfrutar de la gastronomía y crear recuerdos inolvidables.
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">¿Qué Incluye?</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pkg.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span style={{ fontSize: "0.9rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">Itinerario</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0" style={{ fontWeight: 700 }}>
                    1
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600 }} className="mb-1">Día 1 - Llegada</h3>
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>Recepción en el aeropuerto, traslado al alojamiento y bienvenida con refrigerio local.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center shrink-0" style={{ fontWeight: 700 }}>
                    2
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600 }} className="mb-1">Día 2 - Tour Principal</h3>
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>Visita guiada a los principales atractivos turísticos con almuerzo incluido.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center shrink-0" style={{ fontWeight: 700 }}>
                    3
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600 }} className="mb-1">Día 3 - Regreso</h3>
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>Desayuno, tiempo libre para compras y traslado al aeropuerto.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reservation Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border p-6 shadow-lg sticky top-4">
              <div className="flex items-baseline gap-2 mb-6">
                <span style={{ fontSize: "2rem", fontWeight: 700 }} className="text-emerald-700">${pkg.price}</span>
                <span className="text-muted-foreground">/ persona</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">Fecha de Inicio</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background"
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">Número de Viajeros</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "viajero" : "viajeros"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }} className="text-blue-700">Duración</span>
                  </div>
                  <p style={{ fontSize: "0.85rem" }} className="text-blue-600">{pkg.duration}</p>
                </div>
              </div>

              <button
                onClick={handleReservation}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors shadow-lg shadow-emerald-600/30"
                style={{ fontWeight: 600 }}
              >
                <Calendar className="w-5 h-5" />
                Reservar Paquete
              </button>

              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                  <span>Precio base ({travelers} {travelers === 1 ? "persona" : "personas"})</span>
                  <span>${pkg.price * travelers}</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: "0.85rem" }}>
                  <span className="text-muted-foreground">Tarifa de servicio</span>
                  <span className="text-muted-foreground">$10</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border" style={{ fontWeight: 700 }}>
                  <span>Total</span>
                  <span className="text-emerald-700">${pkg.price * travelers + 10}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
