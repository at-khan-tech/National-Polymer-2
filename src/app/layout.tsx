import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AOSProvider } from "@/components/AOSProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Polymer & Plastic Resin Distributor | National Polymers FZ LLC",
  description:
    "National Polymers LLC FZ is a global distribution & trading company involved in plastic raw materials. We deal in Prime, Near Prime, Off Grade Resins, Recycled granules, and polymer regrinds.",
  keywords:
    "National Polymers FZ LLC, polymer distributor Dubai, plastic resin supplier UAE, polyethylene, polypropylene, PVC resin, recycled granules, prime polymers, Al Qusais Dubai UAE",
  icons: {
    icon: "https://www.nationalpolymersfz.com/assets/images/Logo/LOGO%20PNG.png",
    apple: "https://www.nationalpolymersfz.com/assets/images/Logo/LOGO%20PNG.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${montserrat.variable}`}>
      <body className="font-montserrat antialiased bg-white text-gray-900 overflow-x-hidden selection:bg-primary selection:text-white">
        <ThemeProvider>
          <AOSProvider>
            {children}
            <ThemeSwitcher />
          </AOSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
