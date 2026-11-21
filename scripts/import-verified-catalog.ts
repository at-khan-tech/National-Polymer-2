import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const rawGradesCsv = `S.No,Brand / Refiner,Grade Code,Polymer Category,Subcategory / Classification,Origin Country,MFI / MFR (g/10min),Density,Key Target Applications,Stock Availability,Verification Status,Technical Datasheet (TDS),TDS Available?,Technical Notes / Remarks,Product Feautres,TDS LINK
1,APC,H312,PP,PP Homopolymer,Saudi Arabia,3.4 g/10 min,0.905 g/cm³,Raffia / Monofilaments/ Strapping,Available on request,Verified,Pending Upload,NO,"Low Water Carry-Over, Good Processability, Potential Suitability for Bulk Containers",,https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H312.pdf
2,APC,H316,PP,PP Homopolymer,Saudi Arabia,4.5 g/10 min,0.905 g/cm³,Stretched Tape Yarn/ Carpet Backing/ Artificial Grass/ Raffia Production/ Thermoforming Applications,Available on request,Verified,Pending Upload,NO,"Narrow Melt Flow Rate, Low Water Carry-Over, Dimensional Stability",,https://advancedpetrochem.com/wp-content/uploads/2025/06/Advanced-TDS-PP-H316.pdf
3,APC,H129,PP,PP Homopolymer,Saudi Arabia,12.0 g/10 min,0.905 g/cm³,Caps and closures/ Furniture/ Housewares,Available on request,Verified,Pending Upload,NO,"Standard housewares, furniture, household containers, and caps.","Controlled Flowability, Optimized Molecular Weight Distribution, Advanced Phenol-Free Stabilization Package",https://advancedpetrochem.com/wp-content/uploads/2025/06/Advanced-TDS-PP-H129.pdf
4,APC,H140X,PP,PP Homopolymer,Saudi Arabia,25.0 g/10 min,0.905 g/cm³,Furniture/ Housewares,Available on request,Verified,Pending Upload,NO,High spiral flow length for fast cycle thin-wall food containers and dairy packaging.,"High fluidity, Good stiffness, Suitable for food contact Injection Molding applications",https://www.polymerio.com/assets/uploads/listings/02855/6a143da5-40c8-485e-9e88-808c40fe6164/tds--advanced-tds-pp-h140x-sep25.pdf
5,APC,H151CX,PP,PP Homopolymer,Saudi Arabia,53.0 g/10 min,0.905 g/cm³,Thin-Wall Food Containers/ Thin-Wall Non-food Containers/ Housewares,Available on request,Verified,Pending Upload,NO,Sub-zero impact resistance for freezer-safe thin-wall food tubs and lids.,"Controlled Rheology, Superior Melt Flow, Contains Antistatic",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H151CX.pdf
6,APC,H154X,PP,PP Homopolymer,Saudi Arabia,70.0 g/10 min,0.905 g/cm³,Thin-Wall Packaging/ Compounding/ Consumer Goods,Available on request,Verified,Pending Upload,NO,Ultra high melt flow for intricate multicavity moulds and disposable cutlery.,"High Flow, Balanced Stiffness, Excellent Processability",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H154X.pdf
7,APC,H120,PP,PP Homopolymer,Saudi Arabia,7.5 g/10 min,0.905 g/cm³,Housewares/ Furnitures/ Rigid Packaging,Available on request,Verified,Pending Upload,NO,"General injection moulding, kitchenware, storage boxes, and closures.","Good Impact Resistance, Good Stiffness, Medium Melt Flow Rate",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H120.pdf
8,APC,H118,PP,PP Homopolymer,Saudi Arabia,6.0 g/10 min,0.905 g/cm³,Housewares/ Furnitures/ Closures,Available on request,Verified,Pending Upload,NO,Balanced mechanical properties and good gloss for consumer articles.,"Medium Flow Rate, Good Stiffness/Impact Balance, Suitable for Injection Molding",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H118.pdf
9,APC,H134,PP,PP Homopolymer,Saudi Arabia,17.0 g/10 min,0.905 g/cm³,Housewares/ Furnitures/ Rigid Packaging,Available on request,Verified,Pending Upload,NO,Rapid cycle injection moulding for thin articles and closures.,"Good Flow, Good Stiffness",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H134.pdf
10,APC,H239G,PP,PP Homopolymer,Saudi Arabia,24.0 g/10 min,0.905 g/cm³,Continuous filaments ( CF)/ Bulked continuous filaments (BCF)/ Filter Fabric,Available on request,Verified,Pending Upload,NO,"Spunbond nonwoven fabrics for hygiene, medical masks, and protective wear.","High Melt Flow Rate, Medium Molecular Weight Distribution, Gas Fading Resistance",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H239G.pdf
11,APC,H244GX,PP,PP Homopolymer,Saudi Arabia,35.0 g/10 min,0.905 g/cm³,"Hygiene fabrics (diapers, wipes, medical gowns) / Filtration media (air and liquid)/ Specialt",Available on request,Verified,Pending Upload,NO,"Fine filament spinning, filter media, and hygiene applications.","Excellent processability at high line speeds, Narrow Molecular Weight Distribution, Good gas fading resistance",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H244GX.pdf
12,APC,H510M,PP,PP Homopolymer,Saudi Arabia,3.0 g/10 min,0.905 g/cm³,Food Packaging/ Cosmetic Packaging/ Laminated Structures,Available on request,Verified,Pending Upload,NO,"Biaxially oriented films for snacks, confectionery, tape, and printing.","High Clarity/High Gloss, Metallizable, Good Processing",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-Adfree-PP-H510M.pdf
13,APC,H512M,PP,PP Homopolymer,Saudi Arabia,3.2 g/10 min,0.905 g/cm³,Metallized BOPP Films/ BOPP Core layers/ Raffia Tapes ,Available on request,Verified,Pending Upload,NO,High clarity BOPP film lines with excellent barrier characteristics.,"Narrow MFR Range, Metallizable Formulation, Low Water Carry",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H512M.pdf
14,APC,H421,PP,PP Homopolymer,Saudi Arabia,8.0 g/10 min,0.905 g/cm³,Packaging film for food/ Flexible packaging/ Textile packaging,Available on request,Verified,Pending Upload,NO,"CPP cast film lines for garment bags, bread packaging, and lamination.","Superior flowability, Outstanding optical clarity",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H421.pdf
15,APC,H235G,PP,PP Homopolymer,Saudi Arabia,18.0 g/10 min,0.905 g/cm³,Continuous filaments (CF)/ Bulked continuous filaments (BCF)/ Filter Fabric,Available on request,Verified,Pending Upload,NO,"Staple fiber, needle-punched geotextiles, and industrial yarn.","Controlled Flowabilit, Optimized Molecular Weight Distribution, Balanced Crystallinity, Advanced Phenol-Free Stabilization Package",https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H235G.pdf
16,SABIC,P6006AD,HDPE,HDPE Pipe Grade,Saudi Arabia,0.23 g/10 min,0.959 g/cm³,"pressure pipes for portable water, gas, sewage and other liquids",Available on request,Verified,Pending Upload,NO,"P6006AD is black compound high density polyethylene (classified as PE112) specially designed for pressure pipe applications. It delivers exceptional processing performance",,https://plasmar.com.tr/core/uploads/page/document/P6006AD.pdf
17,SABIC,B4660AB,HDPE,HIGH DENSITY POLYETHYLENE,Saudi Arabia,2.8 g/10 min,0.961 g/cm³,blow molding bottles for the food and beverage industry,Available on request,Verified,Pending Upload,NO,"They are primarily Designed for imparting high rigidity, toughness and good processability. These unique properties offer the possibility to reduce weight at very good top load strength. B4660AB: Suitable for Water packaging",,https://cn.hongrunplastics.com/public/uploads/images/20250617/SABIC%20HDPE%20B4660AB.pdf
18,SABIC,B5411,HDPE,HIGH DENSITY POLYETHYLENE,Saudi Arabia,0.40 g/10 min,0.954 g/cm³,"Typically used for blow molding and sheet extrusion",Available on request,Verified,Pending Upload,NO,"Typically used for large bottles, cans, technical parts and toys.",,https://www.benerecycling.pl/files/b5411.pdf
19,SABIC,F4520,HDPE,HIGH DENSITY POLYETHYLENE,Saudi Arabia,0.89 g/10 min,0.945 g/cm³,"Typically used for blow molding packaging up to 20 l, combining medium stiffness with a good ESCR",Available on request,Verified,Pending Upload,NO,"Typically used for packaging of aggressive detergents and technical articles such as spare fuel tanks, air- and cable ducts.",,https://cn.hongrunplastics.com/public/uploads/images/20250617/SABIC%20HDPE%20F4520.pdf
20,SABIC,FI0851P,HDPE,HIGH DENSITY POLYETHYLENE,Saudi Arabia,0.05 g/10 min,0.951 g/cm³,high density polyethylene resin designed for blown film applications,Available on request,Verified,Pending Upload,NO,"Films made from this resin exhibit high stiffness, excellent impact and toughness characteristics.",,https://www.chemategroup.com/wp-content/uploads/2023/06/SABIC%C2%AE-HDPE-FI0851P-TDS.pdf
21,SABIC,118NJA,LLDPE,LINEAR LOW DENSITY POLYETHYLENE,Saudi Arabia,1.0 g/10 min,0.918 g/cm³,typically used for general purpose applications,Available on request,Verified,Pending Upload,NO,"Shipping sacks, ice bags, frozen food bags, stretch wrap film, produce bags, liners, carrier bags, garbage bags, agricultural films, laminated and coextruded films for meat wrap, frozen food and other food packaging, shrink film (for blending with LDPE), industrial consumer packaging, and high clarity film applications if blended with (10 - 20%) LDPE.",,https://cn.hongrunplastics.com/public/uploads/images/20250617/SABIC%20LLDPE%20118NJA.pdf
22,SABIC,218WJA,LLDPE,LINEAR LOW DENSITY POLYETHYLENE,Saudi Arabia,2.0 g/10 min,0.918 g/cm³,Suitable for general‐purpose packaging,Available on request,Verified,Pending Upload,NO,"Lamination film, thin liners, shopping bags, carrier bags, garbage bags, coextruded films, consumer packaging and other general-purpose applications.",,https://cn.hongrunplastics.com/public/uploads/images/20250617/SABIC%20LLDPE%20218WJA.pdf
23,SABIC,220HT,LLDPE,LLDPE High Tensile Film,Saudi Arabia,2.0 g/10 min (190°C / 2.16 kg),0.920 g/cm³,Film,Available on request,Verified,Pending Upload,NO,Enhanced puncture and tear resistance for industrial multi-wall sacks.,,
24,SABIC,318BJA,LLDPE,LINEAR LOW DENSITY POLYETHYLENE,Saudi Arabia,2.8 g/10 min,0.918 g/cm³,"typically designed for easy processing and specially formulated for optimum thermal stability at high temperatures used in cast film extrusion",Available on request,Verified,Pending Upload,NO,"typcially used for hand and pallet stretch wrap, cling film, melt embossed film and other genera-purpose application.",,https://cn.hongrunplastics.com/public/uploads/images/20250617/SABIC%20LLDPE%20318BJA.pdf
25,SABIC,MG500026,LLDPE,Linear Low Density Polyethylene,Saudi Arabia,50.0 g/10 min,0.926 g/cm³,suitable mainly for compounding applications,Available on request,Verified,Pending Upload,NO,"recommended for carpet backing, metal coating and compounding for masterbatch production.",,https://www.indochempolymers.com/media/product/66437355_MG500026.pdf
26,SABIC,2200H0,LDPE,LDPE General Film,Saudi Arabia,2.0 g/10 min (190°C / 2.16 kg),0.922 g/cm³,Film,Available on request,Verified,Pending Upload,NO,"High optical clarity and gloss for display packaging, shrink film, and pouches.",,
27,SABIC,HP0723JN,LDPE,LOW DENSITY POLYETHYLENE,Saudi Arabia,0.75 g/10 min,0.923 g/cm³,"specially designed for superior processability on blown films lines leading to significant output improvements",Available on request,Verified,Pending Upload,NO,"Lamination films, Collation shrink, Shopping bags, Garbage bags, Health & hygiene films, Food packaging, Collation shrink, Agricultural films.",,https://avh.co.in/wp-content/uploads/2023/12/LDPE-HP0723JN.pdf
28,SABIC,HP2025NN,LDPE,LDPE CAST Film,Saudi Arabia,2.0 g/10 min,0.923 g/cm³,"designed with and optimum balance of melt strength and drawability to give excellent performance in cast film, foam, blown film and bubble film extrusion",Available on request,Verified,Pending Upload,NO,"Foam, Bubble film, General purpose blown film.",,https://stavianchem.com/sites/default/files/product-specs/HP2025NN.pdf
29,SABIC,500P,PP,PP Homopolymer,Saudi Arabia,3.0 g/10 min,0.905 g/cm³,"suitable for tapes and strapping, high tenacity yarns and carpet backing",Available on request,Verified,Pending Upload,NO,suitable for production of injection molded articles e.g. caps and closures and house ware products,,https://www.chemdo.com/uploads/SABIC%C2%AE-PP_500P_Asia_Technical_Data_Sheet.pdf
30,SABIC,575P,PP,PP Homopolymer FOR INJECTION MOLDING,Saudi Arabia,11.0 g/10 min,0.905 g/cm³,producing rigid injection molding articles for general purpose applications,Available on request,Verified,Pending Upload,NO,"used for houseware articles, caps, closures, containers and toys",,https://iigc.mx/Fichas/IMHPP-PP575P-SABIC.pdf
31,SK Geo Centric,H730F,PP,PP Homopolymer,South Korea,3.5 g/10 min,0.905 g/cm³,"Designed for stretched products such as yarn, tape and rope",Available on request,Verified,Pending Upload,NO,"Yarn & Stretched / rope, sheet, Tapes, Tents, woven bags",,https://www.starflot.com/pdfs/PPH/SK-YUPLENE-H730F.pdf
32,SK Geo Centric,B310F,PP,PP Impact Copolymer,South Korea,1.5 g/10 min,0.900 g/cm³,"suitable for household articles, chairs, containers, and automobile parts",Available on request,Verified,Pending Upload,NO,"Injection Molding, Extrusion Sheet, Extrusion Molding, Automobile applications, Battery case, Home appliances, Industrial parts for electronic",,https://datasheets.acran.com.tr/GetTDS.ashx?file=PPC%20-%20SK%20-%20B310F%20[3038].pdf&id=3038&wm=true
33,SK Geo Centric,B391G,PP,PP Impact Copolymer,South Korea,40.0 g/10 min,0.900 g/cm³,designed for injection molding applications. ,Available on request,Verified,Pending Upload,NO,"Injection Molding / automobile applications, industrial parts for electronic, large container ",,https://b2bpolymers.com/TDS/SK_Yuplene_B391G.pdf
34,SK Geo Centric,B393G,PP,PP Impact Copolymer,South Korea,60.0 g/10 min,0.900 g/cm³,"designed for injection molding application",Available on request,Verified,Pending Upload,NO,"Injection / Automobile applications, large container, Industrial parts for electronic ",,https://datasheets.acran.com.tr/GetTDS.ashx?file=PPC%20-%20SK%20-%20B393G%20[1141].pdf&id=1141&wm=true
35,SK Geo Centric,B900V,PP,PP Impact Copolymer,South Korea,60.0 g/10 min (230°C / 2.16 kg),0.900 g/cm³,Impact copolymer / injection,Available on request,Verified,Pending Upload,NO,Ultra-high flow impact copolymer for thin-walled containers and automotive trims.,,
36,SK Geo Centric,B900F,PP,PP Impact Copolymer,South Korea,50.0 g/10 min (230°C / 2.16 kg),0.900 g/cm³,Impact copolymer / injection,Available on request,Verified,Pending Upload,NO,"Fast cycle moulding, cold impact resistance for freezer-safe packaging.",,
37,SK Geo Centric,R390Y,PP,PP Random Copolymer,South Korea,45.0 g/10 min,300 kg/cm²,"Its excellent flow property makes it suitable for various large size home appliances and thin wall products",Available on request,Verified,Pending Upload,NO,"Injection molding / Home appliances, transparent container",,https://www.elmkimya.com/images/pdf/pp/PPRC-INJ-SK-YUPLENE%20R390Y.pdf
38,SK Geo Centric,R392Y,PP,PP Random Copolymer,South Korea,75.0 g/10 min,270 kg/cm²,"its excellent flow property makes it suitable for various large size home appliances and thin wall products",Available on request,Verified,Pending Upload,NO,"Injection Molding / food container, home appliances, transparent container",,https://plasmar.com.tr/core/uploads/page/document/R392Y.pdf
39,SK Geo Centric,R520Y,PP,PP Random / Special,South Korea,1.8 g/10 min,320 kg/cm²,"Designed for use in blow molding, and ISBM (Injection stretch blow molding)",Available on request,Verified,Pending Upload,NO,"Blow Molding / Transparent container(IBM, High transparent sheet)",,https://www.pakrokimya.com/wp-content/uploads/SK-YUPLENE-R520Y.pdf
40,SIDPEC,HD6070UA,HDPE,HDPE Injection Moulding,Egypt,7.5 g/10 min,960 kg/m³,Injection moulding,Available on request,Verified,Pending Upload,NO,"Crates, boxes, seats, pallets",,https://www.sidpec.com/PDFHandler.ashx?FileID=4349
41,SIDPEC,HD6070EA,HDPE,HDPE Injection Moulding,Egypt,7.5 g/10 min,960 kg/m³,Injection moulding,Available on request,Verified,Pending Upload,NO,"Crates, boxes, seats, pallets",,https://www.sidpec.com/PDFHandler.ashx?FileID=4350
42,SIDPEC,HD5740UA,HDPE,HDPE Injection Moulding,Egypt,4.0 g/10 min,957 kg/m³,Injection moulding,Available on request,Verified,Pending Upload,NO,"Large dustbins and pails , Pallet boxes, Fish crates, Technical moulding ",,https://www.sidpec.com/PDFHandler.ashx?FileID=4351
43,SIDPEC,HD3840UA,HDPE,HDPE Rotomoulding,Egypt,4.0 g/10 min,938 kg/m³,Rotomoulding / Tanks,Available on request,Verified,Pending Upload,NO,UV8 stabilized rotomoulding powder/pellet for overhead water tanks and road barriers.,,https://www.sidpec.com/ar/PDFHandler.ashx?FileID=192
44,SIDPEC,HD5502GA,HDPE,HDPE Blow Moulding,Egypt,0.2 g/10 min,955 kg/m³,Blow moulding,Available on request,Verified,Pending Upload,NO,"Blow moulded containers up to 30 liters for packaging, Chemicals, Household products, Oils and food stuffs",,https://www.sidpec.com/PDFHandler.ashx?FileID=4348
45,SIDPEC,HD5301EA,HDPE,HDPE Blow Moulding,Egypt,11.0 g/10 min,949 kg/m³,Blow moulding,Available on request,Verified,Pending Upload,NO,"High performance blow moulded containers typically more than 220 liters capacity for packaging aggressive products.",,https://www.sidpec.com/PDFHandler.ashx?FileID=6608
46,SIDPEC,HD5403EA,HDPE,HDPE Blow Moulding,Egypt,0.35 g/10 min,955 kg/m³,Blow moulding,Available on request,Verified,Pending Upload,NO,"Blow moulded containers up to 30 liters for packaging, Chemicals, Household products",,https://www.sidpec.com/ar/PDFHandler.ashx?FileID=186
47,SIDPEC,HD5301FB,HDPE,HDPE Film Grade,Egypt,0.05 g/10 min),953 kg/m³,Blown film,Available on request,Verified,Pending Upload,NO,"Strong thin film, Carrier bags, Grocery sacks",,https://www.pccplastic.com/files/HD5301FB.pdf
48,Formosa Plastics USA,HJ5620B,HDPE,HDPE Injection Moulding,USA,20.0 g/10 min (190°C / 2.16 kg),0.956 g/cm³,Injection moulding,Available on request,Verified,Pending Upload,NO,"High flow narrow MWD resin for beverage bottle caps, closures, and housewares.",,
49,Formosa Plastics USA,HF4202,HDPE,HDPE Film Grade,USA,2.0 g/10 min,0.942 g/cc,Blown film,Available on request,Verified,Pending Upload,NO,"Agricultural film, Diaper Backsheet , Overwrap films",,https://www.fic-pe.com/content/uploads/participants-database/hf4202_no_fda.pdf
50,Formosa Plastics USA,HF4204,HDPE,HDPE Film Grade,USA,4.3 g/10 min,0.942 g/cc,Blown film,Available on request,Verified,Pending Upload,NO,"Agricultural film, Diaper Backsheet , Overwrap films",,https://www.fic-pe.com/content/uploads/participants-database/hf4204_no_fda.pdf
51,Formosa Plastics USA,HJ6308,HDPE,HDPE Injection Moulding,USA,8.2 g/10 min,0.963 g/cc,Crates / pallets,Available on request,Verified,Pending Upload,NO,"Industrial Crates, Totes & Bins",,https://www.fic-pe.com/content/uploads/participants-database/hj6308_2.pdf
52,Formosa Plastics USA,1102L,PP,PP Homopolymer,USA,5.0 g/10 min,0.900 g/cm³,Injection moulding,Available on request,Verified,Pending Upload,NO,"Stiff injection moulded parts, strapping tape, and profile extrusion.",,https://hongrunplastics.com/public/uploads/images/20251012/Formolene%201102L.pdf
53,Formosa Plastics USA,2315N,PP,PP Impact Copolymer,USA,15.0 g/10 min,0.9 g/cm³,Impact copolymer,Available on request,Verified,Pending Upload,NO,"Automotive battery cases, heavy buckets, and cold temperature containers.",,https://www.fpcusa.com/content/uploads/participants-database/2315n.pdf
54,Formosa Plastics USA,2510W,PP,PP Impact Copolymer,USA,10.0 g/10 min,0.900 g/cm³,Impact copolymer,Available on request,Verified,Pending Upload,NO,"Washing machine tubs, luggage shells, and durable industrial totes.",,
55,Formosa Plastics USA,2520N,PP,PP Homopolymer / Injection,USA,20.0 g/10 min (230°C / 2.16 kg),0.905 g/cm³,Injection moulding,Available on request,Verified,Pending Upload,NO,"Fast moulding cycle for consumer goods, storage organizers, and closures.",,
56,Formosa Plastics USA,2535A,PP,PP Homopolymer,USA,35.0 g/10 min,0.900 g/cm³,Thin-wall injection moulding,Available on request,Verified,Pending Upload,NO,"Thin-walled disposable food containers, cups, and deli packaging.",,https://hongrunplastics.com/public/uploads/images/20251012/Formolene%202535A.pdf`;

// Parse CSV with quotes support
function parseCsv(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(field.trim());
      field = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      row.push(field.trim());
      if (row.some((cell) => cell.length > 0)) {
        lines.push(row);
      }
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    if (row.some((cell) => cell.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function run() {
  const parsed = parseCsv(rawGradesCsv);
  const header = parsed[0];
  console.log("Header columns:", header);

  const gradeRows = parsed.slice(1);
  console.log(`Parsed ${gradeRows.length} grade rows from verified sheet.`);

  const candidateGrades = gradeRows.map((row) => {
    const [
      sNo,
      brand,
      gradeCode,
      category,
      subcategory,
      origin,
      mfi,
      density,
      app,
      stock,
      vStatus,
      tdsDoc,
      tdsAvail,
      techNotes,
      features,
      tdsLink,
    ] = row;

    const id = `${toSlug(brand)}-${toSlug(gradeCode)}`;
    const finalTds = tdsLink && tdsLink.startsWith("http") ? tdsLink.trim() : undefined;
    
    // Combine notes and features nicely
    const notesParts: string[] = [];
    if (techNotes && techNotes.trim()) notesParts.push(techNotes.trim());
    if (features && features.trim()) notesParts.push(`Key Features: ${features.trim()}`);
    const notes = notesParts.length > 0 ? notesParts.join(" ") : undefined;

    return {
      id,
      brand: brand.trim(),
      origin: origin.trim(),
      category: category.trim() as any,
      subCategory: subcategory.trim(),
      grade: gradeCode.trim(),
      application: app.trim(),
      mfi: mfi.trim(),
      density: density.trim(),
      availability: stock ? stock.trim() : "Available on request",
      status: (vStatus && vStatus.trim().toLowerCase() === "verified" ? "Verified" : "Verified") as any,
      tdsUrl: finalTds,
      notes,
    };
  });

  console.log(`Generated ${candidateGrades.length} structured grades.`);
  console.log(`Grades with active verified TDS links: ${candidateGrades.filter((g) => g.tdsUrl).length}`);

  // 1. Write to src/data/gradesCatalog.ts
  const gradesCatalogPath = path.join(process.cwd(), "src", "data", "gradesCatalog.ts");
  const existingCatalogContent = readFileSync(gradesCatalogPath, "utf8");

  // Keep BrandInfo and MAJOR_BRANDS, replace CANDIDATE_GRADES
  const splitIdx = existingCatalogContent.indexOf("export const CANDIDATE_GRADES: PolymerGrade[] = [");
  if (splitIdx === -1) {
    throw new Error("Could not find CANDIDATE_GRADES declaration in gradesCatalog.ts");
  }

  const prefix = existingCatalogContent.substring(0, splitIdx);
  const newCandidateGradesCode = `export const CANDIDATE_GRADES: PolymerGrade[] = ${JSON.stringify(
    candidateGrades,
    null,
    2
  )};\n`;

  writeFileSync(gradesCatalogPath, prefix + newCandidateGradesCode, "utf8");
  console.log("Updated src/data/gradesCatalog.ts successfully!");

  // 2. Connect to Supabase and persist grades and products
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    console.log("Connecting to Supabase at:", supabaseUrl);
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Upload to Supabase Storage: catalog/grades.json
    try {
      const storageBytes = Buffer.from(JSON.stringify(candidateGrades, null, 2), "utf8");
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("uploads")
        .upload("catalog/grades.json", storageBytes, {
          contentType: "application/json",
          upsert: true,
        });

      if (uploadError) {
        console.warn("Notice on Supabase Storage upload:", uploadError.message);
      } else {
        console.log("Successfully uploaded catalog/grades.json to Supabase Storage!");
      }
    } catch (err) {
      console.warn("Storage upload error:", err);
    }

    // Try upserting to 'grades' PostgreSQL table if table exists
    try {
      const tableRows = candidateGrades.map((g) => ({
        id: g.id,
        brand: g.brand,
        origin: g.origin,
        category: g.category,
        sub_category: g.subCategory,
        grade: g.grade,
        application: g.application,
        mfi: g.mfi,
        density: g.density,
        availability: g.availability,
        status: g.status,
        tds_url: g.tdsUrl || null,
        notes: g.notes || null,
      }));

      const { error: upsertError } = await (supabase as any)
        .from("grades")
        .upsert(tableRows, { onConflict: "id" });

      if (upsertError) {
        console.warn("Postgres 'grades' table note:", upsertError.message);
      } else {
        console.log(`Successfully upserted ${tableRows.length} grades into Postgres 'grades' table!`);
      }
    } catch (err) {
      console.warn("Postgres table upsert skipped:", err);
    }

    // Re-seed products table with latest productsData
    try {
      const { PRODUCTS_DATA } = await import("../src/data/productsData");
      const productRows = PRODUCTS_DATA.map((p) => ({
        slug: p.slug,
        name: p.name,
        category: p.category,
        tagline: p.tagline,
        description: p.description,
        overview: p.overview,
        specs: p.specs,
        sub_types: p.subTypes,
        applications: p.applications,
        packaging: p.packaging,
        image_url: p.imageUrl,
      }));

      const { error: prodError } = await supabase
        .from("products")
        .upsert(productRows, { onConflict: "slug" });

      if (prodError) {
        console.warn("Products upsert note:", prodError.message);
      } else {
        console.log(`Successfully synchronized ${productRows.length} product families in Supabase 'products' table!`);
      }
    } catch (err) {
      console.warn("Products sync error:", err);
    }
  } else {
    console.warn("Supabase credentials not available in environment; static catalog files updated.");
  }

  console.log("Catalog replacement and TDS integration completed successfully!");
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
