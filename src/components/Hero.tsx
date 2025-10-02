"use client";

import { useCallback, useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroContents from "./HeroContents";

// ヒーロー画像のパスリスト。固定化しないと毎回新しい配列が作られて、useCallbackが無意味。useMemoを使ってもOK
export const heroPathList = [
  "/hero/kitachan.webp",
  "/hero/satochan.webp",
  "/hero/carrenchan.webp",
  "/hero/cafechan.webp",
];

const Hero: React.FC = () => {
  const [heroSource, setHeroSource] = useState<string>("/hero/kitachan.webp");
  const [heroHeight, setHeroHeight] = useState<number>(0);

  // セクションの高さを決定
  useEffect(() => {
    setHeroHeight(window.innerHeight);
  }, []);

  // 画像変更ロジック
  const changeHeroImage = useCallback(() => {
    const candidates = heroPathList.filter((src) => src !== heroSource);
    const randomIndex = Math.floor(Math.random() * candidates.length);
    setHeroSource(candidates[randomIndex]);
  }, [heroSource]); // 依存関係に入れるのは「レンダーごとに変わる値」や「props / state」だけ

  // 5秒ごとに自動で画像切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      changeHeroImage();
    }, 5000);

    return () => clearInterval(interval); // クリーンアップ
  }, [changeHeroImage]);

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
