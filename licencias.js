// Worship Sounds - compras y licencias (servidor propio en Supabase).
// tools/set-server.sh (repo worship-sounds-licensing) cambia esta línea:
const WS_SERVER = "https://wydayvywmqulnofvjcmr.supabase.co/functions/v1";

const WS_PRODUCTS = [
  { id: "all", name: "Plan mensual: todo", usd: 25, kind: "subscription", desc: "Worship DAW y todos los plugins mientras dure el plan. Se cobra cada mes; lo cancelás cuando quieras." },
  { id: "daw", name: "Worship DAW", usd: 99, kind: "perpetual", desc: "El programa para grabar, editar y mezclar, para siempre." },
  { id: "vocal-rack", name: "Worship Vocal Rack", usd: 25, kind: "perpetual", desc: "Cadena completa para voces." },
  { id: "vocal-tuner", name: "Worship Vocal Tuner", usd: 25, kind: "perpetual", desc: "Afinación automática y nota por nota." },
  { id: "choir", name: "WorshipChoir", usd: 25, kind: "perpetual", desc: "El coro de la congregación desde una sola voz." },
  { id: "guitar", name: "WorshipGuitar", usd: 25, kind: "perpetual", desc: "Amplificadores y pedalera para guitarra worship." },
  { id: "keys", name: "WorshipKeys", usd: 25, kind: "perpetual", desc: "Pianos, cuerdas, pads por tonalidad." },
  { id: "bass", name: "WorshipBass", usd: 25, kind: "perpetual", desc: "Bajos de sintetizador y eléctricos." },
  { id: "drumms", name: "WorshipDrumms", usd: 25, kind: "perpetual", desc: "Batería con salas y swells." },
  { id: "flow", name: "WorshipFlow", usd: 25, kind: "perpetual", desc: "Loops, transiciones y pads al tempo de la canción." },
  { id: "mastering", name: "WorshipMastering", usd: 25, kind: "perpetual", desc: "Mastering listo para streaming." },
];

async function wsCall(fn, body) {
  try {
    const r = await fetch(`${WS_SERVER}/ws-${fn}`,          // funciones ws-* (viven en el proyecto de Activa) { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json();
    return j;
  } catch (e) {
    return { ok: false, message: "No pudimos conectar con el servidor. Revisá tu conexión y probá de nuevo." };
  }
}

const wsPesos = (n) => "$ " + Math.round(n).toLocaleString("es-AR");
const wsDate = (iso) => new Date(iso).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
const wsEsc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
