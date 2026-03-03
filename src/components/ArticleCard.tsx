"use client";

import Link from "next/link";
import { useState } from "react";
import { Article } from "../data/articles";

interface Props {
  article: Article;
}

function getReadTime(content: string): number {
  return Math.ceil(content.split(" ").length / 200);
}

export default function ArticleCard({ article }: Props) {
  const [isFav, setIsFav] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(Math.floor(Math.random() * 50) + 10);
  const [liked, setLiked] = useState<boolean>(false);
  const readTime = getReadTime(article.content);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div
      className="card bg-base-100 border border-base-300 hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
      style={{
        boxShadow: "0 0 0 0 transparent",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(41, 98, 255, 0.3), 0 0 40px rgba(41, 98, 255, 0.1)";
        e.currentTarget.style.borderColor = "#2962ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
        e.currentTarget.style.borderColor = "";
      }}
    >
      <figure className="relative overflow-hidden h-52">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* BOUTON FAVORI */}
        <button
          className="absolute top-3 left-3 btn btn-xs btn-circle bg-black/50 border-0 hover:bg-yellow-400 hover:text-black transition-all"
          onClick={(e) => {
            e.preventDefault();
            setIsFav(!isFav);
          }}
        >
          {isFav ? "★" : "☆"}
        </button>

        {/* PRIX */}
        {article.price !== "N/A" && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 border border-yellow-400/30">
            <span className="text-yellow-400 font-bold text-sm">{article.price}</span>
            <span className={`ml-2 text-xs font-bold ${article.positive ? "text-green-400" : "text-red-400"}`}>
              {article.positive ? "▲" : "▼"} {article.change}%
            </span>
          </div>
        )}

        {/* BADGE CATÉGORIE */}
        <div className="absolute bottom-3 left-3">
          <span className="badge badge-warning text-xs font-bold">{article.category}</span>
        </div>

        {/* COMMENTAIRES */}
        <div className="absolute bottom-3 right-3">
          <span className="badge badge-ghost text-xs bg-black/50">
            💬 {article.comments.length}
          </span>
        </div>
      </figure>

      <div className="card-body p-5">
        {/* DATE + TEMPS DE LECTURE */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-base-content/40">{article.date}</span>
          <span className="text-xs text-base-content/40">⏱ {readTime} min de lecture</span>
        </div>

        {/* TITRE */}
        <h2 className="font-bold text-base leading-snug group-hover:text-yellow-400 transition-colors mt-1">
          {article.title}
        </h2>

        {/* EXTRAIT */}
        <p className="text-sm text-base-content/80 line-clamp-2 mt-1">{article.excerpt}</p>

        {/* AUTEUR + LIKE + BOUTON */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-base-300">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center">
              {article.author.charAt(0)}
            </div>
            <span className="text-xs text-base-content/70">{article.author}</span>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-all ${liked ? "text-red-400" : "text-base-content/40 hover:text-red-400"}`}
            >
              {liked ? "❤️" : "🤍"} {likes}
            </button>
          </div>
          <Link href={`/article/${article.id}`} className="btn btn-warning btn-xs">
            Lire →
          </Link>
        </div>
      </div>
    </div>
  );
}