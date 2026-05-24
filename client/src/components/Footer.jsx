import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-4 px-4 lg:px-44 py-6 border-t border-gray-800 bg-black'>
      
      <img src={assets.logo} alt="" className='h-14 w-auto object-contain' />

      <p className='text-sm text-gray-400'>
        Copyright @singularity.io 2026 || All rights reserved.
      </p>

      <div className='flex items-center gap-4'>
        <img src={assets.twitter_icon} alt="Twitter" className='w-6 h-6 object-contain hover:scale-110 transition-all duration-200 cursor-pointer opacity-60 hover:opacity-100' />
        <img src={assets.facebook_icon} alt="Facebook" className='w-6 h-6 object-contain hover:scale-110 transition-all duration-200 cursor-pointer opacity-60 hover:opacity-100' />
        <img src={assets.google_plus_icon} alt="Google Plus" className='w-6 h-6 object-contain hover:scale-110 transition-all duration-200 cursor-pointer opacity-60 hover:opacity-100' />
      </div>

    </div>
  )
}

export default Footer