"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const worksPathList = [
  "/works/kitachan.webp",
  "/works/satochan.webp",
  "/works/carrenchan.webp",
  "/works/cafechan.webp",
];

const WorksCard = () => {
  // 左右端と中央で別のオフセットを管理
  const [offset, setOffset] = useState({ center: 0, edge: 0 });

  useEffect(() => {
    let frame: number;
    const animate = () => {
      const time = Date.now() / 500; // 時間経過
      const centerOffset = Math.sin(time) * 20; // 中央の振幅 ±20
      const edgeOffset = Math.sin(time + Math.PI / 2) * 10; // 左右端は位相ずらし、振幅小さめ ±10
      setOffset({ center: centerOffset, edge: edgeOffset });

      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative z-20">
      <div className="bg-transparent">
        {/* 上の波線 */}
        <svg
          className="block w-full h-16 -mt-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d={`
                M1200,${60 + offset.edge} 
                C900,${0 + offset.center} 300,${120 + offset.center} 0,${
              60 + offset.edge
            } 
                L0,120 
                L1200,120 
                Z
              `}
            fill="white"
          />
        </svg>

        <div className="h-[2000px] bg-white mx-auto -mt-1">
          <div className=" pt-10 pl-6">
            <h2 className="text-3xl font-bold">Works</h2>
            <p>可愛くてしっとりとしたイラストが得意です</p>
          </div>
          <div className="w-full overflow-hidden">
            <div className="relative overflow-hidden">
              <ul className="flex gap-8 animate-scrol">
                {worksPathList.map((work, index) => (
                  <li
                    key={index}
                    className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5 relative overflow-hidden aspect-[3/4] rounded-2xl"
                  >
                    <Image src={work} alt={work} fill objectFit="cover" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksCard;
