"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LABELS: { [key: string]: string } = {
  "": "Accueil",
  marches: "Marches",
  bourses: "Bourses",
  actualites: "Actualites",
  graphiques: "Graphiques",
  favoris: "Favoris",
  create: "Publier",
  article: "Article",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="bg-base-100 border-b border-base-300 px-4 py-2">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-xs text-base-content/50">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            Accueil
          </Link>
          {segments.map((seg, i) => {
            const href = "/" + segments.slice(0, i + 1).join("/");
            const label = LABELS[seg] || seg;
            const isLast = i === segments.length - 1;
            return (
              <span key={href} className="flex items-center gap-2">
                <span className="text-base-content/30">›</span>
                {isLast ? (
                  <span className="text-yellow-400 font-medium">{label}</span>
                ) : (
                  <Link href={href} className="hover:text-yellow-400 transition-colors">
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}