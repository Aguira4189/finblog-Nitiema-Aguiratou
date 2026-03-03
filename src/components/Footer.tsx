import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-100 border-t border-base-300 mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">FinBlog</h2>
            <p className="text-sm text-base-content/50">Le media de reference pour les analyses financieres.</p>
            <div className="flex gap-2 mt-4">
              <a href="#" className="btn btn-xs btn-ghost border border-base-300">Twitter</a>
              <a href="#" className="btn btn-xs btn-ghost border border-base-300">LinkedIn</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase mb-4 text-yellow-400">Rubriques</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-base-content/50 hover:text-yellow-400">Accueil</Link></li>
              <li><Link href="/marches" className="text-sm text-base-content/50 hover:text-yellow-400">Marches</Link></li>
              <li><Link href="/bourses" className="text-sm text-base-content/50 hover:text-yellow-400">Bourses</Link></li>
              <li><Link href="/actualites" className="text-sm text-base-content/50 hover:text-yellow-400">Actualites</Link></li>
              <li><Link href="/graphiques" className="text-sm text-base-content/50 hover:text-yellow-400">Graphiques</Link></li>
              <li><Link href="/favoris" className="text-sm text-base-content/50 hover:text-yellow-400">Favoris</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase mb-4 text-yellow-400">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-base-content/50 hover:text-yellow-400">Crypto</a></li>
              <li><a href="#" className="text-sm text-base-content/50 hover:text-yellow-400">Actions</a></li>
              <li><a href="#" className="text-sm text-base-content/50 hover:text-yellow-400">Forex</a></li>
              <li><a href="#" className="text-sm text-base-content/50 hover:text-yellow-400">Matieres premieres</a></li>
              <li><a href="#" className="text-sm text-base-content/50 hover:text-yellow-400">Economie mondiale</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase mb-4 text-yellow-400">Marches</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-base-content/50">BTC/USD</span>
                <span className="text-green-400 font-bold">+ 102,450</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-base-content/50">ETH/USD</span>
                <span className="text-green-400 font-bold">+ 3,842</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-base-content/50">CAC 40</span>
                <span className="text-red-400 font-bold">- 7,248</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-base-content/50">Or</span>
                <span className="text-green-400 font-bold">+ 2,789</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-base-content/50">EUR/USD</span>
                <span className="text-red-400 font-bold">- 1.0312</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-base-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
  
          <div className="flex gap-4">
            <a href="#" className="text-xs text-base-content/40 hover:text-yellow-400">Mentions legales</a>
            <a href="#" className="text-xs text-base-content/40 hover:text-yellow-400">Confidentialite</a>
            <a href="#" className="text-xs text-base-content/40 hover:text-yellow-400">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}