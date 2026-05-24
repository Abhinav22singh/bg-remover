import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()

  return (
    <div className='flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-3 bg-black border-b border-gray-800 sticky top-0 z-50'>

      <Link to="/">
        <img
          className='w-28 sm:w-32 md:w-36'
          src={assets.logo}
          alt="Logo"
        />
      </Link>

      {isSignedIn
        ? <div className='flex items-center gap-3'>
            <UserButton />
          </div>
        : <button
            onClick={() => openSignIn({})}
            className='flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-300 border border-gray-300 rounded-full hover:bg-gray-300 hover:text-black active:scale-95 transition-all duration-200'
          >
            Get started
            <img className='w-3 h-3 sm:w-3.5 sm:h-3.5' src={assets.arrow_icon} alt="" />
          </button>
      }

    </div>
  )
}

export default Navbar