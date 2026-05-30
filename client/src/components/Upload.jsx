import { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"


const Upload = () => {

  const {removeBg} = useContext(AppContext)
  return (
    <div>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16'>See the magic, Try now</h1>

      <div className="text-center mb-24">
        <input accept="image/*" onChange={e => removeBg(e.target.files[0])} type="file" id="upload2" hidden />
                  <label
                    htmlFor="upload2"
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-700 rounded-full cursor-pointer"
                  >
                    <img width={20} src={assets.upload_btn_icon} alt="" />
                    <span className="text-white text-sm font-medium">
                      Upload your image
                    </span>
                  </label>
      </div>
      
    </div>
  )
}

export default Upload
