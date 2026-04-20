import { Star, MapPin, Clock } from "lucide-react";
import { packages } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

export function PackagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Paquetes Turísticos</h1>
      <p className="text-muted-foreground mb-8">Experiencias completas a precios accesibles</p>

      <div className="grid md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <ImageWithFallback src={pkg.image} alt={pkg.name} className="w-full h-52 object-cover" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{pkg.rating}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }} className="mb-1">{pkg.name}</h3>
              <div className="flex items-center gap-4 text-muted-foreground mb-3" style={{ fontSize: "0.85rem" }}>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {pkg.destination}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {pkg.duration}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pkg.includes.map((item) => (
                  <span key={item} className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full" style={{ fontSize: "0.75rem" }}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-emerald-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>${pkg.price}</span>
                  <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}> / por persona</span>
                </div>
                <button
                  onClick={() => toast.success(`Paquete "${pkg.name}" agregado. Estado: Solicitado`)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition-colors"
                  style={{ fontSize: "0.875rem" }}
                >
                  Reservar Paquete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
