import { fetchProducts } from "src/api";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import TrendingServices from "src/components/TrendingServices";

export default async function Home() {
  let res = await fetchProducts();

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
        {/* Gaming Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"></div>

          {/* Gaming Image */}
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-900/90"></div>
          </div>
        </div>

        <div className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                GAME BOOSTING
              </span>
              <br />
              <span className="text-white">SERVICES</span>
            </h1>

            <TrendingServices data={res?.data} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
