"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

interface DataPoint {
  time: string;
  price: number;
  volume: number;
  ma7?: number;
}

type Period = "1H" | "1D" | "1W" | "1M" | "1Y";

const PERIODS: Period[] = ["1H", "1D", "1W", "1M", "1Y"];

const PERIOD_CONFIG: { [key in Period]: { points: number; interval: number; label: string } } = {
  "1H": { points: 60, interval: 60000, label: "min" },
  "1D": { points: 24, interval: 3600000, label: "h" },
  "1W": { points: 7, interval: 86400000, label: "J" },
  "1M": { points: 30, interval: 86400000, label: "J" },
  "1Y": { points: 12, interval: 2592000000, label: "M" },
};

const generateData = (basePrice: number, points: number, label: string): DataPoint[] => {
  const data: DataPoint[] = [];
  let price = basePrice;
  let ma7Sum = 0;
  for (let i = points; i >= 0; i--) {
    price = price + (Math.random() - 0.48) * (basePrice * 0.02);
    ma7Sum = ma7Sum + price;
    data.push({
      time: `${label}${i}`,
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000 + 500000),
      ma7: data.length >= 6
        ? parseFloat((data.slice(-6).reduce((s, d) => s + d.price, 0) / 6).toFixed(2))
        : undefined,
    });
  }
  return data;
};

const ASSETS = [
  { symbol: "BTC/USD", name: "Bitcoin", price: 108450, color: "#2962ff" },
  { symbol: "ETH/USD", name: "Ethereum", price: 4120, color: "#6366f1" },
  { symbol: "NVDA", name: "Nvidia", price: 952, color: "#10b981" },
  { symbol: "SPX", name: "S&P 500", price: 6234, color: "#f59e0b" },
  { symbol: "XAU", name: "Or", price: 2912, color: "#eab308" },
  { symbol: "EUR/USD", name: "Euro/Dollar", price: 1.02, color: "#ec4899" },
];

export default function Graphiques() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [livePrice, setLivePrice] = useState<number>(ASSETS[0].price);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");
  const [period, setPeriod] = useState<Period>("1D");
  const [showMA, setShowMA] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(false);

  useEffect(() => {
    const cfg = PERIOD_CONFIG[period];
    setChartData(generateData(selectedAsset.price, cfg.points, cfg.label));
    setLivePrice(selectedAsset.price);
    setPriceChange(0);
  }, [selectedAsset, period]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice((prev) => {
        const variation = (Math.random() - 0.5) * selectedAsset.price * 0.001;
        const newPrice = prev + variation;
        setPriceChange(((newPrice - selectedAsset.price) / selectedAsset.price) * 100);
        setChartData((prevData) => {
          const cfg = PERIOD_CONFIG[period];
          const newPoint: DataPoint = {
            time: `live`,
            price: parseFloat(newPrice.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000 + 500000),
          };
          return [...prevData.slice(-(cfg.points)), newPoint];
        });
        return newPrice;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedAsset, period]);

  const isPositive = priceChange >= 0;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Graphiques de Trading</h1>
            <p className="text-base-content/50 mt-1">Visualisez les marches en temps reel</p>
          </div>
          <span className="badge badge-success animate-pulse">Live</span>
        </div>

        {/* SELECTION ACTIF */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ASSETS.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => setSelectedAsset(asset)}
              className={`btn btn-sm ${selectedAsset.symbol === asset.symbol ? "btn-warning" : "btn-ghost"}`}
            >
              {asset.symbol}
            </button>
          ))}
        </div>

        {/* PRIX EN DIRECT */}
        <div className="card bg-base-100 shadow border border-base-300 p-6 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-base-content/50 text-sm">{selectedAsset.name}</p>
              <p className="text-5xl font-bold text-yellow-400 mt-1">
                {livePrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                <span className="text-lg ml-2 text-base-content/50">USD</span>
              </p>
              <span className={`badge mt-2 ${isPositive ? "badge-success" : "badge-error"}`}>
                {isPositive ? "▲" : "▼"} {Math.abs(priceChange).toFixed(3)}%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Ouverture", value: selectedAsset.price.toLocaleString() },
                { label: "Plus haut", value: (selectedAsset.price * 1.02).toLocaleString(undefined, { maximumFractionDigits: 2 }) },
                { label: "Plus bas", value: (selectedAsset.price * 0.98).toLocaleString(undefined, { maximumFractionDigits: 2 }) },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xs text-base-content/40">{s.label}</p>
                  <p className="font-bold text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTROLES */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">

          {/* SELECTEUR PERIODE */}
          <div className="flex gap-1 bg-base-100 rounded-lg p-1 border border-base-300">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`btn btn-xs ${period === p ? "btn-warning" : "btn-ghost"}`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* TYPE GRAPHIQUE */}
          <div className="flex gap-1 bg-base-100 rounded-lg p-1 border border-base-300">
            {(["area", "line", "bar"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`btn btn-xs ${chartType === type ? "btn-warning" : "btn-ghost"}`}
              >
                {type === "area" ? "Aire" : type === "line" ? "Ligne" : "Volume"}
              </button>
            ))}
          </div>

          {/* INDICATEURS */}
          <div className="flex gap-3 items-center bg-base-100 rounded-lg p-2 border border-base-300">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning"
                checked={showMA}
                onChange={(e) => setShowMA(e.target.checked)}
              />
              MM7
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning"
                checked={showVolume}
                onChange={(e) => setShowVolume(e.target.checked)}
              />
              Volume
            </label>
          </div>
        </div>

        {/* GRAPHIQUE PRINCIPAL */}
        <div className="card bg-base-100 shadow border border-base-300 p-6 mb-6">
          <h3 className="font-bold mb-4">
            {selectedAsset.symbol} — {period}
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            {chartType === "area" ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedAsset.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={selectedAsset.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e39" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ backgroundColor: "#1e222d", border: "1px solid #2a2e39", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="price" stroke={selectedAsset.color} fill="url(#colorPrice)" strokeWidth={2} />
                {showMA && <Line type="monotone" dataKey="ma7" stroke="#f59e0b" strokeWidth={1} dot={false} strokeDasharray="4 4" />}
                {showVolume && <Bar dataKey="volume" fill={selectedAsset.color} opacity={0.3} />}
              </AreaChart>
            ) : chartType === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e39" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ backgroundColor: "#1e222d", border: "1px solid #2a2e39", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="price" stroke={selectedAsset.color} strokeWidth={2} dot={false} />
                {showMA && <Line type="monotone" dataKey="ma7" stroke="#f59e0b" strokeWidth={1} dot={false} strokeDasharray="4 4" />}
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e39" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#1e222d", border: "1px solid #2a2e39", borderRadius: "8px" }} />
                <Bar dataKey="volume" fill={selectedAsset.color} opacity={0.8} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* MINI GRAPHIQUES */}
        <h2 className="font-bold text-lg mb-4">Tous les actifs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ASSETS.map((asset) => {
            const miniData = generateData(asset.price, 12, "h");
            const last = miniData[miniData.length - 1].price;
            const first = miniData[0].price;
            const change = ((last - first) / first) * 100;
            return (
              <div
                key={asset.symbol}
                className="card bg-base-100 shadow border border-base-300 hover:border-yellow-400 transition-all cursor-pointer p-4"
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-bold">{asset.symbol}</p>
                    <p className="text-xs text-base-content/40">{asset.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-400">
                      {last.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <span className={`badge badge-xs ${change >= 0 ? "badge-success" : "badge-error"}`}>
                      {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={miniData}>
                    <Line type="monotone" dataKey="price" stroke={asset.color} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}