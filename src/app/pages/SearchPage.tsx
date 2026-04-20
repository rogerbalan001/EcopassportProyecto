import { useState, useMemo } from "react";
import { Search, MapPin, Star, Users, Bus, SlidersHorizontal, X } from "lucide-react";
import { accommodations, accommodationTypes, transportTypes, type AccommodationType, type TransportType } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [maxBudget, setMaxBudget] = useState(50);
  const [selectedTypes, setSelectedTypes] = useState<AccommodationType[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<TransportType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [bookingModal, setBookingModal] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return accommodations.filter((a) => {
      if (query && !a.name.toLowerCase().includes(query.toLowerCase()) && !a.location.toLowerCase().includes(query.toLowerCase())) return false;
      if (a.pricePerNight > maxBudget) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(a.type)) return false;
      if (selectedTransport.length > 0 && !selectedTransport.some((t) => a.transport.includes(t))) return false;
      return true;
    });
  }, [query, maxBudget, selectedTypes, selectedTransport]);

  const toggleType = (t: AccommodationType) => setSelectedTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  const toggleTransport = (t: TransportType) => setSelectedTransport((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const handleBook = (accName: string) => {
    toast.success(`Reserva solicitada para "${accName}". Estado: Solicitado`);
    setBookingModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Búsqueda de Opciones Económicas</h1>
      <p className="text-muted-foreground mb-6">Encuentra el alojamiento perfecto para tu presupuesto</p>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${showFilters ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-border hover:bg-muted"}`}
        >
          <SlidersHorizontal className="w-5 h-5" /> Filtros
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border border-border rounded-xl p-6 mb-6 shadow-sm">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Budget */}
            <div>
              <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Presupuesto Máximo: ${maxBudget}/noche</label>
              <input
                type="range"
                min={5}
                max={100}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                <span>$5</span><span>$100</span>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Tipo de Alojamiento</label>
              <div className="flex flex-wrap gap-2">
                {accommodationTypes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => toggleType(t.value)}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                      selectedTypes.includes(t.value) ? "bg-emerald-600 text-white border-emerald-600" : "border-border hover:bg-muted"
                    }`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div>
              <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Transporte Público</label>
              <div className="flex flex-wrap gap-2">
                {transportTypes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => toggleTransport(t.value)}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                      selectedTransport.includes(t.value) ? "bg-emerald-600 text-white border-emerald-600" : "border-border hover:bg-muted"
                    }`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-muted-foreground mb-4" style={{ fontSize: "0.875rem" }}>{filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((acc) => (
          <div key={acc.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row">
            <ImageWithFallback src={acc.image} alt={acc.name} className="w-full sm:w-48 h-48 sm:h-auto object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{acc.name}</h3>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full shrink-0" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  {acc.type}
                </span>
              </div>
              <p className="text-muted-foreground flex items-center gap-1 mb-2" style={{ fontSize: "0.8rem" }}>
                <MapPin className="w-3 h-3" /> {acc.location}, {acc.region}
              </p>
              <p className="text-muted-foreground mb-3 line-clamp-2" style={{ fontSize: "0.8rem" }}>{acc.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {acc.transport.map((t) => (
                  <span key={t} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem" }}>
                    <Bus className="w-3 h-3" /> {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>${acc.pricePerNight}<span style={{ fontSize: "0.75rem", fontWeight: 400 }} className="text-muted-foreground">/noche</span></span>
                  <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                    <Users className="w-3 h-3" /> {acc.capacity}
                  </span>
                  <span className="flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {acc.rating}
                  </span>
                </div>
                <button
                  onClick={() => setBookingModal(acc.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg transition-colors"
                  style={{ fontSize: "0.8rem" }}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p style={{ fontSize: "1.1rem" }}>No se encontraron resultados</p>
          <p style={{ fontSize: "0.85rem" }}>Intenta ajustar tus filtros</p>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal && (() => {
        const acc = accommodations.find((a) => a.id === bookingModal);
        if (!acc) return null;
        return (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setBookingModal(null)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Reservar {acc.name}</h2>
                <button onClick={() => setBookingModal(null)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 mb-6">
                <div>
                  <label style={{ fontSize: "0.8rem" }} className="block mb-1">Check-in</label>
                  <input type="date" className="w-full p-2 border border-border rounded-lg bg-input-background" />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem" }} className="block mb-1">Check-out</label>
                  <input type="date" className="w-full p-2 border border-border rounded-lg bg-input-background" />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem" }} className="block mb-1">Huéspedes</label>
                  <input type="number" min={1} max={acc.capacity} defaultValue={1} className="w-full p-2 border border-border rounded-lg bg-input-background" />
                </div>
              </div>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "0.8rem" }}>Precio: ${acc.pricePerNight}/noche · Capacidad máx: {acc.capacity}</p>
              <button
                onClick={() => handleBook(acc.name)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors"
              >
                Solicitar Reserva
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
