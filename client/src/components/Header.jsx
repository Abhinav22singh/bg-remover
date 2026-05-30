import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const {removeBg} = useContext(AppContext)
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-16 md:py-20 gap-10 md:gap-6">
      
      {/* left side */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 max-w-xl">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Remove the{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background from
          </span>{" "}
          images for free.
        </h1>

        <p className="text-gray-500 text-sm sm:text-base max-w-md">
          Upload your image and we'll remove the background for you instantly, try it now!
        </p>

        <div>
          <input onChange={e => removeBg(e.target.files[0])} accept="image/*" type="file" id="upload1" hidden />
          <label
            htmlFor="upload1"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-700 rounded-full cursor-pointer"
          >
            <img width={20} src={assets.upload_btn_icon} alt="" />
            <span className="text-white text-sm font-medium">
              Upload your image
            </span>
          </label>
        </div>

      </div>

      {/* right side */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
        <img src={assets.header_img} alt="" className="w-full h-auto object-contain" />
      </div>

    </div>
  );
};

export default Header;