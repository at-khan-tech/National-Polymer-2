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
    category: "Polyolefins",
    tagline: "Prime PP homopolymer, impact copolymer and random copolymer",
    description:
      "Polypropylene is a versatile thermoplastic offering superior chemical resistance, high melting temperature, and excellent mechanical performance. National Polymers supplies prime grades from leading international producers, with selected near-prime and off-spec lots available on enquiry.",
    overview: [
      "PP homopolymer: High stiffness, thermal resistance, and tensile strength; ideal for raffia tape, BOPP film, and injection moulding.",
      "PP impact copolymer: Toughness and impact resistance for applications requiring durability at low temperatures, subject to grade specification.",
      "PP random copolymer: Selected for clarity, gloss, and lower melting temperature in transparent packaging and containers.",
      "Near-prime & off-grade availability: Selected transition lots and industrial grades available on enquiry for compounding and non-critical applications.",
    ],
    specs: [
      { property: "Melt Flow Rate (MFR)", value: "0.3 to 70 g/10 min (230°C / 2.16 kg)" },
      { property: "Resin Density", value: "0.900 – 0.910 g/cm³" },
      { property: "Melting Point", value: "160°C – 168°C" },
      { property: "Tensile Strength at Yield", value: "25 – 38 MPa (grade-dependent)" },
      { property: "Flexural Modulus", value: "1100 – 1600 MPa" },
    ],
    subTypes: [
      { name: "PP Raffia Grade", mfi: "2.5 – 3.8 g/10 min (230°C/2.16 kg)", density: "0.900 – 0.905 g/cm³", useCase: "Woven tape, sacks, FIBC jumbo bags, monofilament, ropes" },
      { name: "PP Injection Grade", mfi: "10 – 55 g/10 min (230°C/2.16 kg)", density: "0.900 – 0.905 g/cm³", useCase: "Housewares, thin-wall food containers (e.g. APC H151CX), caps & closures" },
      { name: "PP Film Grade (BOPP / TQ)", mfi: "2.0 – 8.0 g/10 min (230°C/2.16 kg)", density: "0.900 – 0.905 g/cm³", useCase: "BOPP and tubular quenched film, flexible packaging, tapes" },
      { name: "PP Thermoforming Sheet", mfi: "1.2 – 2.5 g/10 min (230°C/2.16 kg)", density: "0.900 – 0.905 g/cm³", useCase: "Disposable drinking cups, food trays, container lids" },
    ],
    applications: [
      "Woven tape, sacks and geotextile fabrics",
      "Flexible packaging and BOPP lamination film",
      "Rigid packaging, thin-wall containers, caps and closures",
      "Automotive components, battery cases, and industrial pails",
      "Consumer housewares and appliances",
    ],
    packaging: ["25 kg PP Valve/PE Bags", "1000 kg FIBC Jumbo Bags", "Bulk Container Liners"],
    imageUrl: "/images/Product/p1.png",
  },
  {
    slug: "pe",
    name: "Polyethylene (PE - HDPE / LDPE / LLDPE)",
    category: "Polyolefins",
    tagline: "Prime HDPE, LDPE, LLDPE and metallocene polyethylene",
    description:
      "Polyethylene represents the largest volume commodity polyolefin globally. National Polymers supplies prime grades from leading international producers, subject to availability, for film extrusion, blow moulding, pipe extrusion, rotational moulding, and injection moulding.",
    overview: [
      "High Density Polyethylene (HDPE): High stiffness, tensile strength, and environmental stress-crack resistance (ESCR) for blow moulding, pipe, and film.",
      "Linear Low Density Polyethylene (LLDPE): High tensile and puncture resistance, elongation, and sealability for high-performance stretch and lamination film.",
      "Low Density Polyethylene (LDPE): Superior optical clarity, flexibility, and melt strength for flexible packaging, heavy-duty sacks, and extrusion coating.",
    ],
    specs: [
      { property: "Melt Index (MI / MFR)", value: "0.05 to 50 g/10 min (190°C / 2.16 kg or 5 kg)" },
      { property: "Resin Density Range", value: "0.915 – 0.965 g/cm³" },
      { property: "Melting Point", value: "110°C – 135°C (grade-dependent)" },
      { property: "ESCR Performance", value: "High-ESCR grades available for chemical containers & pressure pipe" },
      { property: "Elongation at Break", value: "> 500% (grade-dependent)" },
    ],
    subTypes: [
      { name: "HDPE Blown Film", mfi: "0.05 – 0.10 g/10 min (190°C/2.16 kg)", density: "0.950 – 0.954 g/cm³", useCase: "Shopping bags, grocery liners, heavy-duty shipping sacks" },
      { name: "HDPE Blow Moulding", mfi: "0.20 – 0.35 g/10 min (190°C/2.16 kg)", density: "0.954 – 0.958 g/cm³", useCase: "Chemical jerrycans, detergent bottles, lube oil cans" },
      { name: "HDPE Pipe PE100 / PE80", mfi: "0.25 g/10 min (190°C/5.0 kg)", density: "0.954 – 0.960 g/cm³", useCase: "Potable water, natural gas, irrigation piping (BorSafe HE3490-LS / ME3440)" },
      { name: "LLDPE Film (Butene / Hexene)", mfi: "1.0 – 2.0 g/10 min (190°C/2.16 kg)", density: "0.918 – 0.922 g/cm³", useCase: "Cast stretch wrap, agricultural mulch film, liquid packaging" },
      { name: "LDPE Film & Extrusion Coating", mfi: "2.0 – 7.7 g/10 min (190°C/2.16 kg)", density: "0.920 – 0.925 g/cm³", useCase: "General packaging, garment bags, shrink hoods, extrusion coating" },
    ],
    applications: [
      "Blown film and cast stretch wrapping",
      "Extrusion blow moulding of bottles and jerrycans",
      "Pressure pipes for drinking water and natural gas distribution",
      "Rotomoulded storage tanks and industrial containers",
      "Extrusion coating of paperboard and flexible substrates",
    ],
    packaging: ["25 kg standard PE bags", "Sea container bulk bags", "1100 kg wooden pallets"],
    imageUrl: "/images/Product/p2.png",
  },
  {
    slug: "pvc",
    name: "Polyvinyl Chloride (PVC Resin)",
    category: "Vinyl Polymers",
    tagline: "Prime suspension PVC resin (K57, K67, K70) & paste resin on enquiry",
    description:
      "National Polymers sources prime suspension PVC resin from leading international producers on enquiry, supplying consistent grades for rigid extrusion, calendered sheet, conduit fittings, and specialized compounds.",
    overview: [
      "PVC K67 (Most Popular): Standard suspension resin for rigid pipes, conduits, window profiles, and exterior cladding.",
      "PVC K57 / K58: Lower-K resin for injection moulding of conduit fittings and transparent rigid calendered sheets.",
      "PVC K70: Higher molecular weight suspension resin for selected cable, wire, hose compounds, and flexible profiles.",
      "Specialty Paste Resin: Available upon specific enquiry and grade confirmation.",
    ],
    specs: [
      { property: "K-Value (DIN 53726)", value: "57 to 70" },
      { property: "Apparent Bulk Density", value: "0.52 – 0.60 g/cm³ (labeled separately from resin density)" },
      { property: "Volatile Matter", value: "< 0.3%" },
      { property: "Residual VCM", value: "< 1.0 ppm (lot certificate verified)" },
    ],
    subTypes: [
      { name: "PVC Resin K67", mfi: "K-Value: 67 ± 1", density: "Bulk Density: 0.54 – 0.58 g/cm³", useCase: "Rigid pressure pipes, drainage pipes, window profiles, electrical conduits" },
      { name: "PVC Resin K57 / K59", mfi: "K-Value: 57 – 59", density: "Bulk Density: 0.55 – 0.60 g/cm³", useCase: "Injection conduit fittings, rigid calendered sheets" },
      { name: "PVC Resin K70", mfi: "K-Value: 70 ± 1", density: "Bulk Density: 0.50 – 0.55 g/cm³", useCase: "Selected cable, wire, and hose compounds, flexible profiles" },
    ],
    applications: [
      "Municipal water, irrigation & drainage piping",
      "Architectural window & door profiles, siding, and conduits",
      "Selected wire, cable, and flexible hose compounds",
      "Rigid packaging blisters and calendered sheets",
    ],
    packaging: ["25 kg Kraft Paper Bags with PE liner", "1000 kg Big Bags"],
    imageUrl: "/images/Product/p3.png",
  },
  {
    slug: "pet",
    name: "Polyethylene Terephthalate (PET Resin)",
    category: "Polyesters",
    tagline: "Prime bottle-grade and sheet-grade PET resin",
    description:
      "National Polymers supplies prime bottle-grade and thermoforming sheet-grade PET resin from certified producers. Sourced for clear water bottles, carbonated beverages, edible oil packaging, and thermoformed articles.",
    overview: [
      "Water Bottle Grade: Exceptional clarity, low acetaldehyde content, optimized for still mineral water and edible oil.",
      "CSD Beverage Grade: High intrinsic viscosity (0.87 – 0.88 dL/g) for carbonated soft drink pressure containment.",
      "Hot-Fill Grade: Thermal stability (IV 0.79 dL/g) for pasteurized juices and specialty beverages.",
      "Thermoforming Sheet Grade: Formulated for rigid packaging sheets, fruit punnets, and blister trays.",
    ],
    specs: [
      { property: "Intrinsic Viscosity (IV)", value: "0.780 to 0.880 dL/g (±0.015 dL/g producer spec)" },
      { property: "Acetaldehyde Content", value: "< 1.0 ppm" },
      { property: "Melting Point", value: "245°C – 250°C" },
      { property: "Typical Density", value: "1.380 – 1.400 g/cm³ (amorphous / crystalline)" },
    ],
    subTypes: [
      { name: "PET Water Bottle Grade (WK-801 / CZ-302)", mfi: "IV: 0.800 ± 0.015 dL/g", density: "1.380 g/cm³", useCase: "Still mineral water bottles, edible oil, personal care containers" },
      { name: "PET CSD Beverage Grade (WK-851 / WK-881)", mfi: "IV: 0.870 – 0.880 ± 0.015 dL/g", density: "1.380 g/cm³", useCase: "Carbonated soft drinks (CSD) and pressurized beverage bottles" },
      { name: "PET Hot-Fill Grade (WK-811)", mfi: "IV: 0.790 ± 0.015 dL/g", density: "1.380 g/cm³", useCase: "Hot-fill tea, juices, flavouring bottles" },
      { name: "PET Sheet & Thermoforming", mfi: "IV: 0.760 – 0.800 dL/g", density: "1.380 g/cm³", useCase: "Extrusion sheet, fruit punnets, blister packs, clamshells" },
    ],
    applications: [
      "Mineral water and beverage packaging",
      "Edible oil and condiment containers",
      "Cosmetic jars and personal care packaging",
      "Thermoformed clamshells, fruit punnets, and blister packs",
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
      "GPPS is used for clear, rigid moulded or extruded articles. HIPS is impact-modified and used for applications such as thermoformed liners, trays and housings, depending on grade.",
    overview: [
      "General Purpose Polystyrene (GPPS): Glass-like optical transparency, high stiffness, and dimensional stability for clear articles and food service items.",
      "High Impact Polystyrene (HIPS): Impact-modified with polybutadiene rubber for robust toughness, thermoformed refrigerator liners, and electronics housings.",
    ],
    specs: [
      { property: "Melt Flow Rate (MFR)", value: "2.0 – 18 g/10 min (200°C / 5 kg or 230°C / 2.16 kg)" },
      { property: "Typical Density", value: "1.040 – 1.060 g/cm³" },
      { property: "Vicat Softening Temperature", value: "88°C – 102°C" },
      { property: "Izod Impact Strength (HIPS)", value: "80 – 120 J/m" },
    ],
    subTypes: [
      { name: "GPPS Clear Extrusion (e.g. SABIC PS 125)", mfi: "2.5 – 9.0 g/10 min (230°C/2.16 kg)", density: "1.040 – 1.050 g/cm³", useCase: "Diffuser sheets, picture frames, disposable drinking cups" },
      { name: "GPPS Injection Grade", mfi: "8.0 – 15.0 g/10 min (230°C/2.16 kg)", density: "1.040 – 1.050 g/cm³", useCase: "Cosmetic containers, cutlery, clear rigid housewares" },
      { name: "HIPS Extrusion Sheet (e.g. SABIC PS 330)", mfi: "2.5 – 4.5 g/10 min (200°C/5.0 kg)", density: "1.040 g/cm³", useCase: "Refrigerator liners, dairy containers, disposable food trays" },
      { name: "HIPS Injection Grade", mfi: "6.0 – 12.0 g/10 min (200°C/5.0 kg)", density: "1.040 – 1.050 g/cm³", useCase: "Appliance housings, toys, office stationery, consumer goods" },
    ],
    applications: [
      "Food service disposables & dairy packaging",
      "Consumer electronics & appliance housings",
      "Extruded diffuser sheets, signage boards, and photo frames",
      "Rigid containers and cutlery",
    ],
    packaging: ["25 kg PE Bags", "1000 kg Jumbo Bags"],
    imageUrl: "/images/Product/p5.png",
  },
  {
    slug: "engineering-plastics",
    name: "Engineering Plastics (ABS, PC, POM, PA)",
    category: "High Performance Polymers",
    tagline: "ABS, PC, PA and POM for technical moulding applications",
    description:
      "National Polymers supplies prime engineering thermoplastics for high-demand technical moulding. ABS delivers a balanced toughness and surface finish; Polycarbonate (PC) offers impact resistance and optical clarity; Polyamides (PA6/PA66) provide mechanical strength and wear resistance; and Polyoxymethylene (POM) provides low-friction precision performance.",
    overview: [
      "ABS: Balanced toughness and surface finish for tool housings, automotive trim, and consumer electronics.",
      "Polycarbonate (PC): High impact resistance and optical transparency for safety shields, LED diffusers, and technical mouldings (UL 94 V-0 ratings grade-specific).",
      "Polyamides (PA6 / PA66): Mechanical strength, thermal endurance, and glass-filled compounds for structural components.",
      "POM (Acetal): Low coefficient of friction and high dimensional stability for precision gears and conveyor components.",
    ],
    specs: [
      { property: "Tensile Modulus", value: "2200 – 9000 MPa (GF Reinforced compounds)" },
      { property: "Heat Deflection Temp (HDT)", value: "100°C – 220°C (grade-dependent)" },
      { property: "Flammability Rating", value: "HB to UL94 V-0 (grade & thickness specific)" },
    ],
    subTypes: [
      { name: "ABS Injection Grade", mfi: "15 – 30 g/10 min (220°C/10 kg)", density: "1.040 – 1.060 g/cm³", useCase: "Tool housings, automotive interior trim, appliance enclosures" },
      { name: "PC Optical & General Purpose", mfi: "MVR 8 – 22 cm³/10 min (300°C/1.2 kg)", density: "1.200 g/cm³", useCase: "Safety goggles, LED lighting diffusers, headlamps (UL94 V-0 grade-specific)" },
      { name: "PA6 / PA66 GF30 Reinforced", mfi: "Compound dependent", density: "1.360 g/cm³", useCase: "Under-the-hood automotive parts, power tool bodies, precision gears" },
      { name: "POM Copolymer", mfi: "9.0 g/10 min (190°C/2.16 kg)", density: "1.410 g/cm³", useCase: "Precision gears, conveyor components, fuel system valves" },
    ],
    applications: [
      "Automotive exterior, interior, and under-the-hood components",
      "Power tool housings, gears, and industrial machinery parts",
      "Lighting diffusers, transparent shields, and electrical enclosures",
      "Precision conveyor chains, valves, and mechanical gears",
    ],
    packaging: ["25 kg Moisture-Barrier Bags", "Palletized units"],
    imageUrl: "/images/Product/p6.png",
  },
  {
    slug: "near-prime",
    name: "Near Prime Resins",
    category: "Near-Prime Resins",
    tagline: "Near-prime and transition lots on enquiry",
    description:
      "Selected near-prime lots are available on enquiry. Properties, packaging, traceability and suitability are reviewed against the customer’s application and the available lot documentation.",
    overview: [
      "Sourced from major petrochemical producers during planned production transition runs.",
      "Container-load availability subject to specific refiner offerings.",
      "Batch Certificate of Analysis (COA) provided with lot specifications.",
      "Suitable for non-critical packaging, housewares, and general moulding applications.",
    ],
    specs: [
      { property: "Commercial Advantage", value: "Cost-effective pricing compared to prime resins" },
      { property: "Lot Documentation", value: "Available Certificate of Analysis (COA) reviewed per enquiry" },
      { property: "Packaging", value: "Original producer 25 kg bags or plain neutral bags" },
    ],
    subTypes: [
      { name: "Near-Prime HDPE Film", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Carrier bags, bin liners, composite film (subject to lot qualification)" },
      { name: "Near-Prime PP Injection", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Housewares, utility crates, storage bins" },
      { name: "Near-Prime LLDPE Film", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Agricultural film, industrial packaging, secondary liners" },
    ],
    applications: [
      "Retail carrier bags & general film extrusion",
      "Utility household items and furniture",
      "Non-critical injection and blow moulded items",
    ],
    packaging: ["25 kg original manufacturer bags", "Sea containers (24-26 MT)"],
    imageUrl: "/images/Product/p1.png",
  },
  {
    slug: "off-grade",
    name: "Off Grade / Off Spec Resins",
    category: "Off-Grade & Industrial Lots",
    tagline: "Off-grade pellets for selected industrial and compounding applications",
    description:
      "National Polymers supplies off-grade polymer pellets for selected industrial, compounding, and non-critical conversion applications. Available lots are documented with MFR, density, colour, packaging, and batch inspection data.",
    overview: [
      "Off-grade pellets for masterbatch carriers and polymer compounding (subject to lot suitability).",
      "Industrial pellets for heavy mouldings, utility containers, and composite articles.",
      "Lot documentation, packaging photos, and moisture data provided on enquiry.",
    ],
    specs: [
      { property: "Availability", value: "Spot lots and contractual deliveries on enquiry" },
      { property: "Lot Data", value: "Batch inspection reports and available COA provided" },
      { property: "Commercial Value", value: "Competitively indexed for conversion economics" },
    ],
    subTypes: [
      { name: "Off-Grade PP Pellets", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Compounding, industrial moulding, utility products" },
      { name: "Off-Grade PE Pellets", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Pipe compounding, thick-wall extrusion, industrial bins" },
      { name: "Transition Polymer Pellets", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Blending, masterbatch compounding, secondary extrusion" },
    ],
    applications: [
      "Polymer compounding and masterbatch base formulations",
      "Heavy-duty utility crates, containers, and non-pressure conduits",
      "Agricultural and industrial thick-gauge mouldings",
    ],
    packaging: ["Big Bags", "Loose bulk in 40ft HC containers", "Gaylord boxes"],
    imageUrl: "/images/Product/p2.png",
  },
  {
    slug: "recycled",
    name: "Recycled Polymers",
    category: "Recycled Polymers",
    tagline: "Selected PCR and PIR materials on enquiry",
    description:
      "National Polymers sources and supplies selected post-consumer (PCR) and post-industrial (PIR) recycled granules and hot-washed flakes on enquiry. Material properties, colour, filtration, and documentation are provided per specific lot.",
    overview: [
      "Recycled HDPE (rHDPE): Non-food blow moulding and injection applications (natural, blue, black).",
      "Recycled LLDPE (rLLDPE): Secondary films, garbage bags, and agricultural sheeting.",
      "Recycled PP (rPP): Crates, logistics pallets, and heavy utility mouldings.",
      "Hot-Washed rPET Flakes: Documented clear and blue flakes for strapping and fiber applications.",
    ],
    specs: [
      { property: "Material Source", value: "Post-Consumer (PCR) & Post-Industrial (PIR) streams" },
      { property: "Filtration Spec", value: "Documented mesh filtration per supplier test report" },
      { property: "Moisture Content", value: "Batch-tested moisture verification" },
    ],
    subTypes: [
      { name: "rHDPE Pellets (Natural / Blue)", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Non-food containers, pails, non-critical blow moulding" },
      { name: "rLLDPE Film Pellets", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Garbage bags, agricultural sheeting, tarpaulins" },
      { name: "rPP Injection Pellets", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Logistics crates, pallets, utility mouldings" },
      { name: "Hot-Washed rPET Flakes", mfi: "Values vary by lot", density: "Request available batch data", useCase: "Polyester staple fiber, strapping bands (moisture & contamination data on request)" },
    ],
    applications: [
      "Plastic pallets, crates, and logistics bins",
      "Refuse sacks, garden mulch, and construction liners",
      "Agricultural irrigation conduits (non-pressure)",
      "Polyester staple fiber (PSF) and strapping bands",
    ],
    packaging: ["25 kg PP Woven Bags", "1000 kg Jumbo Bags with liners"],
    imageUrl: "/images/Product/p4.png",
  },
];
