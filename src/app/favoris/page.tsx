"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";
import ArticleCard from "../../components/ArticleCard";
import { ARTICLES } from "../../data/articles";

interface Note {
  articleId: number;
  text: string;
}

export default function Favoris() {
  const [favoris, setFavoris] = useState<number[]>([1, 4, 5]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<string>("");

  const favArticles = ARTICLES.filter((a) => favoris.includes(a.id));

  const removeFavori = (id: number) => {
    setFavoris((prev) => prev.filter((f) => f !== id));
    setNotes((prev) => prev.filter((n) => n.articleId !== id));
  };

  const getNote = (id: number) => notes.find((n) => n.articleId === id)?.text || "";

  const saveNote = (id: number) => {
    setNotes((prev) => {
      const exists = prev.find((n) => n.articleId === id);
      if (exists) {
        return prev.map((n) => n.articleId === id ? { ...n, text: noteText } : n);
      }
      return [...prev, { articleId: id, text: noteText }];
    });
    setEditingNote(null);
    setNoteText("");
  };

  const startEdit = (id: number) => {
    setEditingNote(id);
    setNoteText(getNote(id));
  };

  const recentAuthors = [...new Set(favArticles.map((a) => a.author))];

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Mes Favoris</h1>
            <p className="text-base-content/50 mt-1">
              {favArticles.length} article{favArticles.length > 1 ? "s" : ""} sauvegarde{favArticles.length > 1 ? "s" : ""}
            </p>
          </div>
          {favoris.length > 0 && (
            <button
              className="btn btn-ghost btn-sm text-error"
              onClick={() => { setFavoris([]); setNotes([]); }}
            >
              Tout supprimer
            </button>
          )}
        </div>

        {favArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">⭐</p>
            <h2 className="text-2xl font-bold mb-2">Aucun favori</h2>
            <p className="text-base-content/50 mb-6">
              Ajoutez des articles a vos favoris pour les retrouver ici.
            </p>
            <a href="/" className="btn btn-warning">
              Decouvrir des articles
            </a>
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Articles sauvegardes", value: favArticles.length },
                { label: "Categories", value: [...new Set(favArticles.map((a) => a.category))].length },
                { label: "Auteurs suivis", value: recentAuthors.length },
                { label: "Notes prises", value: notes.filter((n) => n.text).length },
              ].map((s) => (
                <div key={s.label} className="card bg-base-100 shadow p-4 border border-base-300 text-center">
                  <p className="text-2xl font-bold text-yellow-400">{s.value}</p>
                  <p className="text-xs text-base-content/50 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* AUTEURS SUIVIS */}
            <div className="card bg-base-100 shadow border border-base-300 p-4 mb-8">
              <h3 className="font-bold text-yellow-400 mb-3 text-sm uppercase tracking-wider">
                Auteurs suivis
              </h3>
              <div className="flex flex-wrap gap-3">
                {recentAuthors.map((author) => {
                  const hasNew = favArticles.find((a) => a.author === author && a.date.includes("2026"));
                  return (
                    <div key={author} className="flex items-center gap-2 bg-base-200 rounded-full px-4 py-2">
                      <div className="w-7 h-7 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center">
                        {author.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{author}</span>
                      {hasNew && (
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Nouvel article" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ARTICLES FAVORIS AVEC NOTES */}
            <h2 className="text-xl font-bold mb-4">Mes articles</h2>
            <div className="space-y-6">
              {favArticles.map((article) => (
                <div key={article.id}>
                  <div className="relative">
                    <ArticleCard article={article} />
                    <button
                      className="absolute top-3 right-3 btn btn-xs btn-error"
                      onClick={() => removeFavori(article.id)}
                    >
                      Retirer
                    </button>
                  </div>

                  {/* NOTE PERSONNELLE */}
                  <div className="card bg-base-100 border border-base-300 border-t-0 rounded-t-none p-4">
                    {editingNote === article.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="textarea textarea-bordered w-full text-sm"
                          rows={2}
                          placeholder="Ex: A relire avant l'ouverture de Wall Street..."
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            className="btn btn-warning btn-xs"
                            onClick={() => saveNote(article.id)}
                          >
                            Sauvegarder
                          </button>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => setEditingNote(null)}
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex items-start gap-3 cursor-pointer group"
                        onClick={() => startEdit(article.id)}
                      >
                        <span className="text-yellow-400 text-sm mt-0.5">📝</span>
                        <p className={`text-sm flex-1 ${getNote(article.id) ? "text-base-content/80" : "text-base-content/30 italic"}`}>
                          {getNote(article.id) || "Ajouter une note personnelle..."}
                        </p>
                        <span className="text-xs text-base-content/30 group-hover:text-yellow-400 transition-colors">
                          Modifier
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SUGGESTIONS */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Suggestions pour vous</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ARTICLES.filter((a) => !favoris.includes(a.id)).slice(0, 3).map((article) => (
                  <div key={article.id} className="card bg-base-100 shadow border border-base-300 hover:border-yellow-400 transition-all p-4">
                    <span className="badge badge-warning text-xs mb-2">{article.category}</span>
                    <h3 className="font-bold text-sm hover:text-yellow-400 transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-xs text-base-content/50 mt-1">{article.author}</p>
                    <div className="flex justify-between items-center mt-3">
                      <a href={`/article/${article.id}`} className="btn btn-xs btn-ghost">
                        Lire
                      </a>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => setFavoris([...favoris, article.id])}
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}