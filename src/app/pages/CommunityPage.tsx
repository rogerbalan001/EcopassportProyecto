import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Send, Search, Filter, SlidersHorizontal } from "lucide-react";
import { reviews as initialReviews, accommodations } from "../data/mockData";
import { toast } from "sonner";

export function CommunityPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedAcc, setSelectedAcc] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [priceFilter, setPriceFilter] = useState<"all" | "verified" | "not-verified">("all");
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "rating-high" | "rating-low">("recent");
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [newReview, setNewReview] = useState({ accommodationId: "", rating: 5, comment: "", priceAccuracy: true, userName: "" });
  const [showForm, setShowForm] = useState(false);

  let filtered = reviews;

  // Filter by accommodation
  if (selectedAcc !== "all") {
    filtered = filtered.filter((r) => r.accommodationId === selectedAcc);
  }

  // Filter by rating
  if (minRating > 0) {
    filtered = filtered.filter((r) => r.rating >= minRating);
  }

  // Filter by price accuracy
  if (priceFilter === "verified") {
    filtered = filtered.filter((r) => r.priceAccuracy);
  } else if (priceFilter === "not-verified") {
    filtered = filtered.filter((r) => !r.priceAccuracy);
  }

  // Filter by search text
  if (searchText.trim()) {
    filtered = filtered.filter((r) =>
      r.comment.toLowerCase().includes(searchText.toLowerCase()) ||
      r.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "rating-high") return b.rating - a.rating;
    if (sortBy === "rating-low") return a.rating - b.rating;
    return 0;
  });

  const priceAccuracyRate = filtered.length > 0
    ? Math.round((filtered.filter((r) => r.priceAccuracy).length / filtered.length) * 100)
    : 0;

  const handleSubmit = () => {
    if (!newReview.userName || !newReview.comment || !newReview.accommodationId) {
      toast.error("Completa todos los campos");
      return;
    }
    const review = {
      id: `rev-${Date.now()}`,
      accommodationId: newReview.accommodationId,
      userName: newReview.userName,
      avatar: newReview.userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
      rating: newReview.rating,
      comment: newReview.comment,
      priceAccuracy: newReview.priceAccuracy,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [review, ...prev]);
    setNewReview({ accommodationId: "", rating: 5, comment: "", priceAccuracy: true, userName: "" });
    setShowForm(false);
    toast.success("Reseña publicada exitosamente");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>Comunidad y Feedback</h1>
          <p className="text-muted-foreground">Los viajeros validan si los costos reportados coinciden con la realidad</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> Escribir Reseña
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-border text-center">
          <p style={{ fontSize: "1.75rem", fontWeight: 700 }} className="text-emerald-700">{reviews.length}</p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>Total Reseñas</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border text-center">
          <p style={{ fontSize: "1.75rem", fontWeight: 700 }} className="text-amber-600">
            {(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>Rating Promedio</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border text-center">
          <p style={{ fontSize: "1.75rem", fontWeight: 700 }} className="text-blue-600">{priceAccuracyRate}%</p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>Precisión de Precios</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border text-center">
          <p style={{ fontSize: "1.75rem", fontWeight: 700 }} className="text-purple-600">{accommodations.length}</p>
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>Alojamientos Evaluados</p>
        </div>
      </div>

      {/* New review form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-8 shadow-sm">
          <h2 className="mb-4" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Nueva Reseña</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Tu nombre</label>
              <input
                value={newReview.userName}
                onChange={(e) => setNewReview((p) => ({ ...p, userName: e.target.value }))}
                className="w-full p-2.5 border border-border rounded-lg bg-input-background"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem" }} className="block mb-1">Alojamiento</label>
              <select
                value={newReview.accommodationId}
                onChange={(e) => setNewReview((p) => ({ ...p, accommodationId: e.target.value }))}
                className="w-full p-2.5 border border-border rounded-lg bg-input-background"
              >
                <option value="">Seleccionar...</option>
                {accommodations.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label style={{ fontSize: "0.8rem" }} className="block mb-1">Calificación</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setNewReview((p) => ({ ...p, rating: n }))}>
                  <Star className={`w-6 h-6 ${n <= newReview.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label style={{ fontSize: "0.8rem" }} className="block mb-1">Comentario</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview((p) => ({ ...p, comment: e.target.value }))}
              rows={3}
              className="w-full p-2.5 border border-border rounded-lg bg-input-background"
              placeholder="Comparte tu experiencia..."
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>¿Los precios publicados coinciden con la realidad?</label>
            <button
              onClick={() => setNewReview((p) => ({ ...p, priceAccuracy: true }))}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border ${newReview.priceAccuracy ? "bg-emerald-100 border-emerald-300 text-emerald-700" : "border-border"}`}
              style={{ fontSize: "0.8rem" }}
            >
              <ThumbsUp className="w-4 h-4" /> Sí
            </button>
            <button
              onClick={() => setNewReview((p) => ({ ...p, priceAccuracy: false }))}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border ${!newReview.priceAccuracy ? "bg-red-100 border-red-300 text-red-700" : "border-border"}`}
              style={{ fontSize: "0.8rem" }}
            >
              <ThumbsDown className="w-4 h-4" /> No
            </button>
          </div>
          <button onClick={handleSubmit} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl transition-colors">
            <Send className="w-4 h-4" /> Publicar Reseña
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-border p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-border rounded-lg bg-input-background"
              placeholder="Buscar en reseñas..."
            />
          </div>

          {/* Toggle advanced filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${showFilters ? "bg-emerald-100 border-emerald-300 text-emerald-700" : "border-border hover:bg-muted"}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros Avanzados
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t border-border">
            {/* Accommodation Filter */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Alojamiento
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAcc("all")}
                  className={`px-3 py-1.5 rounded-full border transition-colors ${selectedAcc === "all" ? "bg-emerald-600 text-white border-emerald-600" : "border-border hover:bg-muted"}`}
                  style={{ fontSize: "0.8rem" }}
                >
                  Todos
                </button>
                {accommodations.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAcc(a.id)}
                    className={`px-3 py-1.5 rounded-full border transition-colors ${selectedAcc === a.id ? "bg-emerald-600 text-white border-emerald-600" : "border-border hover:bg-muted"}`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">
                <Star className="w-4 h-4 inline mr-1" />
                Calificación Mínima
              </label>
              <div className="flex flex-wrap gap-2">
                {[0, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors ${minRating === rating ? "bg-amber-100 border-amber-300 text-amber-700" : "border-border hover:bg-muted"}`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {rating === 0 ? "Todas" : `${rating}+`}
                    {rating > 0 && <Star className="w-3.5 h-3.5 fill-current" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Accuracy Filter */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">
                <ThumbsUp className="w-4 h-4 inline mr-1" />
                Verificación de Precio
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPriceFilter("all")}
                  className={`px-3 py-1.5 rounded-full border transition-colors ${priceFilter === "all" ? "bg-blue-100 border-blue-300 text-blue-700" : "border-border hover:bg-muted"}`}
                  style={{ fontSize: "0.8rem" }}
                >
                  Todas
                </button>
                <button
                  onClick={() => setPriceFilter("verified")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors ${priceFilter === "verified" ? "bg-emerald-100 border-emerald-300 text-emerald-700" : "border-border hover:bg-muted"}`}
                  style={{ fontSize: "0.8rem" }}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Verificadas
                </button>
                <button
                  onClick={() => setPriceFilter("not-verified")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors ${priceFilter === "not-verified" ? "bg-red-100 border-red-300 text-red-700" : "border-border hover:bg-muted"}`}
                  style={{ fontSize: "0.8rem" }}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  No Verificadas
                </button>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600 }} className="block mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-border rounded-lg bg-input-background"
                style={{ fontSize: "0.8rem" }}
              >
                <option value="recent">Más Recientes</option>
                <option value="oldest">Más Antiguas</option>
                <option value="rating-high">Mayor Calificación</option>
                <option value="rating-low">Menor Calificación</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedAcc("all");
                setMinRating(0);
                setPriceFilter("all");
                setSortBy("recent");
                setSearchText("");
                toast.success("Filtros restablecidos");
              }}
              className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              style={{ fontSize: "0.8rem" }}
            >
              Limpiar Filtros
            </button>
          </div>
        )}

        {/* Active filters count */}
        {!showFilters && (selectedAcc !== "all" || minRating > 0 || priceFilter !== "all" || searchText.trim()) && (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg" style={{ fontSize: "0.8rem" }}>
            <Filter className="w-4 h-4" />
            {[
              selectedAcc !== "all" && "Alojamiento",
              minRating > 0 && `Rating ${minRating}+`,
              priceFilter === "verified" && "Verificadas",
              priceFilter === "not-verified" && "No Verificadas",
              searchText.trim() && "Búsqueda"
            ].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>

      {/* Reviews Count */}
      <div className="mb-4">
        <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
          Mostrando <span style={{ fontWeight: 600 }} className="text-foreground">{filtered.length}</span> de {reviews.length} reseñas
        </p>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No se encontraron reseñas con los filtros seleccionados</p>
          </div>
        ) : (
          filtered.map((review) => {
            const acc = accommodations.find((a) => a.id === review.accommodationId);
            return (
              <div key={review.id} className="bg-white rounded-xl border border-border p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <span style={{ fontWeight: 600 }}>{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className={`w-3.5 h-3.5 ${n <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{review.date}</span>
                    </div>
                    {acc && <p className="text-muted-foreground mb-2" style={{ fontSize: "0.8rem" }}>{acc.name} · {acc.location}</p>}
                    <p style={{ fontSize: "0.9rem" }} className="mb-2">{review.comment}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${review.priceAccuracy ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`} style={{ fontSize: "0.75rem" }}>
                      {review.priceAccuracy ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                      {review.priceAccuracy ? "Precio verificado" : "Precio no coincide"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
