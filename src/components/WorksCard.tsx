"use client";

import { useEffect, useState } from "react";

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
    <div className="relative z-20">
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

        <div className="h-[2000px] bg-white max-w-6xl mx-auto -mt-1">
          <h2 className="text-3xl font-bold mb-8">Works</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <li className="p-4 rounded-lg">作品1</li>
            <li className="p-4 rounded-lg">作品2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorksCard;
