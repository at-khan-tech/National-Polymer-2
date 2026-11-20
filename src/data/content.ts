export interface RegionPoint {
  name: string;
  lon: number;
  lat: number;
  description?: string;
  status?: "active" | "target";
  countries?: string[];
  ports?: string[];
}

export interface RegionsData {
  hub: RegionPoint;
  sourcing: RegionPoint[];
  markets: RegionPoint[];
}

export const regions: RegionsData = {
  hub: {
    name: "Dubai HQ",
    lon: 55.27,
    lat: 25.2,
    description: "Global Commercial Trading Desk & Maritime Crossroads (Jebel Ali Free Zone)",
    status: "active",
    ports: ["Jebel Ali (JAFZA)", "Port Rashid"],
  },
  sourcing: [
    {
      name: "USA Gulf Coast",
      lon: -95.36,
      lat: 29.76,
      description: "World-scale ethylene crackers and refiners in Texas & Louisiana",
      status: "active",
      ports: ["Houston", "Beaumont", "Corpus Christi"],
    },
    {
      name: "Canada",
      lon: -113.49,
      lat: 53.54,
      description: "Alberta polyolefin resin corridors & bulk loading terminals",
      status: "active",
      ports: ["Vancouver", "Prince Rupert"],
    },
    {
      name: "Western Europe",
      lon: 4.4,
      lat: 51.21,
      description: "Antwerp, Rotterdam & European refinery petrochemical hubs",
      status: "active",
      ports: ["Antwerp", "Rotterdam", "Hamburg"],
    },
    {
      name: "Far East Producers",
      lon: 121.47,
      lat: 31.23,
      description: "Tier-1 petrochemical producers across South Korea, Taiwan & Japan",
      status: "active",
      ports: ["Ulsan", "Kaohsiung", "Ningbo", "Yokohama"],
    },
    {
      name: "Australia & Oceania",
      lon: 138.6,
      lat: -34.9,
      description: "Oceania supply access, prime resins & circular compounding",
      status: "active",
      ports: ["Melbourne", "Sydney", "Brisbane"],
    },
  ],
  markets: [
    {
      name: "Indian Subcontinent",
      lon: 72.87,
      lat: 19.07,
      description: "High-volume containerized corridors serving hundreds of plastics converters",
      status: "active",
      countries: ["India", "Pakistan", "Bangladesh", "Sri Lanka"],
      ports: ["Nhava Sheva (JNPT)", "Mundra", "Karachi", "Chittagong", "Colombo"],
    },
    {
      name: "Middle East & GCC",
      lon: 46.72,
      lat: 24.68,
      description: "Regional distribution hub with next-day trucking & bonded buffer stock",
      status: "active",
      countries: ["UAE", "Saudi Arabia", "Oman", "Qatar", "Kuwait", "Bahrain"],
      ports: ["Jebel Ali", "Dammam", "Jubail", "Sohar", "Hamad Port"],
    },
    {
      name: "Turkey",
      lon: 32.85,
      lat: 39.93,
      description: "Direct vessel shipments to major Turkish converting hubs and industrial zones",
      status: "active",
      countries: ["Turkey"],
      ports: ["Mersin", "Istanbul (Ambarli)", "Izmir (Aliaga)", "Gebze"],
    },
    {
      name: "China & Far East",
      lon: 118.0,
      lat: 28.5,
      description: "Serving converters in China, Southeast Asia and regional manufacturing centers",
      status: "active",
      countries: ["China", "Vietnam", "Malaysia", "Indonesia", "Taiwan"],
      ports: ["Shanghai", "Ningbo", "Qingdao", "Haiphong", "Port Klang"],
    },
    {
      name: "East Africa",
      lon: 38.75,
      lat: 6.0,
      description: "Rapidly expanding corridors supplying packaging and infrastructure pipe extruders",
      status: "active",
      countries: ["Ethiopia", "Djibouti", "Kenya", "Tanzania", "Uganda"],
      ports: ["Mombasa", "Dar es Salaam", "Djibouti Port", "Inland ICDs"],
    },
    {
      name: "West Africa",
      lon: 3.37,
      lat: 6.52,
      description: "High-growth target frontier for woven sack, film extrusion & injection moulding resins",
      status: "target",
      countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal"],
      ports: ["Lagos (Apapa / Tin Can)", "Tema", "Abidjan", "Dakar"],
    },
    {
      name: "Australia & New Zealand",
      lon: 148.0,
      lat: -32.0,
      description: "Reliable trans-Pacific and Indian Ocean container service for Australasia",
      status: "active",
      countries: ["Australia", "New Zealand"],
      ports: ["Melbourne", "Sydney", "Brisbane", "Fremantle", "Auckland", "Tauranga"],
    },
    {
      name: "Southern Europe & Mediterranean",
      lon: 14.55,
      lat: 41.5,
      description: "Supplying compliant prime polymers and certified circular rPE/rPP resins",
      status: "active",
      countries: ["Italy", "Spain", "Greece", "Portugal"],
      ports: ["Genoa", "Valencia", "Barcelona", "Piraeus"],
    },
    {
      name: "Latin America",
      lon: -46.63,
      lat: -23.55,
      description: "Direct Atlantic and Pacific charters for packaging and agriculture converters",
      status: "target",
      countries: ["Brazil", "Colombia", "Peru", "Chile", "Mexico"],
      ports: ["Santos", "Paranagua", "Buenaventura", "Callao", "Manzanillo"],
    },
  ],
};
