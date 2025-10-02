"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  heroHeight: number;
  heroSource: string;
};

type Point = { x: number; y: number };

const HeroBackground: React.FC<Props> = ({ heroHeight, heroSource }) => {
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(4289 / 2800);

  const [target, setTarget] = useState<Point>({ x: 0, y: 0 });
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });

  // 画像サイズ調整
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

  // マウスの目標座標を更新
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40; // 最大±20px
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setTarget({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // イージングで追従
  useEffect(() => {
    let frame: number;
    const speed = 0.02; // 追従スピード

    const animate = () => {
      setPos((prev) => ({
        x: prev.x + (target.x - prev.x) * speed,
        y: prev.y + (target.y - prev.y) * speed,
      }));
      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <div className="fixed inset-0 flex justify-center items-start overflow-hidden bg-amber-300 -z-10">
      <Image
        src={heroSource}
        alt="background"
        width={Math.round(imgWidth)}
        height={Math.round(imgHeight)}
        sizes="100vw"
        className="transition-transform duration-75"
        draggable={false}
        style={{
          position: "absolute",
          top: heroHeight / 2,
          transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
          left: "50%",
        }}
        onLoadingComplete={(img) => {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }}
      />
    </div>
  );
};

export default HeroBackground;
