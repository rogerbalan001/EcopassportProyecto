// ===== TIPOS =====
export type AccommodationType = "posada" | "camping" | "hostel" | "cabaña" | "eco-lodge";
export type TransportType = "bus" | "tren" | "lancha" | "colectivo" | "ninguno";
export type ReservationStatus = "Solicitado" | "Aceptado" | "Pagado" | "Disfrutado" | "Cancelado";

export interface Accommodation {
  id: string;
  name: string;
  type: AccommodationType;
  location: string;
  region: string;
  pricePerNight: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  transport: TransportType[];
  amenities: string[];
  operatorId: string;
  available: boolean;
}

export interface TouristPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  includes: string[];
  image: string;
  rating: number;
}

export interface Reservation {
  id: string;
  accommodationId: string;
  accommodationName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: ReservationStatus;
  paymentMethod?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  accommodationId: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  priceAccuracy: boolean;
  date: string;
}

export interface Operator {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: number;
  verified: boolean;
}

// ===== IMAGES =====
const IMAGES = {
  beach: "https://images.unsplash.com/photo-1611946022552-d2ca5ffba186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwYnVkZ2V0JTIwdHJhdmVsfGVufDF8fHx8MTc3NjcxMTIxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mountain: "https://images.unsplash.com/photo-1695664488281-d7166250482d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbXBpbmclMjBob3N0ZWx8ZW58MXx8fHwxNzc2NzExMjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  colonial: "https://images.unsplash.com/photo-1762995350095-4d8479227c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbmlhbCUyMHRvd24lMjB0b3VyaXNtJTIwc291dGglMjBhbWVyaWNhfGVufDF8fHx8MTc3NjcxMTIxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hostel: "https://images.unsplash.com/photo-1768289269971-6171457bed13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFja2VyJTIwaG9zdGVsJTIwcm9vbXxlbnwxfHx8fDE3NzY3MTEyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ecolodge: "https://images.unsplash.com/photo-1650201776749-fde3862e5354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluZm9yZXN0JTIwZWNvJTIwbG9kZ2V8ZW58MXx8fHwxNzc2NzExMjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  desert: "https://images.unsplash.com/photo-1725509408295-17d8def5b14e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjB0b3VyaXNtfGVufDF8fHx8MTc3NjcxMTIxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// ===== MOCK DATA =====
export const accommodations: Accommodation[] = [
  {
    id: "acc-1", name: "Posada Sol del Caribe", type: "posada", location: "Isla Margarita", region: "Caribe",
    pricePerNight: 25, capacity: 12, rating: 4.5, reviewCount: 89, image: IMAGES.beach,
    description: "Acogedora posada frente al mar con vista espectacular al atardecer. Ideal para viajeros con presupuesto ajustado.",
    transport: ["bus", "lancha"], amenities: ["WiFi", "Desayuno", "Piscina", "Estacionamiento"], operatorId: "op-1", available: true,
  },
  {
    id: "acc-2", name: "Camping Montaña Azul", type: "camping", location: "Mérida", region: "Andes",
    pricePerNight: 10, capacity: 30, rating: 4.2, reviewCount: 56, image: IMAGES.mountain,
    description: "Camping en la montaña con vistas panorámicas de los Andes. Incluye zona de fogata y baños compartidos.",
    transport: ["bus", "colectivo"], amenities: ["Baños", "Fogata", "Zona BBQ", "Seguridad 24h"], operatorId: "op-2", available: true,
  },
  {
    id: "acc-3", name: "Hostel Colonial Center", type: "hostel", location: "Cartagena", region: "Caribe",
    pricePerNight: 18, capacity: 40, rating: 4.7, reviewCount: 134, image: IMAGES.colonial,
    description: "Hostel en el corazón del centro histórico. Habitaciones compartidas y privadas disponibles.",
    transport: ["bus", "colectivo"], amenities: ["WiFi", "Cocina", "Terraza", "Lavandería"], operatorId: "op-3", available: true,
  },
  {
    id: "acc-4", name: "Posada La Ceiba", type: "posada", location: "Canaima", region: "Amazonas",
    pricePerNight: 35, capacity: 8, rating: 4.8, reviewCount: 42, image: IMAGES.ecolodge,
    description: "Posada rústica en plena selva amazónica. Excursiones al Salto Ángel incluidas.",
    transport: ["lancha"], amenities: ["Tours", "Comidas", "Guía local", "Hamacas"], operatorId: "op-1", available: true,
  },
  {
    id: "acc-5", name: "Cabaña Desierto Dorado", type: "cabaña", location: "Médanos de Coro", region: "Occidente",
    pricePerNight: 22, capacity: 6, rating: 4.1, reviewCount: 28, image: IMAGES.desert,
    description: "Cabañas con vista al desierto. Experiencia única bajo cielos estrellados.",
    transport: ["bus"], amenities: ["A/C", "WiFi", "Estacionamiento", "Piscina"], operatorId: "op-4", available: true,
  },
  {
    id: "acc-6", name: "Eco-Lodge Selva Verde", type: "eco-lodge", location: "Puerto Ayacucho", region: "Amazonas",
    pricePerNight: 40, capacity: 16, rating: 4.6, reviewCount: 67, image: IMAGES.ecolodge,
    description: "Lodge ecológico con energía solar y huertos orgánicos. Turismo sustentable.",
    transport: ["lancha", "bus"], amenities: ["Comidas orgánicas", "Tours", "WiFi", "Yoga"], operatorId: "op-5", available: true,
  },
];

export const packages: TouristPackage[] = [
  { id: "pkg-1", name: "Aventura Andina", destination: "Mérida", duration: "5 días / 4 noches", price: 120, includes: ["Alojamiento", "Transporte", "Guía", "Comidas"], image: IMAGES.mountain, rating: 4.6 },
  { id: "pkg-2", name: "Paraíso Caribeño", destination: "Isla Margarita", duration: "4 días / 3 noches", price: 150, includes: ["Alojamiento", "Ferry", "Tours", "Desayunos"], image: IMAGES.beach, rating: 4.8 },
  { id: "pkg-3", name: "Selva Mágica", destination: "Canaima", duration: "3 días / 2 noches", price: 200, includes: ["Alojamiento", "Vuelo", "Excursiones", "Comidas"], image: IMAGES.ecolodge, rating: 4.9 },
  { id: "pkg-4", name: "Ruta Colonial", destination: "Cartagena", duration: "3 días / 2 noches", price: 95, includes: ["Hostel", "Tours a pie", "Desayunos"], image: IMAGES.colonial, rating: 4.4 },
];

export const reservations: Reservation[] = [
  { id: "res-1", accommodationId: "acc-1", accommodationName: "Posada Sol del Caribe", guestName: "María González", guestEmail: "maria@email.com", checkIn: "2026-05-10", checkOut: "2026-05-14", guests: 2, totalPrice: 100, status: "Pagado", paymentMethod: "PayPal", createdAt: "2026-04-15" },
  { id: "res-2", accommodationId: "acc-2", accommodationName: "Camping Montaña Azul", guestName: "Carlos Pérez", guestEmail: "carlos@email.com", checkIn: "2026-05-20", checkOut: "2026-05-23", guests: 4, totalPrice: 120, status: "Aceptado", createdAt: "2026-04-18" },
  { id: "res-3", accommodationId: "acc-3", accommodationName: "Hostel Colonial Center", guestName: "Ana Rodríguez", guestEmail: "ana@email.com", checkIn: "2026-04-25", checkOut: "2026-04-28", guests: 1, totalPrice: 54, status: "Solicitado", createdAt: "2026-04-19" },
  { id: "res-4", accommodationId: "acc-4", accommodationName: "Posada La Ceiba", guestName: "Pedro Martínez", guestEmail: "pedro@email.com", checkIn: "2026-03-10", checkOut: "2026-03-13", guests: 2, totalPrice: 210, status: "Disfrutado", paymentMethod: "PayPal", createdAt: "2026-02-28" },
  { id: "res-5", accommodationId: "acc-5", accommodationName: "Cabaña Desierto Dorado", guestName: "Lucía Fernández", guestEmail: "lucia@email.com", checkIn: "2026-06-01", checkOut: "2026-06-04", guests: 3, totalPrice: 198, status: "Pagado", paymentMethod: "Tarjeta", createdAt: "2026-04-20" },
];

export const reviews: Review[] = [
  { id: "rev-1", accommodationId: "acc-1", userName: "Juan Torres", avatar: "JT", rating: 5, comment: "Excelente relación calidad-precio. Los $25/noche son reales y la vista es increíble.", priceAccuracy: true, date: "2026-03-15" },
  { id: "rev-2", accommodationId: "acc-1", userName: "Laura Méndez", avatar: "LM", rating: 4, comment: "Muy buena posada. Cobran un extra por la piscina que no está en la publicación.", priceAccuracy: false, date: "2026-03-20" },
  { id: "rev-3", accommodationId: "acc-2", userName: "Roberto Silva", avatar: "RS", rating: 4, comment: "Camping bien mantenido. Los precios son exactos. La fogata es genial.", priceAccuracy: true, date: "2026-02-10" },
  { id: "rev-4", accommodationId: "acc-3", userName: "Sofía Castro", avatar: "SC", rating: 5, comment: "El mejor hostel de la zona. Todo limpio y el precio es justo.", priceAccuracy: true, date: "2026-04-01" },
  { id: "rev-5", accommodationId: "acc-4", userName: "Diego Ramírez", avatar: "DR", rating: 5, comment: "Experiencia única. El Salto Ángel es impresionante. Precio justo por todo lo incluido.", priceAccuracy: true, date: "2026-03-25" },
  { id: "rev-6", accommodationId: "acc-3", userName: "Valentina López", avatar: "VL", rating: 4, comment: "Buena ubicación, personal amable. El desayuno debería estar incluido a ese precio.", priceAccuracy: true, date: "2026-04-05" },
];

export const operators: Operator[] = [
  { id: "op-1", name: "Turismo Sol S.A.", email: "info@turismosol.com", phone: "+58 412-5551234", services: 2, verified: true },
  { id: "op-2", name: "Aventuras Andinas", email: "contacto@aventurasandinas.com", phone: "+58 414-5559876", services: 1, verified: true },
  { id: "op-3", name: "Colonial Tours", email: "reservas@colonialtours.com", phone: "+57 315-5554321", services: 1, verified: true },
  { id: "op-4", name: "Desierto Extremo", email: "info@desiertoextremo.com", phone: "+58 416-5558765", services: 1, verified: false },
  { id: "op-5", name: "EcoVerde Lodge", email: "eco@verde.com", phone: "+58 426-5552345", services: 1, verified: true },
];

export const dashboardData = {
  searchesByDestination: [
    { destination: "Isla Margarita", searches: 1240, avgBudget: 30 },
    { destination: "Mérida", searches: 980, avgBudget: 20 },
    { destination: "Cartagena", searches: 870, avgBudget: 25 },
    { destination: "Canaima", searches: 650, avgBudget: 45 },
    { destination: "Médanos de Coro", searches: 420, avgBudget: 22 },
    { destination: "Puerto Ayacucho", searches: 310, avgBudget: 40 },
  ],
  reservationsByMonth: [
    { month: "Ene", reservations: 45, revenue: 3200 },
    { month: "Feb", reservations: 62, revenue: 4500 },
    { month: "Mar", reservations: 78, revenue: 5800 },
    { month: "Abr", reservations: 95, revenue: 7200 },
    { month: "May", reservations: 110, revenue: 8400 },
    { month: "Jun", reservations: 85, revenue: 6100 },
  ],
  priceRangeDistribution: [
    { range: "$0-15", count: 340 },
    { range: "$16-25", count: 520 },
    { range: "$26-35", count: 380 },
    { range: "$36-50", count: 210 },
    { range: "$50+", count: 90 },
  ],
  statusDistribution: [
    { status: "Solicitado", count: 35, color: "#f59e0b" },
    { status: "Aceptado", count: 28, color: "#3b82f6" },
    { status: "Pagado", count: 52, color: "#10b981" },
    { status: "Disfrutado", count: 120, color: "#8b5cf6" },
    { status: "Cancelado", count: 12, color: "#ef4444" },
  ],
};

export const accommodationTypes: { value: AccommodationType; label: string }[] = [
  { value: "posada", label: "Posada" },
  { value: "camping", label: "Camping" },
  { value: "hostel", label: "Hostel" },
  { value: "cabaña", label: "Cabaña" },
  { value: "eco-lodge", label: "Eco-Lodge" },
];

export const transportTypes: { value: TransportType; label: string }[] = [
  { value: "bus", label: "Bus" },
  { value: "tren", label: "Tren" },
  { value: "lancha", label: "Lancha" },
  { value: "colectivo", label: "Colectivo" },
];
