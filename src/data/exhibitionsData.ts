export interface TradeShowEvent {
  id: string;
  title: string;
  year: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
  standNumber?: string;
  featured?: boolean;
  order?: number;
}

export const INITIAL_EXHIBITIONS: TradeShowEvent[] = [
  {
    id: "arabplast-2023",
    title: "ArabPlast Dubai",
    year: "2023",
    location: "Dubai World Trade Centre, UAE",
    category: "Middle East Flagship Exhibition",
    description: "Meeting international polymer converters, trading partners, and prime petrochemical refiners at the premier plastics & rubber summit in the Middle East.",
    imageUrl: "/images/hero/hero2.png",
    standNumber: "Hall 4, Stand B22",
    featured: true,
    order: 1,
  },
  {
    id: "plastindia-2023",
    title: "PlastIndia International Exhibition",
    year: "2023",
    location: "Pragati Maidan, New Delhi, India",
    category: "South Asia Premier Summit",
    description: "Engaging with high-volume Indian converters across woven sacks, flexible packaging, pipe extrusion, and automotive masterbatches.",
    imageUrl: "/images/hero/hero1.png",
    standNumber: "Hall 11, Stand C14",
    featured: true,
    order: 2,
  },
  {
    id: "k-trade-fair-2022",
    title: "K-Show (The World's No. 1 Trade Fair)",
    year: "2022",
    location: "Messe Düsseldorf, Germany",
    category: "Global Petrochemical Gathering",
    description: "Collaborating with European chemical manufacturers, testing circular polyolefin innovations, and establishing long-term off-take agreements.",
    imageUrl: "/images/hero/hero3.png",
    standNumber: "Hall 7.2, Stand D05",
    featured: true,
    order: 3,
  },
  {
    id: "chinaplas-2024",
    title: "CHINAPLAS International Exhibition",
    year: "2024",
    location: "National Exhibition and Convention Center, Shanghai, China",
    category: "Asia-Pacific Polymer Summit",
    description: "Expanding export channels and container shipping corridors for prime and near-prime polyolefins to Far East compounding and moulding converters.",
    imageUrl: "/images/hero/hero4.png",
    standNumber: "Hall 3.1, Stand F18",
    featured: true,
    order: 4,
  },
  {
    id: "arabplast-2025",
    title: "ArabPlast International Summit",
    year: "2025",
    location: "Dubai World Trade Centre, UAE",
    category: "Global Trade Desk Exhibition",
    description: "Showcasing National Polymers' expanded 500+ grade technical catalog, bonded JAFZA warehousing buffer inventory, and competitive CIF container freight solutions.",
    imageUrl: "/images/hero/hero5.png",
    standNumber: "Hall 5, Stand A08",
    featured: true,
    order: 5,
  },
  {
    id: "interplastica-2023",
    title: "Interplastica Eurasia",
    year: "2023",
    location: "Istanbul Expo Center, Turkey",
    category: "Eurasia & Mediterranean Trade Summit",
    description: "Strengthening supply lines into Turkish and European converting hubs for raffia, BOPP film, and injection moulding prime resins.",
    imageUrl: "/images/Product/p1.png",
    standNumber: "Hall 2, Stand E10",
    featured: false,
    order: 6,
  },
];
