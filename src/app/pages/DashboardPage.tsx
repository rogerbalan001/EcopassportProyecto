import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { TrendingUp, DollarSign, Users, MapPin } from "lucide-react";
import { dashboardData, reservations, accommodations } from "../data/mockData";

export function DashboardPage() {
  const totalRevenue = reservations.reduce((a, r) => a + r.totalPrice, 0);
  const totalGuests = reservations.reduce((a, r) => a + r.guests, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Dashboard de Tendencias</h1>
      <p className="text-muted-foreground mb-8">Panel administrativo con métricas y visualizaciones</p>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Ingresos Totales", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Reservas", value: reservations.length.toString(), icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Huéspedes", value: totalGuests.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Destinos", value: accommodations.length.toString(), icon: MapPin, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-5 border border-border shadow-sm">
            <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center mb-3`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{kpi.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Destinations by searches */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="mb-4" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Destinos Más Buscados</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.searchesByDestination} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="destination" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="searches" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by month */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="mb-4" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Reservas e Ingresos Mensuales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.reservationsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="reservations" stroke="#3b82f6" name="Reservas" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Ingresos ($)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Price range distribution */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="mb-4" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Distribución por Rango de Precio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.priceRangeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Búsquedas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status pie */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="mb-4" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Estado de Reservas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="count"
                nameKey="status"
                label={({ status, count }) => `${status}: ${count}`}
              >
                {dashboardData.statusDistribution.map((entry) => (
                  <Cell key={entry.status} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Avg budget table */}
      <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
        <h3 className="mb-4" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Presupuesto Promedio por Destino</h3>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.85rem" }}>
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2">Destino</th>
                <th className="text-right py-3 px-2">Búsquedas</th>
                <th className="text-right py-3 px-2">Presupuesto Prom.</th>
                <th className="text-left py-3 px-2">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.searchesByDestination.map((d) => (
                <tr key={d.destination} className="border-b border-border/50">
                  <td className="py-3 px-2" style={{ fontWeight: 600 }}>{d.destination}</td>
                  <td className="text-right py-3 px-2">{d.searches.toLocaleString()}</td>
                  <td className="text-right py-3 px-2 text-emerald-700" style={{ fontWeight: 600 }}>${d.avgBudget}/noche</td>
                  <td className="py-3 px-2">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(d.searches / 1240) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}