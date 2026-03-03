"use client";

import { useState, useEffect } from "react";
import { CATEGORIES, ARTICLES } from "../data/articles";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  onSelectCategory: (cat: string | null) => void;
  selectedCategory: string | null;
}

function getReadTime(content: string): number {
  return Math.ceil(content.split(" ").length / 200);
}

function generateSparkline(base: number) {
  const data = [];
  let val = base;
  for (let i = 0; i < 12; i++) {
    val = val + (Math.random() - 0.48) * base * 0.01;
    data.push({ v: parseFloat(val.toFixed(2)) });
  }
  return data;
}

export default function Sidebar({ onSelectCategory, selectedCategory }: Props) {
  const [sparkData, setSparkData] = useState<{ [key: string]: { v: number }[] }>({});

  const stats = [
    { label: "BTC/USD", value: "102,450", change: "+5.24%", positive: true, base: 102450 },
    { label: "S&P 500", value: "5,892", change: "+0.43%", positive: true, base: 5892 },
    { label: "EUR/USD", value: "1.0312", change: "-0.45%", positive: false, base: 1.0312 },
    { label: "Or", value: "2,789", change: "+1.92%", positive: true, base: 2789 },
  ];

  useEffect(() => {
    const data: { [key: string]: { v: number }[] } = {};
    stats.forEach((s) => {
      data[s.label] = generateSparkline(s.base);
    });
    setSparkData(data);

    const interval = setInterval(() => {
      setSparkData((prev) => {
        const updated = { ...prev };
        stats.forEach((s) => {
          const last = updated[s.label]?.[updated[s.label].length - 1]?.v || s.base;
          const newVal = last + (Math.random() - 0.48) * s.base * 0.005;
          updated[s.label] = [
            ...(updated[s.label]?.slice(-11) || []),
            { v: parseFloat(newVal.toFixed(2)) },
          ];
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const topArticles = [...ARTICLES]
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 3);

  return (
    <div className="space-y-6">

      {/* MARCHÉS EN DIRECT AVEC SPARKLINES */}
      <div className="card bg-base-100 shadow border border-base-300 p-4">
        <h3 className="font-bold text-yellow-400 mb-4 text-sm uppercase tracking-wider">
          Marches en direct
        </h3>
        <div className="space-y-3">
          {stats.map((s) => (
            <div key={s.label} className="py-2 border-b border-base-300 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{s.label}</span>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-400">{s.value}</p>
                  <p className={`text-xs font-bold ${s.positive ? "text-green-400" : "text-red-400"}`}>
                    {s.positive ? "▲" : "▼"} {s.change}
                  </p>
                </div>
              </div>
              {/* SPARKLINE */}
              {sparkData[s.label] && (
                <ResponsiveContainer width="100%" height={35}>
                  <LineChart data={sparkData[s.label]}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={s.positive ? "#26a69a" : "#ef5350"}
                      strokeWidth={1.5}
                      dot={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e222d",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "10px",
                      }}
                      formatter={(val: number) => [val, s.label]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CATÉGORIES */}
      <div className="card bg-base-100 shadow border border-base-300 p-4">
        <h3 className="font-bold text-yellow-400 mb-4 text-sm uppercase tracking-wider">
          Categories
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-all flex justify-between items-center ${
                !selectedCategory ? "bg-yellow-400 text-black font-bold" : "hover:bg-base-200"
              }`}
            >
              <span>Tous les articles</span>
              <span className={`badge badge-sm ${!selectedCategory ? "bg-black/20 text-black border-0" : "badge-neutral"}`}>
                {ARTICLES.length}
              </span>
            </button>
          </li>
          {CATEGORIES.map((cat) => {
            const count = ARTICLES.filter((a) => a.category === cat).length;
            return (
              <li key={cat}>
                <button
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all flex justify-between items-center ${
                    selectedCategory === cat ? "bg-yellow-400 text-black font-bold" : "hover:bg-base-200"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`badge badge-sm ${
                    selectedCategory === cat
                      ? "bg-black/20 text-black border-0"
                      : count > 1
                      ? "badge-warning"
                      : "badge-neutral"
                  }`}>
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* TOP ARTICLES */}
      <div className="card bg-base-100 shadow border border-base-300 p-4">
        <h3 className="font-bold text-yellow-400 mb-4 text-sm uppercase tracking-wider">
          Les plus commentes
        </h3>
        <div className="space-y-4">
          {topArticles.map((article, i) => (
            <a key={article.id} href={`/article/${article.id}`} className="flex gap-3 group hover:bg-base-200 rounded p-2 transition-all">
              <span className="text-2xl font-bold text-yellow-400/30 w-6 shrink-0">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold leading-snug group-hover:text-yellow-400 transition-colors text-base-content/90">
                  {article.title}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-base-content/40">
                    💬 {article.comments.length}
                  </span>
                  <span className="text-xs text-base-content/40">
                    ⏱ {getReadTime(article.content)} min
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="card bg-yellow-400 text-black p-4">
        <h3 className="font-bold mb-1 text-sm uppercase tracking-wider">Newsletter</h3>
        <p className="text-xs mb-3 opacity-80">
          Recevez les meilleures analyses chaque matin.
        </p>
        <input
          type="email"
          placeholder="Votre email"
          className="input input-sm w-full mb-2 bg-white text-black border-0"
        />
        <button className="btn btn-sm btn-neutral w-full font-bold">
          S'abonner
        </button>
      </div>

    </div>
  );
}