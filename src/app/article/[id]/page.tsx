"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { ARTICLES, Article, Comment } from "../../../data/articles";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const generateMiniChart = (basePrice: number) => {
  const data = [];
  let price = basePrice;
  for (let i = 30; i >= 0; i--) {
    price = price + (Math.random() - 0.48) * (basePrice * 0.01);
    data.push({ time: `J-${i}`, price: parseFloat(price.toFixed(2)) });
  }
  return data;
};

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [showAI, setShowAI] = useState<boolean>(false);

  useEffect(() => {
    if (params?.id) {
      const found = ARTICLES.find((a) => a.id === parseInt(params.id as string));
      setArticle(found || null);
      setComments(found?.comments || []);
      if (found && found.price !== "N/A") {
        const base = parseFloat(found.price.replace(",", ""));
        setChartData(generateMiniChart(base));
      }
    }
  }, [params]);

  const handleAISummary = async () => {
    if (!article) return;
    setLoadingAI(true);
    setShowAI(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Tu es un analyste financier expert. Resume cet article financier en exactement 3 points cles en francais, de facon concise et professionnelle. Format: 3 bullet points maximum, chacun en une phrase. Article: "${article.title}". Contenu: ${article.content}`
            }
          ]
        })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "Resume non disponible.";
      setAiSummary(text);
    } catch {
      setAiSummary("Erreur lors de la generation du resume. Veuillez reessayer.");
    }

    setLoadingAI(false);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-yellow-400" />
      </div>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !newAuthor.trim()) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    const comment: Comment = {
      id: comments.length + 1,
      author: newAuthor,
      text: newComment,
      date: new Date().toLocaleDateString("fr-FR"),
    };
    setComments([...comments, comment]);
    setNewComment("");
    setNewAuthor("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-4xl">

        {/* IMAGE */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-72 object-cover rounded-2xl shadow-xl mb-6"
        />

        {/* BADGES & PRIX */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <div className="flex gap-2">
            <span className="badge badge-warning">{article.category}</span>
            <span className="badge badge-ghost">{article.date}</span>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="btn btn-xs btn-ghost"
              onClick={() => setIsFav(!isFav)}
            >
              {isFav ? "⭐ Sauvegarde" : "☆ Sauvegarder"}
            </button>
            {article.price !== "N/A" && (
              <div className="card bg-base-100 px-4 py-2 flex flex-row gap-3 items-center shadow">
                <span className="text-yellow-400 font-bold text-lg">{article.price}</span>
                <span className={`font-bold ${article.positive ? "text-green-400" : "text-red-400"}`}>
                  {article.positive ? "▲" : "▼"} {article.change}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* TITRE & AUTEUR */}
        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
        <p className="text-base-content/50 mb-4">Par {article.author}</p>

        {/* BOUTON RESUME IA */}
        <div className="mb-6">
          <button
            className="btn btn-warning btn-sm gap-2 font-bold"
            onClick={handleAISummary}
            disabled={loadingAI}
          >
            {loadingAI ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Generation en cours...
              </>
            ) : (
              <>
                🤖 Resume IA en 30 secondes
              </>
            )}
          </button>

          {/* RÉSUMÉ IA */}
          {showAI && (
            <div className="card bg-base-100 border border-yellow-400/30 shadow p-5 mt-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-yellow-400 text-sm">
                  🤖 Resume genere par IA
                </h3>
                <button
                  className="btn btn-xs btn-ghost"
                  onClick={() => setShowAI(false)}
                >
                  ✕
                </button>
              </div>
              {loadingAI ? (
                <div className="flex items-center gap-3">
                  <span className="loading loading-dots loading-sm text-yellow-400" />
                  <span className="text-sm text-base-content/50">Analyse en cours...</span>
                </div>
              ) : (
                <p className="text-sm text-base-content/80 whitespace-pre-line leading-relaxed">
                  {aiSummary}
                </p>
              )}
            </div>
          )}
        </div>

        {/* GRAPHIQUE */}
        {article.price !== "N/A" && chartData.length > 0 && (
          <div className="card bg-base-100 shadow border border-base-300 p-6 mb-8">
            <h3 className="font-bold text-yellow-400 mb-4">
              Evolution du prix — 30 derniers jours
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2962ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2962ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 10 }} interval={4} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#2962ff" }}
                />
                <Area type="monotone" dataKey="price" stroke="#2962ff" fill="url(#colorPrice)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* CONTENU */}
        <div className="card bg-base-100 shadow p-8 mb-10">
          <p className="leading-relaxed text-base-content whitespace-pre-line">
            {article.content}
          </p>
        </div>

        {/* COMMENTAIRES */}
        <h2 className="text-2xl font-bold mb-4">
          Commentaires
          <span className="badge badge-neutral ml-3">{comments.length}</span>
        </h2>

        {comments.length === 0 && (
          <div className="alert alert-info mb-4">
            <span>Aucun commentaire. Soyez le premier a reagir !</span>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {comments.map((c) => (
            <div key={c.id} className="card bg-base-100 shadow p-4 border-l-4 border-yellow-400">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-yellow-400">{c.author}</span>
                <span className="text-xs text-base-content/40">{c.date}</span>
              </div>
              <p className="text-base-content/80">{c.text}</p>
            </div>
          ))}
        </div>

        {/* FORMULAIRE COMMENTAIRE */}
        <div className="card bg-base-100 shadow p-6">
          <h3 className="font-bold text-lg mb-4">Laisser un commentaire</h3>

          {success && (
            <div className="alert alert-success mb-4">
              <span>Commentaire publie !</span>
            </div>
          )}
          {error && (
            <div className="alert alert-error mb-4">
              <span>Remplissez tous les champs !</span>
            </div>
          )}

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Votre nom</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Moussa Diallo"
              className="input input-bordered w-full"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Votre commentaire</span>
            </label>
            <textarea
              placeholder="Votre analyse ou reaction..."
              className="textarea textarea-bordered w-full"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>

          <button className="btn btn-warning w-full font-bold" onClick={handleAddComment}>
            Publier le commentaire
          </button>
        </div>

        {/* ARTICLES SIMILAIRES */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTICLES.filter((a) => a.id !== article.id && a.category === article.category)
              .slice(0, 3)
              .map((a) => (
                <div
                  key={a.id}
                  className="card bg-base-100 shadow border border-base-300 hover:border-yellow-400 transition-all cursor-pointer p-4"
                  onClick={() => router.push(`/article/${a.id}`)}
                >
                  <span className="badge badge-warning text-xs mb-2">{a.category}</span>
                  <h3 className="font-bold text-sm hover:text-yellow-400 transition-colors">{a.title}</h3>
                  <p className="text-xs text-base-content/40 mt-2">{a.author} — {a.date}</p>
                </div>
              ))}
          </div>
        </div>

        <button onClick={() => router.back()} className="btn btn-ghost mt-6">
          Retour
        </button>

      </div>
    </div>
  );
}