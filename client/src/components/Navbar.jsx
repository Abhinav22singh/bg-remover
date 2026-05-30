import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useContext,useEffect } from 'react'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  const {credit,loadCreditsData} = useContext(AppContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(isSignedIn){
      loadCreditsData()
    }
  }, [isSignedIn])  

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
          <button onClick={()=>navigate("/buy")} className='flex items-center gap-2 bg-gray-700 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gray-800'>
  <img src={assets.credit_icon} alt="" className='w-4 h-4'/>
  <p className='text-white text-sm font-medium'>
    Credits : <span className='text-yellow-400 font-bold'>{credit}</span>
  </p>
</button>
<p className='text-purple-400 max-sm:hidden'>Hi ,{user.fullName}</p>
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