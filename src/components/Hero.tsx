"use client";

import { useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroContents from "./HeroContents";

const Hero: React.FC = () => {
  const [heroSource, setHeroSource] = useState<string>("/hero/kitachan.webp");
  const [heroHeight, setHeroHeight] = useState<number>(0);

  // セクションの高さを決定
  useEffect(() => {
    setHeroHeight(window.innerHeight);
  }, []);

  // Hero 画像変更
  const changeHeroImage = () => {
    // 画像のパスリスト
    const heroPathsList = [
      "/hero/kitachan.webp",
      "/hero/satochan.webp",
      "/hero/carrenchan.webp",
      "/hero/cafechan.webp",
    ];

    // パスリストから現在のパスを除外してランダム取得
    const randomIndex = Math.floor(
      Math.random() * heroPathsList.filter((src) => src !== heroSource).length
    );
    setHeroSource(heroPathsList[randomIndex]);
  };

  return (
    <section
      className="relative w-full z-10 flex items-center justify-center"
      style={{ height: `${heroHeight}px` }}
      onClick={changeHeroImage}
    >
      <HeroBackground heroHeight={heroHeight} heroSource={heroSource} />
      <HeroContents />
    </section>
  );
};

export default Hero;
