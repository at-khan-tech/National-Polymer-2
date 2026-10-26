import React from "react";
import Link from "next/link";

export const ExpertAdviceCTA: React.FC = () => {
  return (
    <section
      data-aos="fade-up"
      data-aos-offset="100"
      className="flex flex-col w-full bg-primary-darker text-white justify-center items-center py-12 md:py-16 px-5 sm:px-6"
    >
      <div className="flex flex-col container mx-auto text-center max-w-4xl items-center">
        <h2 className="text-3xl md:text-4xl font-light mb-4 leading-tight">
          Need Help Choosing the Right Polymer Grade?
        </h2>
        <p className="text-base md:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed">
          Our Dubai trading desk and technical team are here to assist! Reach out for
          certified specifications, volume pricing, and custom resin solutions tailored to your
          exact manufacturing process.
        </p>
        <Link
          href="#contact"
          className="bg-white text-primary-darker px-8 py-3.5 hover:bg-gray-100 transition-colors duration-300 font-semibold text-sm shadow-md"
        >
          Enquiry Now
        </Link>
      </div>
    </section>
  );
};
