import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function DM() {
  const [showModal, setshowModal] = useState(false);
  const [showsidebar, setShowsidebar] = useState(false);
  const [showOnsm, setShowonsm] = useState(false);

  const isSmallScreen = () => window.innerWidth < 640;

  return (
    <div className="flex">
      <div className="flex flex-col">
        <div>
          <nav
            className=" sm:w-222 w-[500px] h-12 top-0  transition-all duration-300 
     
          bg-gray-700/80 border-b border-cyan-500/20 shadow-lg py-2"
            //"bg-transparent backdrop-blur-xl py-4"
          >
            <div className="flex relative  w-50 text-white mt-0 ml-auto mr-5  gap-15 ">
              <button
                onClick={() => setshowModal(!showModal)}
                className="ml-15 rounded-2xl hover:bg-gray-600 w-5 h-10  "
              >
                <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
              </button>

              {showModal && (
                <div className=" absolute inset-0 z-50 w-[200px] h-[230px] mt-12 mr-10 rounded-lg bg-gradient-to-b from-gray-900 to-gray-900/90 text-white ">
                  <div className="flex flex-col">
                    <button className="text-left ml-3 mt-3 w-40 rounded-lg p-1  hover:bg-gray-600/70">
                      View Profile
                    </button>
                    <button className="text-left ml-3 mt-3 w-40 rounded-lg p-1  hover:bg-gray-600/70">
                      Block
                    </button>
                    <button className="text-left ml-3 mt-3  w-40 rounded-lg p-1 hover:bg-gray-600/70">
                      Clear Chat
                    </button>
                    <button className="text-left ml-3 mt-3  w-40 rounded-lg p-1  hover:bg-gray-600/70">
                      Delete Chat
                    </button>
                    <button className="text-left ml-3 mt-3  w-40 rounded-lg p-1 hover:bg-gray-600/70">
                      Show order summary
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setShowsidebar(!showsidebar);
                  if (isSmallScreen()) {
                    setShowonsm(true);
                  }
                }}
              >
                {showsidebar ? (
                  <i className="fa-solid fa-arrow-right text-xl"></i>
                ) : (
                  <i className="fa-solid fa-arrow-left text-xl"></i>
                )}
              </button>
            </div>
          </nav>
        </div>

        {showsidebar ? (
          <>
            <div className="flex">
              <div className="h-[350px] sm:h-[440px] overflow-y-auto w-130">
                <div className="mt-5 justify-center">
                  <div className=" flex w-100 h-60 ml-4  rounded-lg  bg-gradient-to-b from-blue-900/50 to-cyan-600 border border-cyan-600/50 text-white">
                    <div className="h-10">
                      <button
                        className="flex ml-3 mt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-2 py-2 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        tabIndex={0}
                      >
                        <i className="fa-solid fa-circle-user text-xl"></i>
                      </button>
                    </div>
                    <div className="flex flex-col text-left ml-2 mt-4">
                      <div>Admin</div>
                      <div>
                        <p>
                          DON’T return the in-game items under any circumstances
                          after you have received it.
                        </p>
                        <p>
                          DON’T purchase the product listing as a form of
                          payment or as an exchange for other goods.
                        </p>
                        <p>
                          DON’T take the risk by transacting outside of G2G as
                          it is not covered by GamerProtect.
                        </p>
                        <p>Read more about trading safety guidelines.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 justify-center">
                  <div className=" flex w-100 h-60 ml-4 rounded-lg  bg-gradient-to-b from-blue-900/50 to-cyan-600 border border-cyan-600/50 text-white">
                    <div className="h-10">
                      <button
                        className="flex ml-3 mt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-2 py-2 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        tabIndex={0}
                      >
                        <i className="fa-solid fa-circle-user text-xl"></i>
                      </button>
                    </div>
                    <div className="flex flex-col text-left ml-2 mt-4">
                      <div>Admin</div>
                      <div>
                        <p>
                          DON’T return the in-game items under any circumstances
                          after you have received it.
                        </p>
                        <p>
                          DON’T purchase the product listing as a form of
                          payment or as an exchange for other goods.
                        </p>
                        <p>
                          DON’T take the risk by transacting outside of G2G as
                          it is not covered by GamerProtect.
                        </p>
                        <p>Read more about trading safety guidelines.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 justify-center">
                  <div className=" flex w-100 h-60  ml-4 rounded-lg  bg-gradient-to-b from-blue-900/50 to-cyan-600 border border-cyan-600/50 text-white">
                    <div className="h-10">
                      <button
                        className="flex ml-3 mt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-2 py-2 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        tabIndex={0}
                      >
                        <i className="fa-solid fa-circle-user text-xl"></i>
                      </button>
                    </div>
                    <div className="flex flex-col text-left ml-2 mt-4">
                      <div>Admin</div>
                      <div>
                        <p>
                          DON’T return the in-game items under any circumstances
                          after you have received it.
                        </p>
                        <p>
                          DON’T purchase the product listing as a form of
                          payment or as an exchange for other goods.
                        </p>
                        <p>
                          DON’T take the risk by transacting outside of G2G as
                          it is not covered by GamerProtect.
                        </p>
                        <p>Read more about trading safety guidelines.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col w-[350px] h-[580px] ml-4  bg-gray-700/80 text-white
              fixed top-0 right-0 transform transition-transform duration-300 ease-in-out z-40 
          ${showOnsm ? "translate-x-0 bg-gray-900/95" : "translate-x-full"}

          sm:static sm:translate-x-0 sm:block
              
              `}
              >
                <div className="absolute px-1 py-1 mt-2 sm:hidden  ">
                  <button
                    onClick={() => setShowonsm(false)}
                    className="inline-flex items-center text-center text-sm text-gray-400 hover:text-blue-400 mb-0"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1 ml-1" />
                  </button>
                </div>
                <div className="flex mt-10 ">
                  <h4 className="ml-5">Total</h4>
                  <h4 className="ml-auto mr-4">$USD</h4>
                </div>
                <div className="mt-5">
                  <hr></hr>
                </div>
                <div className="flex mt-8 gap-7">
                  <button className="ml-5  hover:text-cyan-400 transition-colors duration-200 font-medium group hover:cursor-pointer">
                    {" "}
                    Active Orders
                  </button>
                  <button className=" hover:text-cyan-400 transition-colors duration-200 font-medium group hover:cursor-pointer">
                    Completed Orders
                  </button>
                </div>
                <div className="text-gray-500/90">
                  <hr></hr>
                </div>
              </div>
            </div>
            <div className="w-120 ml-6 p-4  border border-gray-800/70 bg-gray-700/70  shadow-md hover:shadow-cyan-500/25 text-white rounded-xl absolute bottom-2 ">
              {/* === Toolbar === */}
              <div className="flex items-center space-x-4 mb-2 text-gray-300">
                <button className="hover:text-white">
                  <b>B</b>
                </button>
                <button className="hover:text-white italic">I</button>
                <button className="hover:text-white line-through">S</button>
                <button className="hover:text-white list-decimal">1.</button>
                <button className="hover:text-white list-disc">•</button>
              </div>

              {/* === Input with Send Icon === */}
              <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"
                />
                {/* Send SVG */}
                <button className="ml-2 hover:text-cyan-400 transition">
                  <svg
                    className="w-5 h-5 fill-current text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>

              {/* === Attachment Icon Below === */}
              <div className="mt-2">
                <button className="hover:text-cyan-400 transition flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.5 6.5L7.91 15.09a2.003 2.003 0 01-2.83-2.83L13.67 4.17c1.95-1.95 5.12-1.95 7.07 0 1.95 1.95 1.95 5.12 0 7.07L9.34 21.64a5.5 5.5 0 01-7.78-7.78l9.9-9.9" />
                  </svg>
                  Attach File
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-[350px] sm:h-[440px]  w-[500px] sm:w-[880px] overflow-y-auto">
              <div className="mt-5 justify-center">
                <div className=" flex sm:w-210 sm:h-50 w-100 h-60  ml-4 rounded-lg  bg-gradient-to-b from-blue-900/50 to-cyan-600 border border-cyan-600/50 text-white">
                  <div className="h-10">
                    <button
                      className="flex ml-3 mt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-2 py-2 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      tabIndex={0}
                    >
                      <i className="fa-solid fa-circle-user text-xl"></i>
                    </button>
                  </div>
                  <div className="flex flex-col text-left ml-2 mt-4">
                    <div>Admin</div>
                    <div>
                      <p>
                        DON’T return the in-game items under any circumstances
                        after you have received it.
                      </p>
                      <p>
                        DON’T purchase the product listing as a form of payment
                        or as an exchange for other goods.
                      </p>
                      <p>
                        DON’T take the risk by transacting outside of G2G as it
                        is not covered by GamerProtect.
                      </p>
                      <p>Read more about trading safety guidelines.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 justify-center">
                <div className=" flex sm:w-210 sm:h-50 w-100 h-60 ml-4 rounded-lg  bg-gradient-to-b from-blue-900/50 to-cyan-600 border border-cyan-600/50 text-white">
                  <div className="h-10">
                    <button
                      className="flex ml-3 mt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-2 py-2 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      tabIndex={0}
                    >
                      <i className="fa-solid fa-circle-user text-xl"></i>
                    </button>
                  </div>
                  <div className="flex flex-col text-left ml-2 mt-4">
                    <div>Admin</div>
                    <div>
                      <p>
                        DON’T return the in-game items under any circumstances
                        after you have received it.
                      </p>
                      <p>
                        DON’T purchase the product listing as a form of payment
                        or as an exchange for other goods.
                      </p>
                      <p>
                        DON’T take the risk by transacting outside of G2G as it
                        is not covered by GamerProtect.
                      </p>
                      <p>Read more about trading safety guidelines.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 justify-center">
                <div className=" flex sm:w-[840px] sm:h-50 w-100 h-60 ml-4 rounded-lg  bg-gradient-to-b from-blue-900/50 to-cyan-600 border border-cyan-600/50 text-white">
                  <div className="h-10">
                    <button
                      className="flex ml-3 mt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-2 py-2 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      tabIndex={0}
                    >
                      <i className="fa-solid fa-circle-user text-xl"></i>
                    </button>
                  </div>
                  <div className="flex flex-col text-left ml-2 mt-4">
                    <div>Admin</div>
                    <div>
                      <p>
                        DON’T return the in-game items under any circumstances
                        after you have received it.
                      </p>
                      <p>
                        DON’T purchase the product listing as a form of payment
                        or as an exchange for other goods.
                      </p>
                      <p>
                        DON’T take the risk by transacting outside of G2G as it
                        is not covered by GamerProtect.
                      </p>
                      <p>Read more about trading safety guidelines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[480px] sm:w-[840px] ml-4 p-4  border border-gray-600/90 bg-gray-700/50  shadow-md hover:shadow-cyan-500/25 text-white rounded-xl absolute bottom-2 ">
              {/* === Toolbar === */}
              <div className="flex items-center space-x-4 mb-2 text-gray-300">
                <button className="hover:text-white">
                  <b>B</b>
                </button>
                <button className="hover:text-white italic">I</button>
                <button className="hover:text-white line-through">S</button>
                <button className="hover:text-white list-decimal">1.</button>
                <button className="hover:text-white list-disc">•</button>
              </div>

              {/* === Input with Send Icon === */}
              <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"
                />
                {/* Send SVG */}
                <button className="ml-2 hover:text-cyan-400 transition">
                  <svg
                    className="w-5 h-5 fill-current text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>

              {/* === Attachment Icon Below === */}
              <div className="mt-2">
                <button className="hover:text-cyan-400 transition flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.5 6.5L7.91 15.09a2.003 2.003 0 01-2.83-2.83L13.67 4.17c1.95-1.95 5.12-1.95 7.07 0 1.95 1.95 1.95 5.12 0 7.07L9.34 21.64a5.5 5.5 0 01-7.78-7.78l9.9-9.9" />
                  </svg>
                  Attach File
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
