export interface NavSubItem {
  name: string;
  href: string;
  desc?: string;
  badge?: string;
}

export interface NavItem {
  name: string;
  href: string;
  subItems?: NavSubItem[];
  isCTA?: boolean;
}

export const MAIN_NAVIGATION: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Us",
    href: "/about",
    subItems: [
      { name: "About Company in Detail", href: "/about#about-detail", desc: "21 years of polymer trading excellence" },
      { name: "Vision, Mission & Values", href: "/about#vision-mission", desc: "Our core principles & future roadmap" },
      { name: "Why Choose Us", href: "/about#why-choose-us", desc: "Reliability, global pricing & logistics" },
      { name: "Global Supply Network", href: "/about#global-network", desc: "USA, Canada, Australia to 40+ countries" },
      { name: "Suppliers & Partners", href: "/about#suppliers-partners", desc: "Tier-1 petrochemical refiners" },
      { name: "Quality & Compliance", href: "/about#quality-compliance", desc: "ISO, REACH, RoHS & lab certified" },
      { name: "Sustainability", href: "/about#sustainability", desc: "PCR/PIR recycling & circular economy" },
      { name: "Leadership Team", href: "/about#team", desc: "Experienced polymer traders & logisticians" },
    ],
  },
  {
    name: "Products",
    href: "/products",
    subItems: [
      { name: "PP (Polypropylene)", href: "/products/pp", desc: "Homo, Copo, Random & Impact grades", badge: "Core" },
      { name: "PE (Polyethylene)", href: "/products/pe", desc: "HDPE, LDPE, LLDPE, mLLDPE resins", badge: "Core" },
      { name: "PVC (Polyvinyl Chloride)", href: "/products/pvc", desc: "Suspension K57, K67, K70 & Emulsion" },
      { name: "PET (Polyethylene Terephthalate)", href: "/products/pet", desc: "Bottle & film grade chips" },
      { name: "PS (Polystyrene)", href: "/products/ps", desc: "GPPS & HIPS injection/extrusion" },
      { name: "Engineering Plastics", href: "/products/engineering-plastics", desc: "ABS, PC, POM, PA6, PA66 compounds" },
      { name: "Masterbatch / Additives", href: "/products/masterbatch-additives", desc: "White, Black, Color, UV & Slip" },
      { name: "Recycled Granules", href: "/products/recycled", desc: "PCR / PIR washed & pelletized resins", badge: "Eco" },
      { name: "Near Prime Resins", href: "/products/near-prime", desc: "Slight spec variance at competitive rates" },
      { name: "Off Grade / Off Spec", href: "/products/off-grade", desc: "Economic resins, lot leftovers & lumps" },
    ],
  },
  {
    name: "Applications",
    href: "/applications",
    subItems: [
      { name: "Film & Packaging", href: "/applications#film-packaging", desc: "BOPP, stretch film, shrink wrap, liners" },
      { name: "Raffia & Woven", href: "/applications#raffia-woven", desc: "FIBC bags, cement sacks, geotextiles" },
      { name: "Injection Molding", href: "/applications#injection-molding", desc: "Caps, closures, crates, housewares" },
      { name: "Blow Molding", href: "/applications#blow-molding", desc: "L-ring drums, jerrycans, bottles" },
      { name: "Pipes & Profiles", href: "/applications#pipes-profiles", desc: "PE100 pressure pipes, conduit, profiles" },
      { name: "Automotive & Consumer", href: "/applications#automotive-consumer", desc: "Bumpers, dashboards, appliances" },
      { name: "Agriculture & Industrial", href: "/applications#agriculture-industrial", desc: "Drip laterals, mulching, tarpaulins" },
    ],
  },
  {
    name: "Solutions",
    href: "/solutions",
    subItems: [
      { name: "Prime Supply", href: "/solutions/prime-supply", desc: "Guaranteed producer prime allocations" },
      { name: "Alternative Materials", href: "/solutions/alternative-materials", desc: "Cost-optimized drop-in replacements" },
      { name: "Recycled Materials", href: "/solutions/recycled-materials", desc: "Sustainable PCR/PIR supply streams" },
      { name: "Grade Matching", href: "/solutions/grade-matching", desc: "MFI, density & processing optimization" },
      { name: "Global Sourcing", href: "/solutions/global-sourcing", desc: "Direct procurement across 4 continents" },
      { name: "Supply Chain Solutions", href: "/solutions/supply-chain-solutions", desc: "Container shipping, port clearance & CIF" },
    ],
  },
  {
    name: "Markets",
    href: "/markets",
    subItems: [
      { name: "Middle East", href: "/markets#middle-east", desc: "UAE, Saudi Arabia, Oman, Qatar, Kuwait" },
      { name: "Indian Subcontinent", href: "/markets#indian-subcontinent", desc: "India, Pakistan, Bangladesh, Sri Lanka" },
      { name: "Africa", href: "/markets#africa", desc: "Egypt, Kenya, Nigeria, South Africa, Ghana" },
      { name: "Europe", href: "/markets#europe", desc: "Turkey, Poland, Italy, Germany, Spain" },
      { name: "Latin America", href: "/markets#latin-america", desc: "Brazil, Colombia, Mexico, Chile, Peru" },
    ],
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
  {
    name: "Enquiry Form",
    href: "/enquiry",
    isCTA: true,
  },
];
