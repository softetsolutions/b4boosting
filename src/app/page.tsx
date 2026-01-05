import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import Client from "src/components/Client";
import PopularBoostingServices from "src/components/Sections/PopularBoostingServices";
import PopularItems from "src/components/Sections/PopularItems";
import ReferralTracker from "src/components/ReferralTracker";
import ChatFloatingButton from "src/components/ChatFloatingButton";
import { fetchHomePageData } from "src/api/products";

export default async function Home({
  searchParams,
}: {
  searchParams?: { ref?: string };
}) {
 
  const query = await searchParams;
  const ref = query?.ref;

    const homePageData = await fetchHomePageData();
    console.log(homePageData,"homePageData");


  return (
    <>
      {ref && <ReferralTracker refCode={ref} />}
      <Navbar dynamicdata={homePageData} />
      <main>
        <Client  dynamicdata={homePageData} />
        <PopularBoostingServices  dynamicdata={homePageData}/>
        <PopularItems  dynamicdata={homePageData}/>
      </main>

       <ChatFloatingButton dynamicdata={homePageData} />
      <Footer />
    </>
  );
}
