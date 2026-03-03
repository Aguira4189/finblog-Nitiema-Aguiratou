"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { ARTICLES, Article } from "../data/articles";

function getReadTime(content: string): number {
  return Math.ceil(content.split(" ").length / 200);
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recent" | "ancien" | "commentaires">("recent");
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      setArticles(ARTICLES);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = articles
    .filter((a) => !selectedCategory || a.category === selectedCategory)
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "commentaires") return b.comments.length - a.comments.length;
      if (sortBy === "ancien") return a.id - b.id;
      return b.id - a.id;
    });

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);

  return (
    <div className="bg-base-200">
      <Navbar />

      {/* BANDEAU DATE */}
      <div className="bg-base-100 border-b border-base-300 px-6 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-xs text-base-content/50">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-4 text-xs">
            <span className="text-green-400 font-bold">BTC ▲ 102,450</span>
            <span className="text-red-400 font-bold">CAC 40 ▼ 7,248</span>
            <span className="text-green-400 font-bold">Or ▲ 2,789</span>
          </div>
        </div>
      </div>

      {/* HERO STYLE FINANCIAL TIMES */}
      <div className="bg-base-100 border-b-2 border-base-300">
        <div className="container mx-auto px-4 py-8">

          {/* EN-TETE JOURNAL */}
          <div className="text-center border-b border-base-300 pb-4 mb-6">
            <h1
              className="text-6xl font-bold tracking-tight text-yellow-400"
              style={{ fontFamily: "Georgia, serif" }}
            >
              FinBlog
            </h1>
            <p className="text-xs text-base-content/50 mt-2 tracking-widest uppercase">
              Analyses · Marches · Finance · Economie
            </p>
          </div>

          {/* LAYOUT JOURNAL */}
          {!loading && featuredArticle && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ARTICLE PRINCIPAL */}
              <div className="lg:col-span-2 border-r border-base-300 pr-6">
                <span className="badge badge-warning text-xs mb-3">A la une</span>
                <a href={`/article/${featuredArticle.id}`} className="group">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity"
                  />
                  <h2
                    className="text-2xl font-bold leading-tight group-hover:text-yellow-400 transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {featuredArticle.title}
                  </h2>
                  <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span className="text-xs text-base-content/40">
                      Par {featuredArticle.author}
                    </span>
                    <span className="text-xs text-base-content/40">·</span>
                    <span className="text-xs text-base-content/40">
                      {featuredArticle.date}
                    </span>
                    <span className="text-xs text-base-content/40">·</span>
                    <span className="text-xs text-base-content/40">
                      ⏱ {getReadTime(featuredArticle.content)} min de lecture
                    </span>
                    {featuredArticle.price !== "N/A" && (
                      <>
                        <span className="text-xs text-base-content/40">·</span>
                        <span className={`text-xs font-bold ${featuredArticle.positive ? "text-green-400" : "text-red-400"}`}>
                          {featuredArticle.positive ? "▲" : "▼"} {featuredArticle.change}%
                        </span>
                      </>
                    )}
                  </div>
                </a>
              </div>

              {/* ARTICLES SECONDAIRES */}
              <div className="flex flex-col gap-5">
                <span className="badge badge-ghost text-xs">Dernieres analyses</span>
                {secondaryArticles.map((article) => (
  <a key={article.id} href={`/article/${article.id}`} className="group flex gap-3 pb-4 border-b border-base-300 last:border-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-20 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div>
                      <span className="badge badge-warning badge-xs mb-1">
                        {article.category}
                      </span>
                      <h3 className="text-sm font-bold leading-snug group-hover:text-yellow-400 transition-colors text-base-content/90">
                        {article.title}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <p className="text-xs text-base-content/40">{article.author}</p>
                        <p className="text-xs text-base-content/40">·</p>
                        <p className="text-xs text-base-content/40">
                          ⏱ {getReadTime(article.content)} min
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* CONTENU */}
      <div className="container mx-auto px-4 py-10">

        {/* RECHERCHE + FILTRES */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Rechercher un article, auteur, categorie..."
            className="input input-bordered flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-bordered w-full md:w-48"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "ancien" | "commentaires")}
          >
            <option value="recent">Plus recents</option>
            <option value="ancien">Plus anciens</option>
            <option value="commentaires">Plus commentes</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ARTICLES */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory ? selectedCategory : "Toutes les analyses"}
                <span className="badge badge-neutral ml-3">{filtered.length}</span>
              </h2>
              {(selectedCategory || search) && (
                <button
                  onClick={() => { setSelectedCategory(null); setSearch(""); }}
                  className="btn btn-ghost btn-sm"
                >
                  Reinitialiser
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton h-72 w-full rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="alert alert-info">
                <span>Aucun article trouve pour "{search}"</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-72">
            <Sidebar
              onSelectCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>

        </div>
      </div>
    </div>
  );
}