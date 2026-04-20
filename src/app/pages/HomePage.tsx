import { Link } from "react-router";
import { Search, MapPin, Shield, Star, ArrowRight, DollarSign, Users, TrendingUp } from "lucide-react";
import { accommodations, packages } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function HomePage() {
  const featured = accommodations.slice(0, 3);
  const topPackages = packages.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={accommodations[0].image}
            alt="hero"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-white mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            Viaja Más, Gasta Menos
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-8" style={{ fontSize: "1.125rem" }}>
            Encuentra alojamientos económicos, paquetes turísticos accesibles y transporte público disponible. Tu próxima aventura no tiene que ser costosa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5" /> Buscar Opciones Económicas
            </Link>
            <Link
              to="/operators"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl transition-colors"
            >
              <MapPin className="w-5 h-5" /> Registrar mi Servicio
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MapPin, label: "Destinos", value: "50+", color: "text-emerald-600" },
            { icon: DollarSign, label: "Desde", value: "$10/noche", color: "text-amber-600" },
            { icon: Users, label: "Viajeros", value: "12,000+", color: "text-blue-600" },
            { icon: TrendingUp, label: "Reseñas", value: "8,500+", color: "text-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-md border border-border text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-1 ${stat.color}`} />
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{stat.value}</p>
              <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Alojamientos Destacados</h2>
          <Link to="/search" className="text-emerald-600 hover:underline flex items-center gap-1" style={{ fontSize: "0.875rem" }}>
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((acc) => (
            <div key={acc.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
              <ImageWithFallback src={acc.image} alt={acc.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{acc.name}</h3>
                    <p className="text-muted-foreground flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                      <MapPin className="w-3 h-3" /> {acc.location}
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                    {acc.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{acc.rating}</span>
                  <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>({acc.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>
                    <span className="text-emerald-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>${acc.pricePerNight}</span>
                    <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>/noche</span>
                  </p>
                  <Link
                    to={`/search`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg transition-colors"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Paquetes Turísticos</h2>
            <Link to="/packages" className="text-emerald-600 hover:underline flex items-center gap-1" style={{ fontSize: "0.875rem" }}>
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {topPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
                <ImageWithFallback src={pkg.image} alt={pkg.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{pkg.name}</h3>
                  <p className="text-muted-foreground mb-2" style={{ fontSize: "0.8rem" }}>{pkg.destination} · {pkg.duration}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pkg.includes.map((item) => (
                      <span key={item} className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem" }}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>${pkg.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{pkg.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-center mb-12" style={{ fontSize: "1.5rem", fontWeight: 700 }}>¿Cómo Funciona?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Busca", desc: "Filtra por presupuesto, tipo y transporte disponible", icon: Search },
            { step: "2", title: "Reserva", desc: "Solicita tu reserva directamente al operador", icon: Shield },
            { step: "3", title: "Paga", desc: "Pago seguro vía PayPal o tarjeta", icon: DollarSign },
            { step: "4", title: "Disfruta", desc: "Vive la experiencia y deja tu reseña", icon: Star },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-7 h-7 text-emerald-700" />
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{s.title}</h3>
              <p className="text-muted-foreground mt-1" style={{ fontSize: "0.85rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
