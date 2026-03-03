"use client";

import { useState, useRef, useEffect } from "react";
import { ARTICLES } from "../data/articles";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant financier IA. Posez-moi des questions sur les marches, les articles ou la finance en general !",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const articlesContext = ARTICLES.map((a) =>
    `Article: "${a.title}" par ${a.author} (${a.category}, ${a.date}). Resume: ${a.excerpt}`
  ).join("\n");

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Tu es un assistant financier expert pour le blog FinBlog. Tu reponds en francais de facon concise et professionnelle. Tu as acces aux articles suivants du blog:\n\n${articlesContext}\n\nReponds aux questions sur les marches financiers, la crypto, le forex, les actions et l'economie. Si on te pose une question sur un article specifique, utilise les informations disponibles.`,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "Desolee, je n'ai pas pu generer une reponse.";
      setMessages([...newMessages, { role: "assistant", content: text }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Erreur de connexion. Veuillez reessayer." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* BOUTON FLOTTANT */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 btn btn-warning btn-circle shadow-2xl z-50 text-xl"
        style={{
          boxShadow: open ? "0 0 20px rgba(41, 98, 255, 0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* FENETRE CHAT */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-base-100 rounded-2xl shadow-2xl border border-base-300 z-50 flex flex-col"
          style={{ height: "500px" }}
        >
          {/* HEADER */}
          <div className="p-4 border-b border-base-300 rounded-t-2xl bg-yellow-400 text-black">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-sm">Assistant FinBlog IA</h3>
                <p className="text-xs opacity-70">Analyse financiere en temps reel</p>
              </div>
              <span className="ml-auto badge badge-success badge-xs">En ligne</span>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-yellow-400 text-black rounded-br-none"
                      : "bg-base-200 text-base-content rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-base-200 rounded-2xl rounded-bl-none px-4 py-2">
                  <span className="loading loading-dots loading-sm text-yellow-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTIONS RAPIDES */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1">
              {[
                "Analyse Bitcoin 2026",
                "Objectif cours Nvidia ?",
                "Meilleur actif refuge ?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="btn btn-xs btn-ghost border border-base-300 text-xs"
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div className="p-4 border-t border-base-300">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Posez votre question..."
                className="input input-bordered input-sm flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="btn btn-warning btn-sm"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "→"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}