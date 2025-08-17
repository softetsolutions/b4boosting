import { fetchProducts } from "src/api";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import TrendingServices from "src/components/TrendingServices";


export default async function Home() {
  let res = await fetchProducts();


  return (
    <>
      <Navbar isLoggedIn={false} role={""} />
      {/* bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900  */}
      <section className="min-h-screen
       bg-[#f6f6f6]
      relative overflow-hidden">
        {/* Gaming Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 "></div>

          {/* Gaming Image */}
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
            // style={{
            //   backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            // }}
            ></div>
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0"></div>
          </div>
        </div>

        <div className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-0.5 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  B4Boosting
                </span>
              </h1>
              <div
                className="flex items-center justify-center"
              >
                <span className="text-xl mb-8">yha tag line dalni hai puch ke unse </span>
              </div>
            </div>

            <TrendingServices data={res?.data} />
            {/* companyTagline */}
            <div className="bg-[#dcf5ff] flex mt-10 mb-10 py-6 px-4">
              {/* first container */}
              <div className="flex-1">
                svg yha dalna hai bnana padega.
              </div>
              {/* second container  */}
              <div className="flex-1 p-2 rounded-lg">
                <div className="mb-7">
                  <span className="text-5xl font-sans">Trade Smarter, Play Harder</span>
                </div>
                <div className="flex gap-2 flex-col">
                  <span className="text-lg font-sans">
                    Trade with confidence — B4boosting ensures every transaction is secure and protects you from fraud.
                  </span>
                  <span className="text-lg font-sans">
                    Fast and simple — choose the best deal for your favorite game, pay easily, receive your order, and jump right back into the action.
                  </span>
                  <span className="text-sm font-sans">
                    Join B4boosting today and take your gaming experience to the next level!
                  </span>
                </div>
              </div>
            </div>
            {/* live support */}
            <div className="flex items-center gap-4 justify-center">
              <div className="moneyBackGuarantee w-[400px] text-[#ffffff] flex items-center bg-[#fce7b6] py-6 px-4 gap-2  rounded-lg">
                <div className="iconDiv"><img src='src/assets/images/shield.png'></img></div>
                <div className="flex flex-col text-black gap-5">
                  <span className="text-2xl font-sans">Money-Back Guarantee</span>
                  <span>Receive your order or get a refund. Feel safe with full trading protection!</span>
                  <button className="flex bg-[black] w-[100px] h-[40px] text-white rounded-lg items-center justify-center">Learn More</button>
                </div>
              </div>
              <div className="liveSupport w-[400px] text-[#ffffff] flex items-center bg-[#d1f08f] py-6 px-4 gap-2  rounded-lg">
                <div className="iconDiv">icon</div>
                <div className="flex flex-col text-black gap-5">
                  <span className="text-2xl font-sans">24/7 Live Support</span>

                  <span className="">B4boosting support works around the clock. Contact us at any time!</span>

                  <button className="flex bg-[black] w-[100px] h-[40px] text-white rounded-lg items-center justify-center">Chat Now</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
