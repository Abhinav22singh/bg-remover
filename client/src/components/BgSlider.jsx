import { useState } from 'react'
import { assets } from '../assets/assets'

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value)
  }

  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
      
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-4'>
        Remove Background with High <br /> Quality and Accuracy
      </h1>
      <p className='text-center text-gray-500 text-sm sm:text-base mb-12'>
        Drag the slider to see the difference
      </p>

      {/* Slider Container */}
      <div className='relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden select-none' style={{aspectRatio: '16/9'}}>
        
        {/* background image (original) */}
        <img
          src={assets.image_w_bg}
          className='absolute top-0 left-0 w-full h-full object-cover'
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          alt="With background"
        />

        {/* foreground image (removed bg) */}
        <img
          src={assets.image_wo_bg}
          className='absolute top-0 left-0 w-full h-full object-cover'
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          alt="Without background"
        />

        {/* divider line */}
        <div
          className='absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_6px_rgba(0,0,0,0.5)]'
          style={{ left: `${sliderPosition}%` }}
        />

        {/* divider handle */}
        <div
          className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none z-10'
          style={{ left: `${sliderPosition}%` }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-gray-600' fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>

        {/* Labels */}
        <span className='absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full'>Original</span>
        <span className='absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full'>Removed</span>

        {/* range input overlay */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className='absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20'
        />

      </div>
    </div>
  )
}

export default BgSlider