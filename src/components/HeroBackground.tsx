"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  heroHeight: number;
};

const HeroBackground: React.FC<Props> = ({ heroHeight }) => {
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(4289 / 2800);

  useEffect(() => {
    const updateSize = () => {
      const maxWidth = window.innerWidth * 0.9;
      let newWidth = maxWidth;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > heroHeight) {
        newHeight = heroHeight;
        newWidth = newHeight * aspectRatio;
      }

      setImgWidth(newWidth);
      setImgHeight(newHeight);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [aspectRatio, heroHeight]);

  return (
    <div className="fixed inset-0 flex justify-center items-start overflow-hidden bg-amber-300 -z-10">
      <Image
        src="/Hero/kitachan.webp"
        alt="background"
        width={Math.round(imgWidth)}
        height={Math.round(imgHeight)}
        sizes="100vw"
        className="transition-transform duration-300"
        draggable={false}
        style={{
          position: "absolute",
          top: heroHeight / 2, // Hero 高さの中央を基準に
          transform: "translateY(-50%)", // 中央寄せ
        }}
        onLoadingComplete={(img) => {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }}
      />
    </div>
  );
};

export default HeroBackground;
