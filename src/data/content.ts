export interface RegionPoint {
  name: string;
  lon: number;
  lat: number;
  description?: string;
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
    description: "Global Trading Headquarters & Maritime Crossroads (Jebel Ali)",
  },
  sourcing: [
    {
      name: "USA",
      lon: -95.36,
      lat: 29.76,
      description: "US Gulf Coast Petrochemical Hubs & Refineries",
    },
    {
      name: "Canada",
      lon: -113.49,
      lat: 53.54,
      description: "Alberta Polyolefin & Resin Corridors",
    },
    {
      name: "Western Europe",
      lon: 4.4,
      lat: 51.21,
      description: "Antwerp & Rotterdam Refineries",
    },
    {
      name: "Far East",
      lon: 121.47,
      lat: 31.23,
      description: "East Asian Petrochemical & Compounding Producers",
    },
    {
      name: "Australia",
      lon: 144.96,
      lat: -37.81,
      description: "Oceania Distribution & Refineries",
    },
  ],
  markets: [
    {
      name: "Indian Subcontinent",
      lon: 72.87,
      lat: 19.07,
      description: "Nhava Sheva, Mundra, Karachi, Chittagong, Colombo",
    },
    {
      name: "Africa",
      lon: 36.82,
      lat: -1.29,
      description: "Durban, Mombasa, Lagos, Alexandria, Tema, Dar es Salaam",
    },
    {
      name: "Middle East & GCC",
      lon: 46.72,
      lat: 24.68,
      description: "UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain",
    },
    {
      name: "Latin America",
      lon: -46.63,
      lat: -23.55,
      description: "Santos, Paranagua, Buenaventura, Callao, Manzanillo",
    },
    {
      name: "Southern Europe",
      lon: 28.97,
      lat: 41.0,
      description: "Mersin, Istanbul, Antwerp, Rotterdam, Genoa, Valencia",
    },
  ],
};
