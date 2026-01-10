import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import Client from "src/components/Client";
import PopularBoostingServices from "src/components/Sections/PopularBoostingServices";
import PopularItems from "src/components/Sections/PopularItems";
import ReferralTracker from "src/components/ReferralTracker";
import ChatFloatingButton from "src/components/ChatFloatingButton";
import { fetchHomePageData } from "src/api/products";

type PageProps = {
  searchParams?: Promise<{
    ref?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  // ✅ MUST await searchParams in Next.js 15
  const query = await searchParams;
  const ref = query?.ref;

  const homePageData = await fetchHomePageData();

  return (
    <>
      {ref && <ReferralTracker refCode={ref} />}

      <Navbar dynamicdata={homePageData} />

      <main>
        <Client dynamicdata={homePageData} />
        <PopularBoostingServices dynamicdata={homePageData} />
        <PopularItems dynamicdata={homePageData} />
      </main>

      <ChatFloatingButton dynamicdata={homePageData} />
      <Footer />
    </>
  );
}