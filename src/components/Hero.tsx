"use client";

import HeroBackground from "./HeroBackground";
import HeroContents from "./HeroContents";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen z-10 flex items-center justify-center">
      {/* 背景は固定 */}
      <HeroBackground />

      {/* コンテンツはHeroセクション中央 */}
      <HeroContents />
    </section>
  );
};

export default Hero;
