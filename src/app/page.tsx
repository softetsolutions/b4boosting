import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import Client from "src/components/Client";
import PopularBoostingServices from "src/components/Sections/PopularBoostingServices";
import PopularItems from "src/components/Sections/PopularItems";
import ReferralTracker from "src/components/ReferralTracker";
import { fetchHomePageData } from "src/api/products";

export default async function Home({
  searchParams,
}: {
  searchParams?: { ref?: string };
}) {
  // Use nullish coalescing safely
  const query = await searchParams;
  const ref = query?.ref;

    const homePageData = await fetchHomePageData();

  return (
    <>
      {ref && <ReferralTracker refCode={ref} />}
      <Navbar dynamicdata={homePageData} />
      <main>
        <Client />
        <PopularBoostingServices />
        <PopularItems />
      </main>
      <Footer />
    </>
  );
}
