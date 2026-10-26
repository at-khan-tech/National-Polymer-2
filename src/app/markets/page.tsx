import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";

const MARKETS_LIST = [
  {
    id: "middle-east",
    name: "Middle East & GCC",
    countries: "United Arab Emirates, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain",
    ports: "Jebel Ali, Dammam, Jubail, Sohar, Hamad Port, Khalifa Port",
    description: "Our home trading hub. We provide rapid container trucking, bonded warehouse buffer inventory in JAFZA, and local credit solutions for GCC converters.",
  },
  {
    id: "indian-subcontinent",
    name: "Indian Subcontinent",
    countries: "India, Pakistan, Bangladesh, Sri Lanka, Nepal",
    ports: "Nhava Sheva, Mundra, Chennai, Karachi, Port Qasim, Chittagong, Colombo",
    description: "One of our highest volume export corridors. Sourcing prime and near-prime polyolefins with extended 14-21 day container detention for smooth ICD rail transit.",
  },
  {
    id: "africa",
    name: "African Continent",
    countries: "Egypt, Kenya, Nigeria, South Africa, Ghana, Tanzania, Ethiopia",
    ports: "Durban, Mombasa, Lagos (Apapa/Tin Can), Alexandria, Tema, Dar es Salaam",
    description: "Long-standing relationships with industrial converters across East, West, and Southern Africa, offering competitive CIF ocean freight and containerized deliveries.",
  },
  {
    id: "europe",
    name: "Europe & Mediterranean",
    countries: "Turkey, Poland, Italy, Germany, Spain, Greece",
    ports: "Mersin, Istanbul, Antwerp, Rotterdam, Genoa, Valencia",
    description: "High-spec prime polyolefins, recycled rPET/rPE compliant with EU plastic taxation, and engineering compounds.",
  },
  {
    id: "latin-america",
    name: "Latin America",
    countries: "Brazil, Colombia, Mexico, Chile, Peru, Argentina",
    ports: "Santos, Paranagua, Buenaventura, Callao, Manzanillo, Veracruz",
    description: "Trans-Pacific and Atlantic container routes delivering prime, off-grade, and near-prime resins to Latin American packaging and agricultural processors.",
  },
];

export default function MarketsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        <section className="bg-navy text-white py-14 md:py-20 mb-12">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Global Markets</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              International Polymer Trading Corridors
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              Serving manufacturing converters in over 40 countries across 5 key continents with localized shipping expertise and customs documentation.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="space-y-6">
            {MARKETS_LIST.map((market, idx) => (
              <div
                key={market.id}
                id={market.id}
                className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Region 0{idx + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">{market.name}</h2>
                    <p className="text-xs font-semibold text-gray-500">
                      Key Countries: {market.countries}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed pt-1">
                      {market.description}
                    </p>
                    <div className="pt-2 text-xs text-gray-600">
                      <strong>Major Discharge Ports:</strong>{" "}
                      <span className="text-primary font-mono">{market.ports}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex md:flex-col gap-2">
                    <Link
                      href="/enquiry"
                      className="rounded bg-primary hover:bg-primary-darker text-white text-xs font-semibold px-5 py-2.5 text-center transition-colors shadow-sm"
                    >
                      Request CIF Rate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
