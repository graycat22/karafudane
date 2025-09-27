"use client";

const Home = () => {
  return (
    <div className="">
      {/* 背景の額縁 */}
      <div className="fixed inset-2 bg-slate-100 border-t-2 border-l-2 border-cyan-300 rounded-tl z-0"></div>

      {/* コンテンツ本体 */}
      <div className="relative z-10 h-[2000px]">
        <div className="absolute inset-6">
          <p>からふ's Official</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
