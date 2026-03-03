"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";

interface News {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  source: string;
  sourceUrl: string;
  urgent: boolean;
  positive: boolean;
}

const NEWS: News[] = [
  {
    id: 1,
    title: "La Fed maintient ses taux directeurs a 4.75%",
    excerpt: "La Reserve federale americaine a decide de maintenir ses taux inchanges lors de sa reunion de janvier, citant une inflation encore trop elevee.",
    category: "Banques centrales",
    date: "Il y a 2h",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com",
    urgent: true,
    positive: false,
  },
  {
    id: 2,
    title: "Bitcoin : les ETF spot enregistrent 2B$ d'entrees en une semaine",
    excerpt: "Les fonds negocies en bourse Bitcoin spot americains ont attire des flux records, signe d'un appetit institutionnel croissant en 2026.",
    category: "Crypto",
    date: "Il y a 3h",
    source: "Bloomberg",
    sourceUrl: "https://www.bloomberg.com",
    urgent: true,
    positive: true,
  },
  {
    id: 3,
    title: "Nvidia consolide apres le boom de 2025",
    excerpt: "Le fabricant de puces graphiques marque une pause apres une hausse de 800% en deux ans. Les analystes restent globalement positifs.",
    category: "Actions",
    date: "Il y a 5h",
    source: "Financial Times",
    sourceUrl: "https://www.ft.com",
    urgent: false,
    positive: true,
  },
  {
    id: 4,
    title: "L'or franchit les 2 900$ l'once",
    excerpt: "Le metal precieux atteint un nouveau record historique, porte par les incertitudes geopolitiques et la demande des banques centrales.",
    category: "Matieres premieres",
    date: "Il y a 6h",
    source: "CNBC",
    sourceUrl: "https://www.cnbc.com",
    urgent: false,
    positive: true,
  },
  {
    id: 5,
    title: "Zone euro : la croissance stagne au T4 2025",
    excerpt: "L'economie europeenne peine a redemarrer, sous l'effet de la crise energetique et du ralentissement allemand persistant.",
    category: "Economie",
    date: "Il y a 8h",
    source: "Eurostat",
    sourceUrl: "https://ec.europa.eu/eurostat",
    urgent: false,
    positive: false,
  },
  {
    id: 6,
    title: "Ethereum : la mise a jour Pectra booste les performances",
    excerpt: "La derniere mise a jour du reseau Ethereum reduit significativement les frais de transaction et ameliore la scalabilite.",
    category: "Crypto",
    date: "Il y a 10h",
    source: "CoinDesk",
    sourceUrl: "https://www.coindesk.com",
    urgent: false,
    positive: true,
  },
  {
    id: 7,
    title: "OPEP+ reconduit ses reductions de production",
    excerpt: "Le cartel petrolier reconduit ses coupes de production, soutenant les prix autour de 82$ le baril.",
    category: "Matieres premieres",
    date: "Il y a 12h",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com",
    urgent: false,
    positive: true,
  },
  {
    id: 8,
    title: "Apple lance ses lunettes AR Vision Pro 2",
    excerpt: "Apple entre dans une nouvelle ere avec ses lunettes de realite augmentee de deuxieme generation, propulsant le titre en bourse.",
    category: "Actions",
    date: "Il y a 1j",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    urgent: false,
    positive: true,
  },
];

const CATEGORIES = ["Toutes", "Banques centrales", "Crypto", "Actions", "Matieres premieres", "Economie"];
type Sentiment = "tous" | "positif" | "negatif";

export default function Actualites() {
  const [selectedCat, setSelectedCat] = useState<string>("Toutes");
  const [sentiment, setSentiment] = useState<Sentiment>("tous");

  const filtered = NEWS
    .filter((n) => selectedCat === "Toutes" || n.category === selectedCat)
    .filter((n) => {
      if (sentiment === "positif") return n.positive;
      if (sentiment === "negatif") return !n.positive;
      return true;
    });

  const urgent = filtered.filter((n) => n.urgent);
  const normal = filtered.filter((n) => !n.urgent);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Actualites Financieres</h1>
            <p className="text-base-content/50 mt-1">Les dernieres nouvelles des marches</p>
          </div>
          <span className="badge badge-success animate-pulse">Live</span>
        </div>

        {/* FILTRES CATEGORIES + SENTIMENT */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`btn btn-sm ${selectedCat === cat ? "btn-warning" : "btn-ghost"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FILTRE SENTIMENT */}
          <div className="flex gap-2">
            <button
              onClick={() => setSentiment("tous")}
              className={`btn btn-sm ${sentiment === "tous" ? "btn-neutral" : "btn-ghost"}`}
            >
              Tous
            </button>
            <button
              onClick={() => setSentiment("positif")}
              className={`btn btn-sm ${sentiment === "positif" ? "btn-success" : "btn-ghost"}`}
            >
              Opportunites
            </button>
            <button
              onClick={() => setSentiment("negatif")}
              className={`btn btn-sm ${sentiment === "negatif" ? "btn-error" : "btn-ghost"}`}
            >
              Risques
            </button>
          </div>
        </div>

        {/* BREAKING NEWS */}
        {urgent.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="badge badge-error animate-pulse">BREAKING</span>
              <h2 className="font-bold text-lg">Actualites urgentes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urgent.map((news) => (
                <div key={news.id} className="card bg-base-100 shadow border-l-4 border-red-500 hover:border-yellow-400 transition-all">
                  <div className="card-body p-5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="badge badge-warning text-xs">{news.category}</span>
                      <span className="text-xs text-base-content/40">{news.date}</span>
                    </div>
                    <h3 className="font-bold mt-2 hover:text-yellow-400 transition-colors cursor-pointer">
                      {news.title}
                    </h3>
                    <p className="text-sm text-base-content/70 mt-1">{news.excerpt}</p>
                    <div className="flex justify-between items-center mt-3">
                      
                       <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:underline font-medium">
                        {news.source} →
                      </a>
                      <span className={`badge text-xs ${news.positive ? "badge-success" : "badge-error"}`}>
                        {news.positive ? "Opportunite" : "Risque"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTUALITÉS NORMALES */}
        {normal.length > 0 && (
          <>
            <h2 className="font-bold text-lg mb-4">Toutes les actualites</h2>
            <div className="space-y-4">
              {normal.map((news) => (
                <div key={news.id} className="card bg-base-100 shadow border border-base-300 hover:border-yellow-400 transition-all">
                  <div className="card-body p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="badge badge-ghost text-xs">{news.category}</span>
                          <span className="text-xs text-base-content/50">{news.date}</span>
                          
                            <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:underline font-medium">
                            {news.source} →
                          </a>
                        </div>
                        <h3 className="font-bold hover:text-yellow-400 transition-colors cursor-pointer">
                          {news.title}
                        </h3>
                        <p className="text-sm text-base-content/70 mt-1">{news.excerpt}</p>
                      </div>
                      <span className={`badge shrink-0 ${news.positive ? "badge-success" : "badge-error"}`}>
                        {news.positive ? "Opportunite" : "Risque"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <div className="alert alert-info">
            <span>Aucune actualite pour ces filtres.</span>
          </div>
        )}
      </div>
    </div>
  );
}