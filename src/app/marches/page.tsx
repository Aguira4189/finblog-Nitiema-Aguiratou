"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Asset {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
  volume: string;
  marketCap: string;
  category: string;
  sparkline: { v: number }[];
}

function generateSparkline(base: number) {
  const data = [];
  let val = base;
  for (let i = 0; i < 7; i++) {
    val = val + (Math.random() - 0.48) * base * 0.02;
    data.push({ v: parseFloat(val.toFixed(2)) });
  }
  return data;
}

const INITIAL_ASSETS = [
  { symbol: "BTC", name: "Bitcoin", price: "108,450", change: "+5.24", positive: true, volume: "48.2B", marketCap: "2.01T", category: "Crypto" },
  { symbol: "ETH", name: "Ethereum", price: "4,120", change: "+2.11", positive: true, volume: "22.1B", marketCap: "495B", category: "Crypto" },
  { symbol: "NVDA", name: "Nvidia", price: "952.30", change: "-1.24", positive: false, volume: "15.3B", marketCap: "2.34T", category: "Actions" },
  { symbol: "AAPL", name: "Apple", price: "245.80", change: "+0.43", positive: true, volume: "8.7B", marketCap: "3.78T", category: "Actions" },
  { symbol: "MSFT", name: "Microsoft", price: "425.60", change: "+0.87", positive: true, volume: "6.2B", marketCap: "3.16T", category: "Actions" },
  { symbol: "EUR/USD", name: "Euro / Dollar", price: "1.0198", change: "-0.67", positive: false, volume: "320B", marketCap: "-", category: "Forex" },
  { symbol: "GBP/USD", name: "Livre / Dollar", price: "1.2680", change: "+0.21", positive: true, volume: "180B", marketCap: "-", category: "Forex" },
  { symbol: "XAU", name: "Or", price: "2,912", change: "+2.14", positive: true, volume: "12.4B", marketCap: "-", category: "Matieres premieres" },
  { symbol: "OIL", name: "Petrole (WTI)", price: "82.45", change: "+0.91", positive: true, volume: "9.8B", marketCap: "-", category: "Matieres premieres" },
  { symbol: "SPX", name: "S&P 500", price: "6,234", change: "+0.87", positive: true, volume: "25.6B", marketCap: "-", category: "Indices" },
  { symbol: "NDX", name: "NASDAQ 100", price: "21,456", change: "+1.23", positive: true, volume: "18.9B", marketCap: "-", category: "Indices" },
  { symbol: "CAC", name: "CAC 40", price: "7,892", change: "+0.54", positive: true, volume: "4.2B", marketCap: "-", category: "Indices" },
];

const CATEGORIES = ["Tous", "Crypto", "Actions", "Forex", "Matieres premieres", "Indices"];

type SortKey = "price" | "change" | "volume" | "marketCap" | null;

export default function Marches() {
  const [assets, setAssets] = useState<Asset[]>(
    INITIAL_ASSETS.map((a) => ({
      ...a,
      sparkline: generateSparkline(parseFloat(a.price.replace(",", ""))),
    }))
  );
  const [selectedCat, setSelectedCat] = useState<string>("Tous");
  const [search, setSearch] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          const variation = (Math.random() - 0.5) * 0.1;
          const currentPrice = parseFloat(asset.price.replace(",", ""));
          const newPrice = (currentPrice * (1 + variation / 100)).toFixed(2);
          const newChange = (parseFloat(asset.change) + variation).toFixed(2);
          const newSparkline = [
            ...asset.sparkline.slice(-6),
            { v: parseFloat(newPrice) },
          ];
          return {
            ...asset,
            price: parseFloat(newPrice).toLocaleString(),
            change: newChange,
            positive: parseFloat(newChange) >= 0,
            sparkline: newSparkline,
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const filtered = assets
    .filter((a) => selectedCat === "Tous" || a.category === selectedCat)
    .filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      let valA = parseFloat(a[sortKey].replace(/[^0-9.-]/g, "") || "0");
      let valB = parseFloat(b[sortKey].replace(/[^0-9.-]/g, "") || "0");
      return sortAsc ? valA - valB : valB - valA;
    });

  const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
    <th
      className="cursor-pointer hover:text-yellow-400 transition-colors select-none"
      onClick={() => handleSort(k)}
    >
      <span className="flex items-center gap-1">
        {label}
        {sortKey === k ? (sortAsc ? " ▲" : " ▼") : " ↕"}
      </span>
    </th>
  );

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Marches en direct</h1>
            <p className="text-base-content/50 mt-1">Prix mis a jour en temps reel</p>
          </div>
          <span className="badge badge-success animate-pulse">Live</span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Capitalisation totale", value: "3.12T$" },
            { label: "Volume 24h", value: "187.4B$" },
            { label: "Dominance BTC", value: "56.8%" },
            { label: "Indice peur/cupidite", value: "68 - Cupidite" },
          ].map((stat) => (
            <div key={stat.label} className="card bg-base-100 shadow p-4 border border-base-300">
              <p className="text-xs text-base-content/50">{stat.label}</p>
              <p className="text-lg font-bold text-yellow-400 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* FILTRES */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`btn btn-sm ${selectedCat === cat ? "btn-warning" : "btn-ghost"}`}
            >
              {cat}
            </button>
          ))}
          <input
            type="text"
            placeholder="Rechercher..."
            className="input input-bordered input-sm ml-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLEAU */}
        <div className="card bg-base-100 shadow border border-base-300 overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="text-yellow-400">
                <th>#</th>
                <th>Actif</th>
                <SortHeader label="Prix" k="price" />
                <SortHeader label="Variation 24h" k="change" />
                <th>Tendance 7j</th>
                <SortHeader label="Volume 24h" k="volume" />
                <SortHeader label="Capitalisation" k="marketCap" />
                <th>Categorie</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset, i) => (
                <tr key={asset.symbol} className="hover">
                  <td className="text-base-content/40">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-xs font-bold text-yellow-400">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold">{asset.name}</p>
                        <p className="text-xs text-base-content/40">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold text-yellow-400">{asset.price}</td>
                  <td>
                    <span className={`badge ${asset.positive ? "badge-success" : "badge-error"}`}>
                      {asset.positive ? "▲" : "▼"} {Math.abs(parseFloat(asset.change))}%
                    </span>
                  </td>
                  <td style={{ width: "80px" }}>
                    <ResponsiveContainer width={80} height={35}>
                      <LineChart data={asset.sparkline}>
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke={asset.positive ? "#26a69a" : "#ef5350"}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </td>
                  <td className="text-base-content/70">{asset.volume}</td>
                  <td className="text-base-content/70">{asset.marketCap}</td>
                  <td>
                    <span className="badge badge-ghost text-xs">{asset.category}</span>
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