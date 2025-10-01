"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Point = {
  x: number;
  y: number;
};

const HeroBackground = () => {
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(4289 / 2800);

  const [target, setTarget] = useState<Point>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  // --- サイズ調整 ---
  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };
    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

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

  // --- マウス追従 ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setTarget({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- マウス追従 ---
  // useEffect(() => {
  //   const MAX_OFFSET = 20; // ← 最大移動量(px)を制限

  //   const handleMouseMove = (e: MouseEvent) => {
  //     const rawX = (e.clientX / window.innerWidth - 0.5) * 40;
  //     const rawY = (e.clientY / window.innerHeight - 0.5) * 40;

  //     // -MAX_OFFSET ～ +MAX_OFFSET の範囲に制限
  //     const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, rawX));
  //     const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, rawY));

  //     setTarget({ x, y });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  // --- イージングで追従 ---
  useEffect(() => {
    let frame: number;
    const speed = 0.1;

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (target.x - prev.x) * speed,
        y: prev.y + (target.y - prev.y) * speed,
      }));
      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden z-0"
      style={{ height: "var(--app-height)" }}
    >
      {/* 光のエフェクト（後ろに配置） */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full bg-purple-400 opacity-30 blur-3xl transition-transform duration-300"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-pink-400 opacity-20 blur-2xl transition-transform duration-500"
        style={{
          transform: `translate(${position.x * 1.5}px, ${position.y * 1.5}px)`,
        }}
      />

      {/* 背景画像（少し遅れて動かす） */}
      <Image
        src="/Hero/kitachan.webp"
        alt="background"
        width={Math.round(imgWidth)}
        height={Math.round(imgHeight)}
        sizes="100vw"
        className="relative z-10 transition-transform duration-300"
        style={{
          transform: `translate(${position.x * 2}px, ${position.y * 2}px)`,
        }}
        draggable={false}
        onLoadingComplete={(img) => {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }}
      />
    </div>
  );
};

export default HeroBackground;
