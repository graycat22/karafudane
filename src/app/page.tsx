import Hero from "@/components/Hero";
import WorksCard from "@/components/WorksCard";

const Page = () => {
  return (
    <main className="relative">
      {/* Hero */}
      <Hero />

      {/* WorksCardがスクロールで上にかぶさる */}
      <WorksCard />
    </main>
  );
};

export default Page;
