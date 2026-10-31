import React from "react";
import Image from "next/image";
import { Icon } from "./Icons";

export const SocialFeed: React.FC = () => {
  const posts = [
    {
      title: "Container Loading - Jebel Ali Port, Dubai",
      tag: "#NationalPolymers #ResinExport #HDPE",
      imageUrl: "/images/Product/p1.png",
    },
    {
      title: "Lab Melt Flow Index Testing & COA Verification",
      tag: "#PolymerTesting #QA #ASTM",
      imageUrl: "/images/Product/p2.png",
    },
    {
      title: "Recycled PCR Granules - Hot Washed Pellets",
      tag: "#CircularEconomy #rHDPE #Recycling",
      imageUrl: "/images/Product/p3.png",
    },
    {
      title: "Global Petrochemical Industry Delegation",
      tag: "#ArabPlast #Dubai #PlasticsTrading",
      imageUrl: "/images/Product/p4.png",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              Social Highlights
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
              Follow Us @nationalpolymers
            </h2>
          </div>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <span>Follow Our Global Updates</span>
            <Icon name="open-in-new" className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <p className="text-xs font-semibold leading-snug">{post.title}</p>
                <span className="text-[10px] text-primary-lighter mt-1 block">{post.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
