"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";

interface Bourse {
  nom: string;
  pays: string;
  flag: string;
  indice: string;
  valeur: string;
  change: string;
  positive: boolean;
  heureOuverture: number;
  heureFermeture: number;
  timezone: string;
  description: string;
}

const BOURSES: Bourse[] = [
  {
    nom: "New York Stock Exchange",
    pays: "Etats-Unis",
    flag: "🇺🇸",
    indice: "NYSE",
    valeur: "21,456",
    change: "+1.02",
    positive: true,
    heureOuverture: 9,
    heureFermeture: 16,
    timezone: "America/New_York",
    description: "La plus grande bourse mondiale avec plus de 2 400 milliards $ de capitalisation.",
  },
  {
    nom: "NASDAQ",
    pays: "Etats-Unis",
    flag: "🇺🇸",
    indice: "NASDAQ",
    valeur: "21,456",
    change: "+1.23",
    positive: true,
    heureOuverture: 9,
    heureFermeture: 16,
    timezone: "America/New_York",
    description: "Specialisee dans les valeurs technologiques. Apple, Microsoft, Google y sont cotes.",
  },
  {
    nom: "Bourse de Paris",
    pays: "France",
    flag: "🇫🇷",
    indice: "CAC 40",
    valeur: "7,892",
    change: "+0.54",
    positive: true,
    heureOuverture: 9,
    heureFermeture: 17,
    timezone: "Europe/Paris",
    description: "Principale bourse francaise, regroupant les 40 plus grandes entreprises francaises.",
  },
  {
    nom: "London Stock Exchange",
    pays: "Royaume-Uni",
    flag: "🇬🇧",
    indice: "FTSE 100",
    valeur: "8,412",
    change: "+0.34",
    positive: true,
    heureOuverture: 8,
    heureFermeture: 16,
    timezone: "Europe/London",
    description: "Une des plus anciennes bourses mondiales, fondee en 1801.",
  },
  {
    nom: "Tokyo Stock Exchange",
    pays: "Japon",
    flag: "🇯🇵",
    indice: "Nikkei 225",
    valeur: "42,380",
    change: "+1.45",
    positive: true,
    heureOuverture: 9,
    heureFermeture: 15,
    timezone: "Asia/Tokyo",
    description: "La plus grande bourse asiatique par capitalisation boursiere.",
  },
  {
    nom: "Shanghai Stock Exchange",
    pays: "Chine",
    flag: "🇨🇳",
    indice: "SSE",
    valeur: "3,456",
    change: "-0.34",
    positive: false,
    heureOuverture: 9,
    heureFermeture: 15,
    timezone: "Asia/Shanghai",
    description: "Deuxieme plus grande bourse d'Asie, en forte croissance.",
  },
  {
    nom: "Bourse de Casablanca",
    pays: "Maroc",
    flag: "🇲🇦",
    indice: "MASI",
    valeur: "14,123",
    change: "+0.92",
    positive: true,
    heureOuverture: 9,
    heureFermeture: 15,
    timezone: "Africa/Casablanca",
    description: "Principale bourse africaine francophone, leader en Afrique du Nord.",
  },
  {
    nom: "Johannesburg Stock Exchange",
    pays: "Afrique du Sud",
    flag: "🇿🇦",
    indice: "JSE",
    valeur: "84,230",
    change: "+1.23",
    positive: true,
    heureOuverture: 9,
    heureFermeture: 17,
    timezone: "Africa/Johannesburg",
    description: "La plus grande bourse d'Afrique avec plus de 400 entreprises cotees.",
  },
  {
    nom: "Nigerian Stock Exchange",
    pays: "Nigeria",
    flag: "🇳🇬",
    indice: "NGX",
    valeur: "102,340",
    change: "+2.14",
    positive: true,
    heureOuverture: 10,
    heureFermeture: 14,
    timezone: "Africa/Lagos",
    description: "Bourse principale d'Afrique de l'Ouest, en forte croissance.",
  },
];

function getMarketStatus(bourse: Bourse): {
  isOpen: boolean;
  countdown: string;
  localTime: string;
} {
  const now = new Date();
  const localTime = new Date(now.toLocaleString("en-US", { timeZone: bourse.timezone }));
  const hour = localTime.getHours();
  const minutes = localTime.getMinutes();
  const totalMinutes = hour * 60 + minutes;
  const openMinutes = bourse.heureOuverture * 60;
  const closeMinutes = bourse.heureFermeture * 60;
  const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;
  const isWeekend = localTime.getDay() === 0 || localTime.getDay() === 6;

  let countdown = "";
  if (isWeekend) {
    countdown = "Ferme (weekend)";
  } else if (isOpen) {
    const remaining = closeMinutes - totalMinutes;
    const h = Math.floor(remaining / 60);
    const m = remaining % 60;
    countdown = `Ferme dans ${h}h ${m}min`;
  } else if (totalMinutes < openMinutes) {
    const remaining = openMinutes - totalMinutes;
    const h = Math.floor(remaining / 60);
    const m = remaining % 60;
    countdown = `Ouvre dans ${h}h ${m}min`;
  } else {
    countdown = "Ouvre demain";
  }

  const localTimeStr = localTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { isOpen: isOpen && !isWeekend, countdown, localTime: localTimeStr };
}

export default function Bourses() {
  const [selected, setSelected] = useState<Bourse | null>(null);
  const [statuses, setStatuses] = useState<{ [key: string]: ReturnType<typeof getMarketStatus> }>({});
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const newStatuses: { [key: string]: ReturnType<typeof getMarketStatus> } = {};
      BOURSES.forEach((b) => {
        newStatuses[b.nom] = getMarketStatus(b);
      });
      setStatuses(newStatuses);
    };
    update();
    const interval = setInterval(() => {
      update();
      setTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const openCount = Object.values(statuses).filter((s) => s.isOpen).length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">Bourses Mondiales</h1>
        <p className="text-base-content/50 mb-8">
          Toutes les grandes places boursieres du monde en un coup d'oeil.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Bourses mondiales", value: "60+" },
            { label: "Marches ouverts", value: `${openCount}/${BOURSES.length}` },
            { label: "Cap. totale", value: "109T$" },
            { label: "Volume quotidien", value: "553B$" },
          ].map((s) => (
            <div key={s.label} className="card bg-base-100 shadow p-4 border border-base-300 text-center">
              <p className="text-2xl font-bold text-yellow-400">{s.value}</p>
              <p className="text-xs text-base-content/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* GRILLE BOURSES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BOURSES.map((bourse) => {
            const status = statuses[bourse.nom];
            return (
              <div
                key={bourse.nom}
                className="card bg-base-100 shadow border border-base-300 hover:border-yellow-400 transition-all cursor-pointer"
                onClick={() => setSelected(bourse)}
              >
                <div className="card-body p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-2xl">{bourse.flag}</span>
                      <h3 className="font-bold mt-1">{bourse.nom}</h3>
                      <p className="text-xs text-base-content/50">{bourse.pays}</p>
                    </div>
                    <div className="text-right">
                      <span className={`badge ${status?.isOpen ? "badge-success" : "badge-ghost"}`}>
                        {status?.isOpen ? "Ouvert" : "Ferme"}
                      </span>
                      {status && (
                        <p className="text-xs text-base-content/40 mt-1">{status.localTime}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <p className="text-xs text-base-content/40">{bourse.indice}</p>
                      <p className="text-xl font-bold text-yellow-400">{bourse.valeur}</p>
                    </div>
                    <span className={`badge ${bourse.positive ? "badge-success" : "badge-error"} text-sm`}>
                      {bourse.positive ? "▲" : "▼"} {Math.abs(parseFloat(bourse.change))}%
                    </span>
                  </div>

                  {/* COMPTE A REBOURS */}
                  {status && (
                    <div className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-2 ${
                      status.isOpen
                        ? "bg-green-400/10 text-green-400"
                        : "bg-base-200 text-base-content/50"
                    }`}>
                      <span>{status.isOpen ? "🟢" : "⏰"}</span>
                      {status.countdown}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-yellow-400">
              {selected.flag} {selected.nom}
            </h3>
            <div className="py-4 space-y-3">
              <p className="text-base-content/70">{selected.description}</p>
              {statuses[selected.nom] && (
                <div className={`alert ${statuses[selected.nom].isOpen ? "alert-success" : "alert-warning"} py-2`}>
                  <span className="text-sm font-bold">
                    {statuses[selected.nom].isOpen ? "Marche ouvert" : statuses[selected.nom].countdown}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-base-200 rounded-lg p-3">
                  <p className="text-xs text-base-content/50">Indice</p>
                  <p className="font-bold">{selected.indice}</p>
                </div>
                <div className="bg-base-200 rounded-lg p-3">
                  <p className="text-xs text-base-content/50">Valeur</p>
                  <p className="font-bold text-yellow-400">{selected.valeur}</p>
                </div>
                <div className="bg-base-200 rounded-lg p-3">
                  <p className="text-xs text-base-content/50">Variation</p>
                  <p className={`font-bold ${selected.positive ? "text-green-400" : "text-red-400"}`}>
                    {selected.positive ? "▲" : "▼"} {Math.abs(parseFloat(selected.change))}%
                  </p>
                </div>
                <div className="bg-base-200 rounded-lg p-3">
                  <p className="text-xs text-base-content/50">Heure locale</p>
                  <p className="font-bold text-sm">{statuses[selected.nom]?.localTime}</p>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-warning" onClick={() => setSelected(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}