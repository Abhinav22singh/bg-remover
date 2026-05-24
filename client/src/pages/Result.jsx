import { assets } from "../assets/assets";

const Result = () => {
  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        {/* Image Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Left Side */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img
              className="rounded-md border w-full h-auto"
              src={assets.image_w_bg}
              alt=""
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 mb-2">
              Background Removed
            </p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              {/* <img src={assets.image_wo_bg} alt="" /> */}
              <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2">
                <div className="flex flex-col items-center gap-3">
                  {/* Loader */}
                  <div className="h-6 w-44 overflow-hidden rounded-full bg-zinc-800 shadow-inner">
                    <div className="h-full w-full animate-[loading_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400" />
                  </div>

                  {/* Text */}
                  <p className="animate-pulse text-sm font-semibold tracking-widest text-gray-500">
                    LOADING...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="px-8 py-2.5 text-sm font-medium text-violet-600 border border-violet-600 rounded-full hover:bg-violet-50 transition-all duration-200">
            Try another image
          </button>
          <button className="px-8 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-300">
            Download image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
