"use client";

import { useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroContents from "./HeroContents";

const Hero: React.FC = () => {
  const [imgHeight, setImgHeight] = useState<number>(0);

  useEffect(() => {
    setImgHeight(window.innerHeight);
  }, []);

  return (
    <section
      className="relative w-full z-10 flex items-center justify-center"
      style={{ height: `${imgHeight}px` }}
    >
      <HeroBackground />
      <HeroContents />
    </section>
  );
};

export default Hero;
