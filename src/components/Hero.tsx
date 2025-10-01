"use client";

import { useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroContents from "./HeroContents";

const Hero: React.FC = () => {
  const [heroHeight, setHeroHeight] = useState<number>(0);

  useEffect(() => {
    setHeroHeight(window.innerHeight);
  }, []);

  return (
    <section
      className="relative w-full z-10 flex items-center justify-center"
      style={{ height: `${heroHeight}px` }}
    >
      <HeroBackground heroHeight={heroHeight} />
      <HeroContents />
    </section>
  );
};

export default Hero;
