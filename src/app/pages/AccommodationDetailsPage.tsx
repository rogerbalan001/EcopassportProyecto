import { useParams, useNavigate } from "react-router";
import { Star, MapPin, DollarSign, Users, Wifi, Car, Coffee, ArrowLeft, Calendar, Phone, Mail, Check } from "lucide-react";
import { accommodations } from "../data/mockData";
import { useState } from "react";
import { toast } from "sonner";

export function AccommodationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({ checkIn: "", checkOut: "" });
  const [guests, setGuests] = useState(1);

  const accommodation = accommodations.find((a) => a.id === id);

  if (!accommodation) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }} className="mb-4">Alojamiento no encontrado</h1>
        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-2 mx-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a Búsqueda
        </button>
      </div>
    );
  }

  const amenities = [
    { icon: Wifi, label: "Wi-Fi Gratis" },
    { icon: Car, label: "Estacionamiento" },
    { icon: Coffee, label: "Desayuno Incluido" },
    { icon: Users, label: `Capacidad: ${accommodation.capacity} personas` },
  ];

  const handleReservation = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      toast.error("Selecciona las fechas de entrada y salida");
      return;
    }
    toast.success("Reserva solicitada exitosamente");
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
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>{accommodation.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span style={{ fontWeight: 600 }}>4.8</span>
              <span className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>(124 reseñas)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span style={{ fontSize: "0.85rem" }}>{accommodation.location}</span>
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
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-12 h-12 text-emerald-600" />
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>Imagen de {accommodation.name}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {accommodation.name} es un alojamiento económico ubicado en {accommodation.location}.
                Perfecto para viajeros que buscan comodidad sin sacrificar su presupuesto.
                Ofrecemos habitaciones limpias y confortables con todas las amenidades básicas necesarias para una estadía placentera.
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">Servicios Incluidos</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <amenity.icon className="w-5 h-5 text-emerald-600" />
                    <span style={{ fontSize: "0.9rem" }}>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Type & Transport */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">Información Adicional</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <p style={{ fontSize: "0.8rem" }} className="text-muted-foreground mb-1">Tipo de Alojamiento</p>
                  <p style={{ fontWeight: 600 }}>{accommodation.type}</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p style={{ fontSize: "0.8rem" }} className="text-muted-foreground mb-1">Transporte Público</p>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <p style={{ fontWeight: 600 }}>{accommodation.publicTransport ? "Disponible" : "No disponible"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">Contacto</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span>+58 412-XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span>contacto@{accommodation.name.toLowerCase().replace(/\s/g, "")}.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reservation Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border p-6 shadow-lg sticky top-4">
              <div className="flex items-baseline gap-2 mb-6">
                <DollarSign className="w-6 h-6 text-emerald-600" />
                <span style={{ fontSize: "2rem", fontWeight: 700 }} className="text-emerald-700">{accommodation.pricePerNight}</span>
                <span className="text-muted-foreground">/ noche</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">Fecha de Entrada</label>
                  <input
                    type="date"
                    value={selectedDates.checkIn}
                    onChange={(e) => setSelectedDates((p) => ({ ...p, checkIn: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background"
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">Fecha de Salida</label>
                  <input
                    type="date"
                    value={selectedDates.checkOut}
                    onChange={(e) => setSelectedDates((p) => ({ ...p, checkOut: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background"
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">Número de Huéspedes</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background"
                  >
                    {[...Array(accommodation.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? "huésped" : "huéspedes"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleReservation}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors shadow-lg shadow-emerald-600/30"
                style={{ fontWeight: 600 }}
              >
                <Calendar className="w-5 h-5" />
                Solicitar Reserva
              </button>

              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                  <span>Precio por noche</span>
                  <span>${accommodation.pricePerNight}</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: "0.85rem" }}>
                  <span className="text-muted-foreground">Tarifa de servicio</span>
                  <span className="text-muted-foreground">$5</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border" style={{ fontWeight: 700 }}>
                  <span>Total estimado</span>
                  <span className="text-emerald-700">${accommodation.pricePerNight + 5}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
