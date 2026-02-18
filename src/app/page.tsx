import Hero from "@/components/home/Hero";
import WhatItIs from "@/components/home/WhatItIs";
import HowItWorks from "@/components/home/HowItWorks";
import WhereWeRun from "@/components/home/WhereWeRun";
import PhotosTeaser from "@/components/home/PhotosTeaser";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-16 bg-white md:h-24" />
      <WhatItIs />
      <div className="h-20 bg-gradient-to-b from-white to-charcoal md:h-28" />
      <HowItWorks />
      <div className="h-20 bg-gradient-to-b from-charcoal to-off-white md:h-28" />
      <WhereWeRun />
      <div className="h-20 bg-gradient-to-b from-off-white to-charcoal md:h-28" />
      <PhotosTeaser />
      <div className="h-20 bg-gradient-to-b from-charcoal to-white md:h-28" />
      <FAQ />
    </>
  );
}
