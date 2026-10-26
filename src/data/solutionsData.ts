export interface SolutionDetail {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  problemSolved: string;
  howItWorks: string[];
  keyBenefits: string[];
  supportedPolymers: string[];
  icon: string;
  imageUrl: string;
}

export const SOLUTIONS_DATA: SolutionDetail[] = [
  {
    slug: "prime-supply",
    title: "Prime Supply Programs",
    tagline: "Direct Allocations from Global Petrochemical Majors with Guaranteed Lot Consistency",
    summary:
      "National Polymers maintains long-term distribution agreements and quota allocations with leading petrochemical refineries across the Middle East, North America, and Asia. We ensure steady supply security, predictable delivery schedules, and authentic manufacturer Certificates of Analysis (COA).",
    problemSolved:
      "Eliminates plant shutdowns caused by spot shortages, quota cancellations, and volatile spot resin spikes in local markets.",
    howItWorks: [
      "Annual and quarterly volume booking with transparent formula or fixed indexing.",
      "Direct factory loading into 20ft / 40ft sea containers with moisture-sealed original packaging.",
      "Real-time shipment tracking from origin port to destination terminal with pre-cleared customs documentation.",
    ],
    keyBenefits: [
      "100% Guaranteed Prime Quality with OEM warranty support",
      "Priority allocation during peak petrochemical turnaround periods",
      "Flexible financing terms for credit-verified converters",
    ],
    supportedPolymers: ["HDPE", "LDPE", "LLDPE", "PP Homo/Copo", "PVC", "PET"],
    icon: "verified",
    imageUrl: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fwhy_choose_us_img1.jpg&w=1024&q=80",
  },
  {
    slug: "alternative-materials",
    title: "Alternative Materials & Cost Engineering",
    tagline: "Drop-In Resin Replacements that Slash Material Costs by 12% to 25% without Compromising Quality",
    summary:
      "Converters often over-specify polymer grades out of habit. Our polymer application engineers evaluate your finished part performance requirements and propose equivalent Near-Prime, wide-spec, or hybrid copolymer formulations that reduce per-ton resin spend while maintaining mechanical specs and cycle times.",
    problemSolved:
      "Helps converters maintain profit margins in hyper-competitive bidding environments and during high raw material inflation.",
    howItWorks: [
      "Submit sample or current technical data sheet (TDS) of your incumbent resin.",
      "Our lab conducts MFI, density, DSC melting curve, and tensile comparison.",
      "We provide 250 kg trial sample with on-site technician extrusion guidance.",
    ],
    keyBenefits: [
      "Immediate 12% to 25% unit cost reduction",
      "Zero tooling or mould modifications required",
      "Preserves cycle speed and part yield",
    ],
    supportedPolymers: ["Film Resins", "Blow Moulding Resins", "Injection Resins", "Pipe Compounds"],
    icon: "sync-alt",
    imageUrl: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fwhy_choose_us_img2.jpg&w=1024&q=80",
  },
  {
    slug: "recycled-materials",
    title: "Circular & Recycled Materials Integration",
    tagline: "High Purity PCR & PIR Resins to Satisfy Mandates and ESG Corporate Commitments",
    summary:
      "With international mandates imposing minimum 20% - 30% recycled content in packaging and consumer products, National Polymers provides consistent, deodorized, hot-washed post-consumer (PCR) and post-industrial (PIR) granules.",
    problemSolved:
      "Solves the two biggest barriers to recycled resins: batch-to-batch inconsistency and processing contamination.",
    howItWorks: [
      "Rigid source sorting and optical NIR separation of polymer streams.",
      "High-vacuum degassing and melt filtration down to 100-mesh.",
      "Controlled melt index blending for consistent processing rheology.",
    ],
    keyBenefits: [
      "Meets European, UAE, and global plastic tax exemption thresholds",
      "Certified recycled content documentation with full audit trail",
      "Low odor, food-contact grade options available",
    ],
    supportedPolymers: ["rHDPE Pellets", "rLLDPE Film Resins", "rPP Pellets", "rPET Flakes"],
    icon: "eco",
    imageUrl: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fwhy_choose_us_img3.jpg&w=1024&q=80",
  },
  {
    slug: "grade-matching",
    title: "Technical Grade Matching & Lab Optimization",
    tagline: "Expert Polymer Rheology Matching for Problem-Free Machine Processing",
    summary:
      "Experiencing bubble instability on blown film lines, stress cracking in blow moulded jerrycans, or sink marks in thick injection parts? Our polymer chemists analyze rheology curves and suggest optimal grade blends.",
    problemSolved:
      "Eliminates trial-and-error costs, high scrap rates, and machine downtime caused by misaligned resin properties.",
    howItWorks: [
      "Comprehensive rheological testing including Melt Flow Index, density, and molecular weight distribution (MWD).",
      "Identification of bottleneck in cooling, shear rate, or environmental stress cracking resistance (ESCR).",
      "Formulation of resin blend or tailored processing aid (PPA) masterbatch recommendation.",
    ],
    keyBenefits: [
      "Reduced scrap rate on manufacturing floor by up to 40%",
      "Faster cycle times and enhanced dimensional stability",
      "Complimentary lab analysis for active contract partners",
    ],
    supportedPolymers: ["BOPP", "PE100 Pipes", "High Speed Thin-Wall Moulding", "Multilayer Barrier Films"],
    icon: "science",
    imageUrl: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fwhy_choose_us_img4.jpg&w=1024&q=80",
  },
  {
    slug: "global-sourcing",
    title: "Global Sourcing & Arbitrage Procurement",
    tagline: "Exploiting International Petrochemical Price Spreads to Deliver Maximum Value",
    summary:
      "Petrochemical prices fluctuate across regions due to feedstock differentials (shale gas in North America vs naphtha in Asia/Europe). With active trading desks in Dubai and sourcing partners in the USA, Canada, Australia, and Far East, National Polymers arbitrages regional spreads to give our clients the most advantageous landed pricing.",
    problemSolved:
      "Shields converters from local supplier monopolies and non-competitive regional cartel pricing.",
    howItWorks: [
      "24/7 price monitoring across ICIS, Platts, and global polymer benchmarks.",
      "Bulk container procurement at peak discount windows.",
      "Strategic bonded warehouse buffering in Jebel Ali Free Zone, Dubai.",
    ],
    keyBenefits: [
      "Access to lowest global feedstock cost curves",
      "Complete shipping, insurance, and CIF delivery to 40+ countries",
      "Flexible multi-currency settlement (USD, AED, EUR)",
    ],
    supportedPolymers: ["All Commodity & Engineering Polymers"],
    icon: "public",
    imageUrl: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fproduct_img1.jpg&w=1024&q=80",
  },
  {
    slug: "supply-chain-solutions",
    title: "End-to-End Supply Chain & Port Logistics",
    tagline: "Ocean Freight, Customs Clearance, Bonded Warehousing & Just-In-Time Container Deliveries",
    summary:
      "Managing international freight for polymer containers can be daunting. National Polymers handles all logistics: ocean booking with top container lines (Maersk, MSC, CMA CGM), port clearance, duty optimization, and door delivery.",
    problemSolved:
      "Eliminates demurrage penalties, customs clearance delays, and supply chain bottlenecks at destination ports.",
    howItWorks: [
      "Pre-vessel booking with negotiated 21-day free detention terms at destination.",
      "Complete documentation: Bill of Lading, Certificate of Origin, Form E/FTA, and Inspection Certificates.",
      "Just-In-Time (JIT) trucking to customer warehouse from local bonded depots.",
    ],
    keyBenefits: [
      "Zero port demurrage risk with extended free time",
      "Door-to-door CIF/DAP delivery capability",
      "Real-time shipment tracking notifications via WhatsApp and email",
    ],
    supportedPolymers: ["All Resin Shipments (Containerized & Breakbulk)"],
    icon: "local-shipping",
    imageUrl: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fproduct_img2.jpg&w=1024&q=80",
  },
];
