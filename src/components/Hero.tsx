// Hero.tsx
"use client";

import HeroBackground from "./HeroBackground";
import HeroContents from "./HeroContents";

const Hero: React.FC = () => {
  return (
    <section className="w-full h-screen">
      {/* 背景 */}
      <HeroBackground />

      {/* コンテンツ */}
      <HeroContents />
    </section>
  );
};

export default Hero;
