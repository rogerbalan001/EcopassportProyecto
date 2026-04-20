import { useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";

type TabKey = "hospedajes" | "tiposReserva" | "paquetes" | "transporte" | "regiones";

interface TableItem {
  id: string;
  [key: string]: string;
}

const initialData: Record<TabKey, { columns: { key: string; label: string }[]; rows: TableItem[] }> = {
  hospedajes: {
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "tipo", label: "Tipo" },
      { key: "ubicacion", label: "Ubicación" },
      { key: "precio", label: "Precio/Noche" },
      { key: "capacidad", label: "Capacidad" },
      { key: "estado", label: "Estado" },
    ],
    rows: [
      { id: "1", nombre: "Posada Sol del Caribe", tipo: "Posada", ubicacion: "Isla Margarita", precio: "$25", capacidad: "12", estado: "Activo" },
      { id: "2", nombre: "Camping Montaña Azul", tipo: "Camping", ubicacion: "Mérida", precio: "$10", capacidad: "30", estado: "Activo" },
      { id: "3", nombre: "Hostel Colonial Center", tipo: "Hostel", ubicacion: "Cartagena", precio: "$18", capacidad: "40", estado: "Activo" },
      { id: "4", nombre: "Posada La Ceiba", tipo: "Posada", ubicacion: "Canaima", precio: "$35", capacidad: "8", estado: "Activo" },
      { id: "5", nombre: "Cabaña Desierto Dorado", tipo: "Cabaña", ubicacion: "Médanos de Coro", precio: "$22", capacidad: "6", estado: "Inactivo" },
    ],
  },
  tiposReserva: {
    columns: [
      { key: "codigo", label: "Código" },
      { key: "nombre", label: "Nombre" },
      { key: "descripcion", label: "Descripción" },
      { key: "requierePago", label: "Requiere Pago" },
    ],
    rows: [
      { id: "1", codigo: "STD", nombre: "Estándar", descripcion: "Reserva regular con confirmación manual", requierePago: "Sí" },
      { id: "2", codigo: "INS", nombre: "Instantánea", descripcion: "Confirmación automática al pagar", requierePago: "Sí" },
      { id: "3", codigo: "GRP", nombre: "Grupal", descripcion: "Para grupos de 10+ personas", requierePago: "Depósito 50%" },
      { id: "4", codigo: "PRO", nombre: "Promocional", descripcion: "Reservas con descuento especial", requierePago: "Sí" },
    ],
  },
  paquetes: {
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "destino", label: "Destino" },
      { key: "duracion", label: "Duración" },
      { key: "precio", label: "Precio" },
      { key: "estado", label: "Estado" },
    ],
    rows: [
      { id: "1", nombre: "Aventura Andina", destino: "Mérida", duracion: "5D/4N", precio: "$120", estado: "Activo" },
      { id: "2", nombre: "Paraíso Caribeño", destino: "Isla Margarita", duracion: "4D/3N", precio: "$150", estado: "Activo" },
      { id: "3", nombre: "Selva Mágica", destino: "Canaima", duracion: "3D/2N", precio: "$200", estado: "Activo" },
      { id: "4", nombre: "Ruta Colonial", destino: "Cartagena", duracion: "3D/2N", precio: "$95", estado: "Pausado" },
    ],
  },
  transporte: {
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "ruta", label: "Ruta" },
      { key: "frecuencia", label: "Frecuencia" },
      { key: "costo", label: "Costo" },
    ],
    rows: [
      { id: "1", tipo: "Bus", ruta: "Caracas → Mérida", frecuencia: "Diario", costo: "$15" },
      { id: "2", tipo: "Lancha", ruta: "Puerto La Cruz → Isla Margarita", frecuencia: "3x/día", costo: "$8" },
      { id: "3", tipo: "Colectivo", ruta: "Mérida → Mucuchíes", frecuencia: "Cada 2h", costo: "$3" },
      { id: "4", tipo: "Bus", ruta: "Coro → Médanos", frecuencia: "2x/día", costo: "$5" },
    ],
  },
  regiones: {
    columns: [
      { key: "nombre", label: "Región" },
      { key: "pais", label: "País" },
      { key: "destinos", label: "Destinos" },
      { key: "temporada", label: "Mejor Temporada" },
    ],
    rows: [
      { id: "1", nombre: "Caribe", pais: "Venezuela/Colombia", destinos: "12", temporada: "Dic - Abr" },
      { id: "2", nombre: "Andes", pais: "Venezuela", destinos: "8", temporada: "Jun - Sep" },
      { id: "3", nombre: "Amazonas", pais: "Venezuela", destinos: "5", temporada: "Ene - Mar" },
      { id: "4", nombre: "Occidente", pais: "Venezuela", destinos: "6", temporada: "Nov - Mar" },
    ],
  },
};

const tabLabels: Record<TabKey, string> = {
  hospedajes: "Hospedajes",
  tiposReserva: "Tipos de Reserva",
  paquetes: "Paquetes Turísticos",
  transporte: "Transporte",
  regiones: "Regiones",
};

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("hospedajes");
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<TableItem | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newValues, setNewValues] = useState<Record<string, string>>({});

  const current = data[activeTab];

  const startEdit = (row: TableItem) => {
    setEditingId(row.id);
    setEditValues({ ...row });
  };

  const saveEdit = () => {
    if (!editValues) return;
    setData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        rows: prev[activeTab].rows.map((r) => (r.id === editValues.id ? editValues : r)),
      },
    }));
    setEditingId(null);
    setEditValues(null);
    toast.success("Registro actualizado");
  };

  const deleteRow = (id: string) => {
    setData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], rows: prev[activeTab].rows.filter((r) => r.id !== id) },
    }));
    toast.success("Registro eliminado");
  };

  const addNew = () => {
    const missing = current.columns.some((c) => !newValues[c.key]?.trim());
    if (missing) { toast.error("Completa todos los campos"); return; }
    const newRow: TableItem = { id: `${Date.now()}`, ...newValues };
    setData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], rows: [...prev[activeTab].rows, newRow] },
    }));
    setNewValues({});
    setAddingNew(false);
    toast.success("Registro agregado");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Administración</h1>
      <p className="text-muted-foreground mb-6">Tablas de mantenimiento para la gestión del sistema</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(tabLabels) as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setEditingId(null); setAddingNew(false); }}
            className={`px-4 py-2 rounded-xl border transition-colors ${
              activeTab === tab ? "bg-emerald-600 text-white border-emerald-600" : "border-border hover:bg-muted"
            }`}
            style={{ fontSize: "0.85rem" }}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{tabLabels[activeTab]}</h2>
          <button
            onClick={() => { setAddingNew(!addingNew); setNewValues({}); }}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
            style={{ fontSize: "0.8rem" }}
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.85rem" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                {current.columns.map((col) => (
                  <th key={col.key} className="text-left py-3 px-4" style={{ fontWeight: 600 }}>{col.label}</th>
                ))}
                <th className="text-right py-3 px-4" style={{ fontWeight: 600 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {addingNew && (
                <tr className="border-b border-border bg-emerald-50/50">
                  {current.columns.map((col) => (
                    <td key={col.key} className="py-2 px-4">
                      <input
                        value={newValues[col.key] || ""}
                        onChange={(e) => setNewValues((p) => ({ ...p, [col.key]: e.target.value }))}
                        className="w-full p-1.5 border border-border rounded bg-white"
                        placeholder={col.label}
                        style={{ fontSize: "0.8rem" }}
                      />
                    </td>
                  ))}
                  <td className="py-2 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={addNew} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Save className="w-4 h-4" /></button>
                      <button onClick={() => setAddingNew(false)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )}
              {current.rows.map((row) => (
                <tr key={row.id} className="border-b border-border/50 hover:bg-gray-50">
                  {current.columns.map((col) => (
                    <td key={col.key} className="py-3 px-4">
                      {editingId === row.id ? (
                        <input
                          value={editValues?.[col.key] || ""}
                          onChange={(e) => setEditValues((p) => p ? { ...p, [col.key]: e.target.value } : null)}
                          className="w-full p-1.5 border border-border rounded bg-white"
                          style={{ fontSize: "0.8rem" }}
                        />
                      ) : (
                        <span>{row[col.key]}</span>
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      {editingId === row.id ? (
                        <>
                          <button onClick={saveEdit} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Save className="w-4 h-4" /></button>
                          <button onClick={() => { setEditingId(null); setEditValues(null); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(row)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => deleteRow(row.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border text-muted-foreground" style={{ fontSize: "0.8rem" }}>
          {current.rows.length} registro(s)
        </div>
      </div>
    </div>
  );
}
