export interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  price: string;
  change: string;
  positive: boolean;
  comments: Comment[];
}

export const CATEGORIES: string[] = [
  "Analyse de marche",
  "Crypto",
  "Actions",
  "Forex",
  "Matieres premieres",
  "Economie mondiale"
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Bitcoin en 2026 : institutionnalisation massive et nouvelle norme",
    author: "Moussa Diallo",
    category: "Crypto",
    date: "15 Jan 2026",
    excerpt: "Apres l'halving de 2024 et l'approbation des ETF, le Bitcoin est desormais un actif institutionnel a part entiere. Analyse de la nouvelle donne.",
    content: `Le Bitcoin a profondement change de nature en 2025-2026. Ce n'est plus simplement un actif speculatif reserve aux enthousiastes de la technologie, c'est desormais une classe d'actifs a part entiere dans les portefeuilles institutionnels.\n\nLes ETF Bitcoin spot americains ont accumule plus de 150 milliards de dollars d'actifs sous gestion en moins de deux ans. BlackRock, Fidelity et Vanguard proposent desormais une exposition Bitcoin dans leurs fonds de retraite.\n\nL'halving d'avril 2024 a reduit l'emission de nouveaux bitcoins a 3,125 BTC par bloc. Combine a la demande institutionnelle croissante, cela a cree une pression haussiere structurelle.\n\nLes analystes de JPMorgan estiment que le Bitcoin pourrait atteindre 150 000 dollars d'ici fin 2026, soutenu par la reduction de l'offre et l'adoption institutionnelle continue.\n\nObjectif court terme : 115 000 dollars. Support cle a surveiller : 95 000 dollars.`,
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
    price: "108,450",
    change: "+3.24",
    positive: true,
    comments: [
      { id: 1, author: "Aminata K.", text: "L'institutionnalisation change tout pour la volatilite !", date: "16 Jan 2026" },
      { id: 2, author: "Youssef A.", text: "BlackRock dans le Bitcoin, qui l'aurait cru en 2020 ?", date: "17 Jan 2026" }
    ]
  },
  {
    id: 2,
    title: "Nvidia apres le boom de 2025 : bulle ou nouvelle norme ?",
    author: "Amina Kone",
    category: "Actions",
    date: "20 Jan 2026",
    excerpt: "Apres une hausse de 800% en deux ans, l'action Nvidia consolide. Est-ce une pause saine ou le debut d'une correction majeure ?",
    content: `Nvidia a ete l'action de la decennie entre 2023 et 2025. La demande explosive pour ses puces GPU dans l'entrainement des modeles d'intelligence artificielle a propulse le titre de 150 dollars a plus de 1 400 dollars.\n\nMais depuis le debut 2026, le titre consolide autour de 950 dollars. Les investisseurs s'interrogent : est-ce une pause technique avant une nouvelle hausse, ou le debut d'une correction profonde ?\n\nLes arguments haussiers restent solides. La demande en infrastructure IA ne montre aucun signe de ralentissement. Microsoft, Google et Amazon continuent d'investir massivement dans leurs data centers.\n\nCependant, des risques emerent. AMD rattrape son retard avec ses puces MI300X. Les GAFAM developpent leurs propres puces maison (TPU chez Google, Trainium chez Amazon). La concurrence s'intensifie.\n\nNotre analyse technique indique un support solide a 880 dollars. En cas de rupture, le prochain support se situe a 750 dollars.`,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    price: "952.30",
    change: "-1.24",
    positive: false,
    comments: [
      { id: 1, author: "Ibrahim S.", text: "La concurrence d'AMD est serieuse cette fois.", date: "21 Jan 2026" },
      { id: 2, author: "Koffi A.", text: "Je reste long sur NVDA, l'IA est encore au debut.", date: "22 Jan 2026" }
    ]
  },
  {
    id: 3,
    title: "Marche du carbone : les nouvelles opportunites en Afrique de l'Ouest",
    author: "Boubacar Sawadogo",
    category: "Economie mondiale",
    date: "25 Jan 2026",
    excerpt: "Les credits carbone issus des forets tropicales africaines representent un marche de plusieurs milliards de dollars encore largement inexploite.",
    content: `Le marche volontaire du carbone connait une renaissance en 2026. Apres les scandales de 2023-2024 qui avaient ternie sa reputation, de nouveaux standards de verification ont redonner confiance aux investisseurs.\n\nL'Afrique de l'Ouest est particulierement bien positionnee. Le Senegal, la Cote d'Ivoire et le Ghana possedent d'immenses reserves forestieres generatrices de credits carbone de haute qualite.\n\nLe prix de la tonne de CO2 sur le marche volontaire a rebondi de 5 dollars en 2024 a plus de 25 dollars en 2026. Les projets REDD+ attirent des capitaux europeens et americains.\n\nPour les investisseurs, plusieurs ETF thematiques permettent desormais d'acceder a ce marche. Les obligations vertes emises par la BOAD offrent egalement une exposition interessante.\n\nLe potentiel de l'Afrique subsaharienne est estime a 1,5 milliard de tonnes de credits carbone par an, soit un marche potentiel de 37 milliards de dollars.`,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800",
    price: "N/A",
    change: "+4.10",
    positive: true,
    comments: [
      { id: 1, author: "Fatou D.", text: "Sujet crucial pour le developpement durable africain !", date: "26 Jan 2026" }
    ]
  },
  {
    id: 4,
    title: "EUR/USD : vers la parite en 2026 ?",
    author: "Sophie Leroy",
    category: "Forex",
    date: "1 Fev 2026",
    excerpt: "La divergence des politiques monetaires entre la Fed et la BCE pousse l'euro vers ses plus bas historiques. Analyse et perspectives.",
    content: `L'euro continue de souffrir face au dollar americain en ce debut 2026. La paire EUR/USD evolue desormais autour de 1.02, dangereusement proche de la parite symbolique.\n\nLa Fed maintient ses taux a 4.75% malgre les signes de ralentissement economique, soutenue par une inflation residuelle dans les services. La BCE, elle, a deja effectue trois baisses de taux depuis septembre 2025, pesant sur l'euro.\n\nL'economie allemande, locomotive historique de la zone euro, traverse sa troisieme annee de recession technique. La crise de l'industrie automobile et la dependance aux exportations chinoises fragilisent la croissance europeenne.\n\nTechniquement, le niveau 1.02 constitue un support majeur. En cas de rupture, la parite EUR/USD devient un scenario probable d'ici le second trimestre 2026.\n\nStrategie recommandee : position courte sur EUR/USD avec un stop-loss a 1.045 et un objectif a 1.00.`,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
    price: "1.0198",
    change: "-0.67",
    positive: false,
    comments: [
      { id: 1, author: "Moussa D.", text: "La parite est desormais probable selon moi.", date: "2 Fev 2026" }
    ]
  },
  {
    id: 5,
    title: "Or : cap sur les 3 000 dollars l'once en 2026",
    author: "Oumar Traore",
    category: "Matieres premieres",
    date: "5 Fev 2026",
    excerpt: "Le metal precieux confirme son statut de valeur refuge dans un monde multipolaire. Les banques centrales achettent massivement.",
    content: `L'or a franchi le cap symbolique des 2 900 dollars l'once en janvier 2026, et les analystes s'accordent a dire que les 3 000 dollars sont desormais a portee.\n\nLes banques centrales des pays emergents, menees par la Chine, l'Inde et la Russie, continuent d'accumuler de l'or pour reduire leur dependance au dollar. En 2025, elles ont achete un record de 1 200 tonnes.\n\nLa dedollarisation progressive de l'economie mondiale est un moteur structurel pour l'or. Les pays du BRICS+ travaillent activement a la creation d'une monnaie de reserve alternative adossee en partie a l'or.\n\nL'incertitude geopolitique persistante, les deficits budgetaires records aux Etats-Unis et en Europe, et la baisse progressive des taux directeurs constituent un cocktail favorable pour le metal jaune.\n\nObjectif 2026 : 3 200 dollars l'once. Support cle : 2 750 dollars.`,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800",
    price: "2,912",
    change: "+2.14",
    positive: true,
    comments: [
      { id: 1, author: "Aminata K.", text: "3000 dollars c'est une question de semaines !", date: "6 Fev 2026" },
      { id: 2, author: "Koffi A.", text: "Les banques centrales ne mentent pas.", date: "7 Fev 2026" }
    ]
  },
  {
    id: 6,
    title: "Bilan 2025 / Perspectives 2026 : ce que les marches nous reservent",
    author: "Lea Martin",
    category: "Analyse de marche",
    date: "10 Fev 2026",
    excerpt: "2025 a ete l'annee de l'IA et des crypto. 2026 sera-t-elle celle de la correction ou de la consolidation ? Notre analyse complete.",
    content: `2025 restera dans les annales comme une annee exceptionnelle pour les marches financiers. Le S&P 500 a gagne 28%, le Bitcoin a atteint 150 000 dollars, et Nvidia est devenue brievement la premiere capitalisation mondiale.\n\nMais 2026 s'annonce plus complexe. Les valorisations des valeurs technologiques americaines sont historiquement elevees. Le ratio P/E du Nasdaq depasse 35, un niveau qui historiquement precede des corrections significatives.\n\nCependant, plusieurs facteurs soutiennent les marches. Les banques centrales entrent dans un cycle d'assouplissement monetaire. L'IA continue de transformer l'economie en profondeur. Les marches emergents, notamment en Afrique et en Asie du Sud-Est, offrent des opportunites de croissance.\n\nNotre allocation recommandee pour 2026 : 30% actions technologiques, 20% or et matieres premieres, 15% Bitcoin et crypto blue chips, 20% obligations d'Etat, 15% marches emergents africains.\n\nLa diversification reste la meilleure protection contre l'incertitude. Ne mettez jamais plus de 5% de votre patrimoine dans un seul actif.`,
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800",
    price: "N/A",
    change: "+1.50",
    positive: true,
    comments: [
      { id: 1, author: "Ibrahim S.", text: "Excellente synthese, merci pour cette analyse !", date: "11 Fev 2026" },
      { id: 2, author: "Youssef A.", text: "L'allocation recommandee est tres interessante.", date: "12 Fev 2026" },
      { id: 3, author: "Fatou D.", text: "Les marches africains enfin mis en avant !", date: "13 Fev 2026" }
    ]
  }
];

export const TICKER_DATA = [
  { symbol: "BTC/USD", price: "108,450", change: "+3.24%" },
  { symbol: "ETH/USD", price: "4,120", change: "+1.87%" },
  { symbol: "CAC 40", price: "7,892", change: "+0.54%" },
  { symbol: "S&P 500", price: "6,234", change: "+0.87%" },
  { symbol: "NASDAQ", price: "21,456", change: "+1.23%" },
  { symbol: "EUR/USD", price: "1.0198", change: "-0.67%" },
  { symbol: "OR/USD", price: "2,912", change: "+2.14%" },
  { symbol: "NVDA", price: "952.30", change: "-1.24%" },
  { symbol: "AAPL", price: "245.80", change: "+0.43%" },
  { symbol: "PETROLE", price: "82.45", change: "+0.91%" },
];