import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <ScrollToTop />
      <ToastContainer position='bottom-right' />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App