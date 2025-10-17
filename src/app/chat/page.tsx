"use client";
import { ArrowLeft, SearchIcon } from "lucide-react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import Adminchat from "../../components/ChatComps/AdminChat";
import Group from "../../components/ChatComps/Group";
import DM from "../../components/ChatComps/Dm";

export default function Chat() {
  const [profile, setProfile] = useState(false);
  const [showup, setShowup] = useState(false);
  const [showArrow, setShowarrow] = useState(false);
  const [showDMtri, setShowDMtri] = useState(false);
  const [showDMarrow, setShowDMarrow] = useState(false);
  const [activeChat, setactiveChat] = useState<string | null>(null);
  const [isOpen, setisOpen] = useState(false);

  const isSmallScreen = () => window.innerWidth < 640;

  return (
    <div className="flex  h-screen text-white justify-center  bg-gradient-to-b from-gray-800/60 to-gray-800/70 overflow-hidden">
      {/* <div className=" w-8 sm:w-10">
        <div className="px-1 py-1 mt-2 ml-1">
          <Link
            to="/"
            className="inline-flex items-center text-center text-sm text-gray-400 hover:text-blue-400 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1 ml-1" />
          </Link>
        </div>
      </div> */}
      <div className=" w-[440px] sm:w-[450px] border border-gray-800/40  justify-center">
        <div className="flex flex-col">
          <div className="flex">
            <div className="relative ml-auto mr-20">
              <button
                onClick={() => setProfile(!profile)}
                className="flex absolute  mt-3 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                tabIndex={0}
              >
                <i className="fa-solid fa-circle-user text-xl"></i>
              </button>
              {profile && (
                <div className=" fixed inset-0 z-50 w-60 h-60 mt-16 ml-50 rounded-lg bg-gradient-to-b from-gray-800/70 to-gray-700/70 text-white backdrop-blur-sm border border-gray-700/50">
                  <div className="flex">
                    <div>
                      <button
                        className="flex ml-3 mt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-2 py-2 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        tabIndex={0}
                      >
                        <i className="fa-solid fa-circle-user text-xl"></i>
                      </button>
                    </div>
                    <div className="flex flex-col ml-3 mt-3">
                      <h2>ballpoolshop</h2>
                      <span className="text-xs">Level 79</span>
                      <span className="text-xs">Account ID 1000772636</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <hr className="text-cyan-300/50 text-1"></hr>
                  </div>

                  <div className="flex flex-col">
                    <button className="text-left ml-3 mt-3 w-50 p-1 hover:bg-gray-700/70 rounded-lg">
                      Chat setting
                    </button>
                    <button className="text-left ml-3 mt-3 w-50 p-1 hover:bg-gray-700/70 rounded-lg">
                      Profile Setting
                    </button>
                    <button className="text-left ml-3 mt-3 w-50 p-1 hover:bg-gray-700/70 rounded-lg">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              className="flex absolute  mt-3 ml-70 items-center bg-gradient-to-r from-gray-600/80 to-gray-700/90 hover:from-gray-600 hover:to-gray-700  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
              tabIndex={0}
            >
              <i className="fa-solid fa-bell text-xl"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 bg-white/12 backdrop-blur-md rounded-3xl p-2 mt-18 w-100 sm:w-100 ml-7 hover:bg-white/17 ">
          <div className="flex-1 relative ">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="w-4 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search "
              className="w-50 sm:w-50 h-5 bg-transparent text-white placeholder-gray-300 pl-12 pr-6 py-4 rounded-xl focus:outline-none "
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col mt-6">
            <div className="border border-gray-800/40 bg-gray-700/20 hover:bg-gray-700/40 mt-2 p-1">
              <button
                onClick={() => {
                  setactiveChat("Admin");
                  if (isSmallScreen()) {
                    setisOpen(true);
                  }
                }}
                className=" flex flex-row text-gray-200 p-3  rounded-lg transition w-100 h-18 ml-6"
              >
                <div>
                  <button
                    className="flex  items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    tabIndex={0}
                  >
                    <i className="fa-solid fa-circle-user text-2xl"></i>
                  </button>
                </div>
                <div className="flex flex-col w-25 items-center text-left justify-center mt-2 ">
                  <h3 className="text-left">Admin</h3>
                  <h3>Welcome!</h3>
                </div>
              </button>
            </div>

            <div className="h-99  overflow-y-auto">
              <div>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setShowup(!showup)}>
                    {showup ? (
                      <svg
                        className="w-4 h-3 text-white-500"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="10,30 90,30 50,80" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-3 text-white-500"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="30,10 30,90 80,50" />
                      </svg>
                    )}
                  </button>
                  <button>Groups</button>
                  <button onClick={() => setShowarrow(!showArrow)}>
                    {showArrow ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-4 text-white/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-4 text-white/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {showArrow && (
                  <div className=" fixed inset-0 z-50 w-40 h-40 mt-65 ml-25 rounded-lg bg-gradient-to-b from-gray-800/70 to-gray-700/70 text-white backdrop-blur-sm  border border-gray-700/80">
                    <div className="flex flex-col">
                      <button className="text-left ml-3 mt-3 w-32 p-1 rounded-lg hover:bg-gray-700/70">
                        Manage groups
                      </button>
                      <button className="text-left ml-3 mt-3 w-32 p-1 rounded-lg hover:bg-gray-700/70">
                        All groups
                      </button>
                      <button className="text-left ml-3 mt-3 w-32 p-1 rounded-lg hover:bg-gray-700/70">
                        Unread
                      </button>
                    </div>
                  </div>
                )}
                {showup && (
                  <>
                    <div className="border border-gray-800/40 bg-gray-700/20 p-1 mt-3  hover:bg-gray-700/40 ">
                      <button
                        onClick={() => {
                          setactiveChat("Group1");
                          if (isSmallScreen()) {
                            setisOpen(true);
                          }
                        }}
                        className=" flex flex-row text-gray-200 p-3 rounded-lg transition w-100 h-[72px] ml-6"
                      >
                        <div>
                          <button
                            className="flex  items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                            tabIndex={0}
                          >
                            <i className="fa-solid fa-circle-user text-2xl"></i>
                          </button>
                        </div>
                        <div className="w-50 items-center text-left justify-center mt-2 ml-3">
                          <h3>Game Accounts</h3>
                        </div>
                      </button>
                    </div>
                    <div className="border border-gray-800/40 bg-gray-700/20 p-1 mt-3 hover:bg-gray-700/40">
                      <button
                        onClick={() => {
                          setactiveChat("Group2");
                          if (isSmallScreen()) {
                            setisOpen(true);
                          }
                        }}
                        className=" flex flex-row text-gray-200 p-3 rounded-lg transition w-100 h-18 ml-6"
                      >
                        <div>
                          <button
                            className="flex  items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                            tabIndex={0}
                          >
                            <i className="fa-solid fa-circle-user text-2xl"></i>
                          </button>
                        </div>
                        <div className="w-50 items-center text-left justify-center mt-2 ml-3">
                          <h3>Game Coins</h3>
                        </div>
                      </button>
                    </div>
                    <div className="border border-gray-800/40 bg-gray-700/20 p-1 mt-3  hover:bg-gray-700/40">
                      <button
                        onClick={() => {
                          setactiveChat("Group3");
                          if (isSmallScreen()) {
                            setisOpen(true);
                          }
                        }}
                        className=" flex flex-row text-gray-200 p-3 rounded-lg  transition w-100 h-18 ml-6"
                      >
                        <div>
                          <button
                            className="flex  items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                            tabIndex={0}
                          >
                            <i className="fa-solid fa-circle-user text-2xl"></i>
                          </button>
                        </div>
                        <div className="w-50 items-center text-left justify-center mt-2 ml-3">
                          <h3>Boosting</h3>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setShowDMtri(!showDMtri)}>
                    {showDMtri ? (
                      <svg
                        className="w-4 h-3 text-white-500"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="10,30 90,30 50,80" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-3 text-white-500"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="30,10 30,90 80,50" />
                      </svg>
                    )}
                  </button>
                  <button>Direct Messages</button>
                  <div className="relative">
                    <button onClick={() => setShowDMarrow(!showDMarrow)}>
                      {showDMarrow ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-4 text-white/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-4 text-white/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      )}
                    </button>

                    {showDMarrow && (
                      <div className=" absolute inset-0 z-50 w-40 h-50 mt-6 rounded-lg bg-gradient-to-b from-gray-800/70 to-gray-700/70 text-white backdrop-blur-sm border border-gray-700/80">
                        <div className="flex flex-col">
                          <button className="text-left ml-3 mt-3 w-30 p-1 rounded-lg  hover:bg-gray-700/70">
                            All Contacts
                          </button>
                          <button className="text-left ml-3 mt-3  w-30 p-1 rounded-lg hover:bg-gray-700/70">
                            Active Orders
                          </button>
                          <button className="text-left ml-3 mt-3  w-30 p-1 rounded-lg hover:bg-gray-700/70">
                            Unread
                          </button>
                          <button className="text-left ml-3 mt-3  w-30 p-1 rounded-lg  hover:bg-gray-700/70">
                            Block Contacts
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {showDMtri && (
                <>
                  <div className=" group border border-gray-800/40 bg-gray-700/20 p-1 mt-3  hover:bg-gray-700/40">
                    <button
                      onClick={() => {
                        setactiveChat("DM1");
                        if (isSmallScreen()) {
                          setisOpen(true);
                        }
                      }}
                      className=" flex flex-row text-gray-200 p-3 rounded-lg  transition w-100 h-18 ml-6"
                    >
                      <div>
                        <button
                          className="group-hover:translate-x-5 flex  items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                          tabIndex={0}
                        >
                          <i className="fa-solid fa-circle-user text-2xl"></i>
                        </button>
                      </div>
                      <div className=" group-hover:translate-x-5 w-50 items-center text-left justify-center mt-2 ml-3">
                        <h3>Owner</h3>
                      </div>
                    </button>
                  </div>
                  <div className="group border border-gray-800/40 bg-gray-700/20 p-1 mt-3  hover:bg-gray-700/40">
                    <button
                      onClick={() => {
                        setactiveChat("DM2");
                        if (isSmallScreen()) {
                          setisOpen(true);
                        }
                      }}
                      className=" flex flex-row text-gray-200 p-3 rounded-lg  transition w-100 h-18 ml-6"
                    >
                      <div>
                        <button
                          className="flex group-hover:translate-x-5  items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                          tabIndex={0}
                        >
                          <i className="fa-solid fa-circle-user text-2xl"></i>
                        </button>
                      </div>
                      <div className="group-hover:translate-x-5 w-50 items-center text-left justify-center mt-2 ml-3">
                        <h3>Owner</h3>
                      </div>
                    </button>
                  </div>
                  <div className="group border border-gray-800/40 bg-gray-700/20 p-1 mt-3 hover:bg-gray-700/40">
                    <button
                      onClick={() => {
                        setactiveChat("DM3");
                        if (isSmallScreen()) {
                          setisOpen(true);
                        }
                      }}
                      className=" flex flex-row text-gray-200 p-3 rounded-lg   transition w-100 h-18 ml-6"
                    >
                      <div>
                        <button
                          className="group-hover:translate-x-5 flex  items-center bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-3 py-3 rounded-3xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                          tabIndex={0}
                        >
                          <i className="fa-solid fa-circle-user text-2xl"></i>
                        </button>
                      </div>
                      <div className=" group-hover:translate-x-5 w-50 items-center text-left justify-center mt-2 ml-3">
                        <h3>Owner</h3>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col w-lg sm:w-4xl h-screen  text-right border border-gray-600/90 bg-gradient-to-b from-gray-700/20 to-gray-800/70
        fixed top-0 right-0 transform transition-all duration-300 ease-in-out z-0
          ${isOpen ? "translate-x-0 bg-gray-800/80" : "translate-x-full"}

          sm:static sm:translate-x-0 sm:block
        `}
      >
        <div className="absolute px-1 py-1 mt-2 sm:hidden  ">
          <button
            onClick={() => setisOpen(false)}
            className="inline-flex items-center text-center text-sm text-gray-400 hover:text-blue-400 mb-0"
          >
            <ArrowLeft className="w-4 h-4 mr-1 ml-1" />
          </button>
        </div>

        <div key={activeChat}>
          {activeChat === "Admin" && <Adminchat />}
          {activeChat === "Group1" && <Group />}
          {activeChat === "Group2" && <Group />}
          {activeChat === "Group3" && <Group />}
          {activeChat === "DM1" && <DM />}
          {activeChat === "DM2" && <DM />}
          {activeChat === "DM3" && <DM />}
        </div>
      </div>
    </div>
  );
}
