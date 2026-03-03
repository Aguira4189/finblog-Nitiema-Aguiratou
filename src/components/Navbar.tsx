"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TICKER_DATA } from "../data/articles";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";

const NOTIFICATIONS = [
  { id: 1, text: "Bitcoin depasse les 108 000$", time: "Il y a 2min", read: false },
  { id: 2, text: "Nouvelle analyse publiee : CAC 40", time: "Il y a 15min", read: false },
  { id: 3, text: "Alerte : EUR/USD sous 1.02", time: "Il y a 1h", read: true },
  { id: 4, text: "Nvidia : resultats trimestriels ce soir", time: "Il y a 2h", read: true },
];

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  flash?: "up" | "down" | null;
}

export default function Navbar() {
  const [tickerPos, setTickerPos] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [search, setSearch] = useState<string>("");
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(
    TICKER_DATA.map((item) => ({ ...item, flash: null }))
  );
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // TICKER SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPos((prev) => (prev - 1) % 1000);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // TICKER FLASH EFFET
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tickerItems.length);
      const direction = Math.random() > 0.5 ? "up" : "down";

      setTickerItems((prev) =>
        prev.map((item, i) =>
          i === randomIndex ? { ...item, flash: direction } : item
        )
      );

      setTimeout(() => {
        setTickerItems((prev) =>
          prev.map((item, i) =>
            i === randomIndex ? { ...item, flash: null } : item
          )
        );
      }, 600);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/?search=${search}`);
      setSearch("");
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/marches", label: "Marches" },
    { href: "/bourses", label: "Bourses" },
    { href: "/actualites", label: "Actualites" },
    { href: "/graphiques", label: "Graphiques" },
    { href: "/favoris", label: "Favoris" },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* TICKER AVEC FLASH */}
      <div className="bg-neutral text-neutral-content overflow-hidden py-1 text-xs">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ transform: `translateX(${tickerPos}px)`, transition: "none" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex gap-2 items-center">
              <span className="font-bold text-yellow-400">{item.symbol}</span>
              <span
                className="transition-colors duration-300"
                style={{
                  color: item.flash === "up"
                    ? "#26a69a"
                    : item.flash === "down"
                    ? "#ef5350"
                    : "inherit",
                  textShadow: item.flash === "up"
                    ? "0 0 8px rgba(38, 166, 154, 0.8)"
                    : item.flash === "down"
                    ? "0 0 8px rgba(239, 83, 80, 0.8)"
                    : "none",
                }}
              >
                {item.price}
              </span>
              <span className={item.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar bg-base-100 shadow-lg px-4 border-b border-base-300">
        <div className="flex-none">
          <Link href="/" className="text-xl font-bold text-yellow-400 mr-4">
            FinBlog
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-1 flex-1">
  {navLinks.map((link) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className="btn btn-ghost btn-xs text-xs relative"
        style={{
          color: isActive ? "#2962ff" : "inherit",
          opacity: isActive ? 1 : 0.6,
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        {link.label}
        {isActive && (
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              height: "2px",
              width: "70%",
              backgroundColor: "#2962ff",
            }}
          />
        )}
      </Link>
    );
  })}
</div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex items-center relative">
            <span className="absolute left-3 text-base-content/40 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Rechercher..."
              className="input input-bordered input-sm w-52 pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <button className="btn btn-ghost btn-xs btn-circle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <div className="relative">
            <button
              className="btn btn-ghost btn-xs btn-circle"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 badge badge-error badge-xs text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-base-100 rounded-xl shadow-2xl border border-base-300 z-50">
                <div className="flex justify-between items-center p-4 border-b border-base-300">
                  <h3 className="font-bold">Notifications</h3>
                  <button className="btn btn-xs btn-ghost" onClick={markAllRead}>
                    Tout lire
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 border-b border-base-300 hover:bg-base-200 transition-colors ${!n.read ? "border-l-2 border-l-yellow-400" : ""}`}
                    >
                      <p className={`text-sm ${!n.read ? "font-bold" : "text-base-content/60"}`}>
                        {n.text}
                      </p>
                      <p className="text-xs text-base-content/40 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/create" className="btn btn-warning btn-xs font-bold hidden md:flex">
            + Publier
          </Link>

          <button
            className="btn btn-ghost btn-xs lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="lg:hidden bg-base-100 border-b border-base-300 px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="btn btn-ghost btn-sm justify-start"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <input
            type="text"
            placeholder="Rechercher..."
            className="input input-bordered input-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Link href="/create" className="btn btn-warning btn-sm font-bold">
            + Publier une analyse
          </Link>
        </div>
      )}
    </div>
  );
}