export interface ProductDetail {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  overview: string[];
  specs: { property: string; value: string }[];
  subTypes: { name: string; mfi: string; density: string; useCase: string }[];
  applications: string[];
  packaging: string[];
  imageUrl: string;
}

export const PRODUCTS_DATA: ProductDetail[] = [
  {
    slug: "pp",
    name: "Polypropylene (PP)",
    category: "Commodity Thermoplastics",
    tagline: "Prime, Near-Prime & Off-Grade PP Homopolymer, Copolymer & Random Copolymer",
    description:
      "Polypropylene is a versatile thermoplastic polymer offering superior chemical resistance, high melting point, high tensile strength, and excellent fatigue resistance. National Polymers supplies prime grades from leading refiners as well as cost-effective near-prime and off-spec lots.",
    overview: [
      "Homo Polymer (PP Homo): High stiffness, high heat resistance, ideal for raffia, BOPP film, and injection moulding.",
      "Block Copolymer (PP Copo / Impact Copo): Enhanced impact strength at sub-zero temperatures, ideal for automotive parts, battery casings, and heavy-duty pails.",
      "Random Copolymer (PP Random): Exceptional clarity, high gloss, and lower melting temperature, ideal for transparent food packaging, cosmetic bottles, and medical syringes.",
    ],
    specs: [
      { property: "Melt Flow Index (MFI)", value: "0.3 to 70 g/10 min (230°C / 2.16 kg)" },
      { property: "Density", value: "0.900 – 0.910 g/cm³" },
      { property: "Melting Point", value: "160°C – 168°C" },
      { property: "Tensile Strength at Yield", value: "25 – 38 MPa" },
      { property: "Flexural Modulus", value: "1100 – 1600 MPa" },
    ],
    subTypes: [
      { name: "PP Raffia Grade", mfi: "2.5 – 3.8", density: "0.905", useCase: "Woven sacks, FIBC jumbo bags, monofilament, ropes" },
      { name: "PP Injection Grade", mfi: "10 – 35", density: "0.905", useCase: "Housewares, thin-wall food containers, caps & closures" },
      { name: "PP Film Grade (BOPP / TQ)", mfi: "2.0 – 8.0", density: "0.902", useCase: "Biaxially oriented films, snack packaging, tapes" },
      { name: "PP Thermoforming", mfi: "1.2 – 2.0", density: "0.904", useCase: "Disposable drinking cups, trays, lids" },
    ],
    applications: [
      "Flexible & rigid packaging",
      "Woven sacks and geotextile fabrics",
      "Automotive components (bumpers, trims)",
      "Household items, furniture, and luggage",
      "Medical devices & laboratory disposables",
    ],
    packaging: ["25 kg PP Valve/PE Bags", "1000 kg FIBC Jumbo Bags", "Bulk Container Liners"],
    imageUrl: "/images/Product/p1.png",
  },
  {
    slug: "pe",
    name: "Polyethylene (PE - HDPE / LDPE / LLDPE)",
    category: "Commodity Polyolefins",
    tagline: "Complete Spectrum of HDPE, LDPE, LLDPE & Metallocene Resins",
    description:
      "Polyethylene represents the largest volume polymer globally. National Polymers distributes top-tier prime and off-grade PE grades for blown film extrusion, blow moulding, pipe extrusion, and rotational moulding, sourced directly from SABIC, Borouge, ExxonMobil, and international producers.",
    overview: [
      "High Density Polyethylene (HDPE): High strength-to-density ratio, rigid, moisture-resistant, excellent stress crack resistance.",
      "Linear Low Density Polyethylene (LLDPE): Outstanding tensile strength, puncture resistance, and elongation for high-performance stretch and lamination films.",
      "Low Density Polyethylene (LDPE): Superior clarity, high flexibility, excellent sealability for general packaging and shrink films.",
    ],
    specs: [
      { property: "Melt Index (MI)", value: "0.05 to 50 g/10 min (190°C / 2.16 kg)" },
      { property: "Density Range", value: "0.915 – 0.965 g/cm³" },
      { property: "Melting Point", value: "110°C – 135°C" },
      { property: "ESCR (Environmental Stress Crack)", value: "F50 > 500 hours (Blow/Pipe grades)" },
      { property: "Elongation at Break", value: "> 600%" },
    ],
    subTypes: [
      { name: "HDPE Film Grade", mfi: "0.05 – 0.10", density: "0.952", useCase: "Shopping bags, grocery liners, heavy-duty sacks" },
      { name: "HDPE Blow Moulding", mfi: "0.20 – 0.35", density: "0.955", useCase: "Chemical jerrycans, detergent bottles, lube oil cans" },
      { name: "HDPE Pipe PE100", mfi: "0.25 (High Load)", density: "0.950", useCase: "Potable water, natural gas, irrigation piping" },
      { name: "LLDPE Butene / Hexene Film", mfi: "1.0 – 2.0", density: "0.918", useCase: "Cast stretch wrap, mulch films, liquid pouch packaging" },
      { name: "LDPE General Film", mfi: "2.0 – 4.0", density: "0.922", useCase: "Shrink hoods, garment bags, agricultural greenhouse films" },
    ],
    applications: [
      "Blown film & cast stretch wrapping",
      "Extrusion blow moulding of containers",
      "Pressure pipes & electrical conduits",
      "Rotomoulded water storage tanks",
      "Wire & cable insulation jackets",
    ],
    packaging: ["25 kg standard PE bags", "Sea container bulk bags", "1100 kg wooden pallets"],
    imageUrl: "/images/Product/p2.png",
  },
  {
    slug: "pvc",
    name: "Polyvinyl Chloride (PVC Resin)",
    category: "Vinyl Polymers",
    tagline: "Suspension PVC (K57, K67, K70) & Emulsion Paste Resins",
    description:
      "PVC is a durable, chemically resistant, flame-retardant polymer widely used in construction, infrastructure, and healthcare. National Polymers stocks prime suspension grades from Formosa, LG Chem, Hanwha, and global sources.",
    overview: [
      "PVC K67 (Most Popular): Ideal for rigid pipes, fittings, window profiles, and exterior cladding.",
      "PVC K57 / K58: Lower molecular weight for injection moulding of electrical conduit fittings and transparent rigid sheets.",
      "PVC K70: High molecular weight for flexible cables, medical tubing, synthetic leather, and gaskets.",
    ],
    specs: [
      { property: "K-Value", value: "57 to 70 (DIN 53726)" },
      { property: "Apparent Bulk Density", value: "0.52 – 0.58 g/ml" },
      { property: "Volatile Content", value: "< 0.3%" },
      { property: "Residual VCM", value: "< 1.0 ppm (Food / Pharma contact compliant)" },
    ],
    subTypes: [
      { name: "PVC Resin K67", mfi: "N/A (K-Value 67)", density: "1.40", useCase: "Pressure pipes, drainage pipes, window profiles" },
      { name: "PVC Resin K57", mfi: "N/A (K-Value 57)", density: "1.38", useCase: "Fittings, thermoforming blisters, shoe soles" },
      { name: "PVC Resin K70", mfi: "N/A (K-Value 70)", density: "1.42", useCase: "Cables, hoses, synthetic leather, wire compounding" },
    ],
    applications: [
      "Municipal water & sewage pipes",
      "Architectural window & door profiles",
      "Electrical cable insulation",
      "Vinyl floor tiles & wallpapers",
      "Medical blood bags & IV tubing",
    ],
    packaging: ["25 kg Kraft Paper Bags with PE liner", "1000 kg Big Bags"],
    imageUrl: "/images/Product/p3.png",
  },
  {
    slug: "pet",
    name: "Polyethylene Terephthalate (PET Resin)",
    category: "Polyesters",
    tagline: "Bottle Grade, Sheet Grade & Recycled rPET Flakes & Pellets",
    description:
      "PET resin is a crystal-clear, lightweight polyester offering superior barrier properties against oxygen, moisture, and carbon dioxide. Ideal for carbonated beverage bottles, mineral water packaging, thermoform sheets, and pharmaceutical containers.",
    overview: [
      "Water Bottle Grade (IV 0.80): High clarity, low acetaldehyde content, rapid cycle time.",
      "CSD Bottle Grade (IV 0.84 - 0.88): Enhanced mechanical strength and pressure containment for carbonated soft drinks.",
      "Hot Fill Grade (IV 0.78 - 0.82): Thermal resistance for pasteurized juices and sports beverages.",
    ],
    specs: [
      { property: "Intrinsic Viscosity (IV)", value: "0.78 to 0.88 dl/g" },
      { property: "Acetaldehyde Content", value: "< 1.0 ppm" },
      { property: "Melting Point", value: "245°C – 250°C" },
      { property: "Color (L* / b*)", value: "L* > 82, b* < 1.0" },
    ],
    subTypes: [
      { name: "PET Water Bottle Grade", mfi: "IV 0.80", density: "1.38", useCase: "Still water, edible oil, personal care bottles" },
      { name: "PET CSD Grade", mfi: "IV 0.84", density: "1.39", useCase: "Carbonated beverages, sparkling water, beer" },
      { name: "PET Thermoforming Sheet", mfi: "IV 0.76", density: "1.36", useCase: "Fruit punnets, blister packs, egg cartons" },
    ],
    applications: [
      "Beverage and mineral water packaging",
      "Edible oil and condiment containers",
      "Cosmetic jars and personal care packaging",
      "Thermoformed clamshells and fruit trays",
    ],
    packaging: ["1050 kg / 1100 kg Jumbo Bags", "Silotainer bulk delivery"],
    imageUrl: "/images/Product/p4.png",
  },
  {
    slug: "ps",
    name: "Polystyrene (PS - GPPS / HIPS)",
    category: "Styrenics",
    tagline: "General Purpose PS (GPPS) & High Impact PS (HIPS)",
    description:
      "Polystyrene resins provide outstanding surface gloss, rigidity, dimensional stability, and ease of processing. GPPS offers glass-like optical clarity, while HIPS is modified with polybutadiene rubber for robust impact strength.",
    overview: [
      "General Purpose Polystyrene (GPPS): High transparency, excellent rigidity, ideal for petri dishes, jewel cases, and cutlery.",
      "High Impact Polystyrene (HIPS): High toughness, matte or semi-gloss finish, ideal for refrigerator liners and electronics housings.",
      "Expandable Polystyrene (EPS): Insulation blocks and protective shock-absorbing packaging.",
    ],
    specs: [
      { property: "Melt Flow Rate (MFR)", value: "2.0 – 18 g/10 min (200°C / 5 kg)" },
      { property: "Density", value: "1.04 – 1.06 g/cm³" },
      { property: "Vicat Softening Temperature", value: "88°C – 102°C" },
      { property: "Izod Impact Strength (HIPS)", value: "80 – 120 J/m" },
    ],
    subTypes: [
      { name: "GPPS Clear Extrusion", mfi: "2.5 – 4.0", density: "1.04", useCase: "Diffuser sheets, picture frames, disposable cups" },
      { name: "GPPS Injection", mfi: "8.0 – 15.0", density: "1.05", useCase: "Cosmetic compacts, medical diagnostics, test tubes" },
      { name: "HIPS Extrusion Sheet", mfi: "2.5 – 4.5", density: "1.05", useCase: "Refrigerator liners, dairy cups, disposable trays" },
      { name: "HIPS Injection", mfi: "6.0 – 12.0", density: "1.06", useCase: "Television housings, toys, office stationery" },
    ],
    applications: [
      "Food service disposables & dairy packaging",
      "Consumer electronics & appliance housings",
      "Advertising displays & signage boards",
      "Laboratoryware & medical consumables",
    ],
    packaging: ["25 kg PE Bags", "1000 kg Jumbo Bags"],
    imageUrl: "/images/Product/p1.png",
  },
  {
    slug: "engineering-plastics",
    name: "Engineering Plastics (ABS, PC, POM, PA)",
    category: "High Performance Resins",
    tagline: "High Strength, Thermal Resistance & Specialized Compounds",
    description:
      "Engineering plastics deliver exceptional mechanical strength, heat resistance, chemical stability, and wear performance compared to commodity polymers. National Polymers supplies prime ABS, Polycarbonate, Polyamide (Nylon 6 / 66), and Polyoxymethylene (POM).",
    overview: [
      "ABS (Acrylonitrile Butadiene Styrene): Superb balance of impact, toughness, heat resistance, and electroplating capability.",
      "Polycarbonate (PC): High impact resistance, optical transparency, flame retardant ratings (UL94 V-0).",
      "Polyamide (PA6 / PA66): High tensile strength, wear resistance, glass-filled compounds for metal replacement.",
      "POM (Acetal / Polyacetal): Low friction, high dimensional precision, gear & bearing applications.",
    ],
    specs: [
      { property: "Tensile Modulus", value: "2200 – 9000 MPa (GF Reinforced)" },
      { property: "Heat Deflection Temp (HDT)", value: "100°C – 220°C" },
      { property: "Flammability Rating", value: "HB to UL94 V-0" },
    ],
    subTypes: [
      { name: "ABS Injection Natural / Black", mfi: "15 – 30", density: "1.05", useCase: "Automotive grilles, helmets, tool casings" },
      { name: "PC Optical & General Grade", mfi: "8 – 22", density: "1.20", useCase: "Safety goggles, LED lighting diffusers, headlamps" },
      { name: "PA6 / PA66 Glass Filled 30%", mfi: "Various", density: "1.36", useCase: "Under-the-hood auto parts, power tools, gears" },
      { name: "POM Copolymer", mfi: "9.0", density: "1.41", useCase: "Precision gears, conveyor chains, valves" },
    ],
    applications: [
      "Automotive exterior, interior and powertrain",
      "Power tool housings and industrial machinery",
      "Telecommunications and smart devices",
      "Aviation & defense hardware components",
    ],
    packaging: ["25 kg Aluminium Moisture-Barrier Bags", "Palletized units"],
    imageUrl: "/images/Product/p2.png",
  },
  {
    slug: "masterbatch-additives",
    name: "Masterbatch & Polymer Additives",
    category: "Performance Modifiers",
    tagline: "White, Black, Color, UV Stabilizers, Slip & Antiblock",
    description:
      "High-concentration color and additive masterbatches designed to optimize appearance, processing efficiency, and outdoor service life of end products.",
    overview: [
      "White Masterbatch (up to 75% TiO2): High opacity, brilliant whiteness, food contact approved.",
      "Black Masterbatch (up to 50% Carbon Black): High jetness, UV weatherability, pipe and drip lateral grades.",
      "Additive Masterbatch: Slip, Antiblock, Optical Brighteners, Antistatic, Desiccants, and Processing Aids (PPA).",
    ],
    specs: [
      { property: "Carrier Resin", value: "PE, PP, PS, Universal" },
      { property: "Active Concentration", value: "20% – 75% Pigment / Additive Loading" },
      { property: "Dispersion", value: "Filter Pressure Value (FPV) < 1.0 bar/g" },
    ],
    subTypes: [
      { name: "White TiO2 Masterbatch 70%", mfi: "12", density: "1.95", useCase: "Milk pouches, lamination films, injection molding" },
      { name: "Black Carbon Masterbatch 40%", mfi: "20", density: "1.25", useCase: "Geomembranes, agricultural pipes, trash bags" },
      { name: "UV Stabilizer Masterbatch (HALS)", mfi: "8", density: "0.98", useCase: "Greenhouse films, stadium seating, raffia" },
      { name: "Slip & Antiblock Combination", mfi: "10", density: "0.96", useCase: "BOPP and blown film packaging efficiency" },
    ],
    applications: [
      "Flexible film extrusion & converting",
      "Rigid packaging coloration & opacity",
      "Agricultural long-life greenhouse covers",
      "Cable jacketing & pipe extrusion",
    ],
    packaging: ["25 kg moisture-sealed PE bags"],
    imageUrl: "/images/Product/p3.png",
  },
  {
    slug: "recycled",
    name: "Recycled Granules & Regrinds",
    category: "Sustainable Polymers",
    tagline: "High Quality PCR & PIR Pellets for Circular Economy Compliance",
    description:
      "National Polymers is deeply committed to circular sustainability. We process and distribute post-consumer (PCR) and post-industrial (PIR) recycled granules, hot-washed flakes, and clean regrinds with rigorous QA testing for Melt Index, density, and filtration purity.",
    overview: [
      "Recycled HDPE Granules: Washed milk bottle & drum grade pellets in natural, blue, white, and mixed colors.",
      "Recycled LDPE / LLDPE Pellets: Clear and translucent pellets for garbage bags, construction films, and secondary liners.",
      "Recycled PP Granules: High impact pellets for plastic pallets, automotive battery boxes, and flower pots.",
      "Hot-Washed PET Flakes: Clear and light blue flakes with PVC < 20 ppm for strapping and fiber extrusion.",
    ],
    specs: [
      { property: "Source", value: "100% Post-Consumer (PCR) & Post-Industrial (PIR)" },
      { property: "Filtration", value: "Double mesh screen 100 – 150 mesh" },
      { property: "Moisture Content", value: "< 0.1%" },
      { property: "Deodorized Option", value: "Available with vacuum degassing" },
    ],
    subTypes: [
      { name: "rHDPE Blow Grade (Natural / Blue)", mfi: "0.3 – 0.7", density: "0.952", useCase: "Non-food bottles, detergent containers, pails" },
      { name: "rLLDPE Film Pellets (Clear)", mfi: "1.0 – 2.0", density: "0.920", useCase: "Garbage bags, agricultural sheeting, tarpaulins" },
      { name: "rPP Injection Pellets (Black)", mfi: "12 – 18", density: "0.915", useCase: "Logistics crates, pallets, automotive wheel wells" },
      { name: "Hot-Washed rPET Flakes (Clear)", mfi: "IV 0.74", density: "1.34", useCase: "Polyester staple fiber (PSF), strapping bands" },
    ],
    applications: [
      "Plastic pallets, crates and logistics bins",
      "Refuse sacks, garden mulch & construction liners",
      "Irrigation pipes & non-pressure conduits",
      "Fiberfill, carpet yarn and PET strapping",
    ],
    packaging: ["25 kg PP Woven Bags", "1000 kg Jumbo Bags with liners"],
    imageUrl: "/images/Product/p4.png",
  },
  {
    slug: "near-prime",
    name: "Near Prime Resins",
    category: "Economic Prime-Grade",
    tagline: "Minor Variance Resins Delivering Up To 15-25% Cost Savings",
    description:
      "Near prime resins are produced by major petrochemical plants during grade transitions or minor property variations (e.g., slight MFI or color variance) while retaining 95%+ of prime performance. A favorite among savvy converters seeking margin optimization without sacrificing machine uptime.",
    overview: [
      "Sourced from Tier-1 petrochemical producers during production transition runs.",
      "Consistent lot sizes (typically 1 to 10 container loads per batch).",
      "Factory-packaged in original producer bags with lot traceability.",
      "Ideal for non-critical packaging, housewares, piping, and industrial products.",
    ],
    specs: [
      { property: "Cost Benefit", value: "10% to 20% discount compared to Prime" },
      { property: "Testing", value: "Full laboratory Certificate of Analysis (COA) provided" },
      { property: "Packaging", value: "Original producer 25 kg bags or plain neutral bags" },
    ],
    subTypes: [
      { name: "Near Prime HDPE Film", mfi: "0.06 – 0.12", density: "0.948 – 0.954", useCase: "Carrier bags, bin liners, composite films" },
      { name: "Near Prime PP Injection", mfi: "12 – 25", density: "0.902 – 0.908", useCase: "Housewares, chairs, storage crates" },
      { name: "Near Prime LLDPE Film", mfi: "1.5 – 3.0", density: "0.916 – 0.922", useCase: "Agricultural film, general packaging" },
    ],
    applications: [
      "Retail shopping bags & general film extrusion",
      "Utility household items and furniture",
      "Non-critical injection and blow moulded items",
    ],
    packaging: ["25 kg original manufacturer bags", "Sea containers (24-26 MT)"],
    imageUrl: "/images/Product/p1.png",
  },
  {
    slug: "off-grade",
    name: "Off Grade / Off Spec Resins & Lumps",
    category: "Cost-Effective Raw Materials",
    tagline: "Plant Sweepings, Off-Spec Pellets, Purge Lumps & Scrap Lots",
    description:
      "For recyclers, compounders, and heavy industrial moulders, National Polymers aggregates consistent off-spec resin lots, reactor floor sweepings, transition lumps, and post-industrial scraps from petrochemical plants in the USA, Canada, and Asia.",
    overview: [
      "Off-Spec Pellets: Wide-spec MFI and density, great for compounding and masterbatch carrier.",
      "Polymer Lumps: Extruder purge lumps of HDPE, PP, and PA for shredding and regrinding.",
      "Baléd Film & Scrap: Clean industrial scrap for re-pelletizing.",
    ],
    specs: [
      { property: "Availability", value: "Spot lots and long-term supply contracts" },
      { property: "Inspection", value: "Container inspection photos and moisture data provided" },
      { property: "Pricing", value: "Maximum economic value / index-discounted" },
    ],
    subTypes: [
      { name: "Off-Grade PP Pellets", mfi: "Variable", density: "0.900", useCase: "Compounding, filler masterbatch base, heavy moulding" },
      { name: "HDPE Pipe Purge Lumps", mfi: "0.2 – 0.4", density: "0.955", useCase: "Size reduction, corrugated pipe compounding" },
      { name: "PE/PP Mixed Scrap", mfi: "Wide", density: "Various", useCase: "Plastic lumber, outdoor decking, street furniture" },
    ],
    applications: [
      "Polymer compounding & masterbatch manufacturing",
      "Plastic lumber & outdoor composite decking",
      "Drainage tiles and underground cable conduits",
    ],
    packaging: ["Big Bags", "Loose bulk in 40ft HC containers", "Gaylord boxes"],
    imageUrl: "/images/Product/p2.png",
  },
];
