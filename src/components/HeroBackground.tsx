"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HeroBackground = () => {
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(4289 / 2800);

  // サイズ調整
  useEffect(() => {
    const updateSize = () => {
      const maxWidth = window.innerWidth * 0.9;
      let newWidth = maxWidth;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > window.innerHeight) {
        newHeight = window.innerHeight;
        newWidth = newHeight * aspectRatio;
      }

      setImgWidth(newWidth);
      setImgHeight(newHeight);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [aspectRatio]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-amber-300">
      {/* 背景画像 */}
      <Image
        src="/Hero/kitachan.webp"
        alt="background"
        width={Math.round(imgWidth)}
        height={Math.round(imgHeight)}
        sizes="100vw"
        className="transition-transform duration-300"
        draggable={false}
        onLoadingComplete={(img) => {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }}
      />
    </div>
  );
};

export default HeroBackground;
