import React from "react";

interface LanguageSelectorProps {
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 mt-60 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-zinc-800 text-gray-200 w-100 h-90 rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Localization Setting</h2>

        <div className=" p-2 grid grid-cols-2 gap-4 border-gray-300   space-y-2">
          <h2 className="text-zinc-400 text-40 font-semibold mb-4">
            {" "}
            Country/Region
          </h2>

          <div>
            <p className="flex text-zinc-300 ">
              To change the country, you need a valid mobile number for new
              country.
            </p>
          </div>
        </div>
        <hr className="width-80 text-zinc-400 m-4"></hr>
        <div className=" p-2 grid grid-cols-2 gap-4 border-gray-300  space-y-2">
          <h2 className="text-zinc-400 text-40 font-semibold mb-4">
            {" "}
            Currency
          </h2>

          <div>
            <select className="block w-40 px-3 py-2 pr-8 text-sm rounded-md border border-zinc-700 bg-zinc-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm appearance-none cursor-pointer">
              <option value="Dollar">US dollar</option>
              <option value="INR">Indian rupees</option>
            </select>
          </div>
        </div>
        <div className=" p-3 grid grid-cols-2 gap-4 border-gray-300 justify-center space-y-2">
          <button className="absolute  bg-red-600 text-white p-2 rounded-lg hover:bg-red-400 transition w-18 h-11">
            Save
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-300 hover:text-gray-400 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
