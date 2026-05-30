import { useContext } from "react"
import { assets, plans } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { toast } from "react-toastify"
import axios from "axios"

const BuyCredit = () => {

  const { backendUrl, loadCreditsData } = useContext(AppContext)
  const navigate = useNavigate()
  const { getToken } = useAuth()

  const initpay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Singularity",
      description: "Credits Purchase",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Payment successful:", response);
        const token = await getToken()
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verify-razor", response, {
            headers: { token }
          })
          if (data.success) {
            toast.success("credit added successfully")
            loadCreditsData()
            navigate("/")
          }
        } catch (error) {
          console.log("Payment verification error:", error)
          toast.error(error.message)
          
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razor",
        { planId },
        { headers: { token } }
      )
      if (data.success) {
        initpay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10 px-4 lg:px-44">

      <button className="border border-gray-400 px-8 py-2 rounded-full mb-6 text-sm text-gray-600 hover:bg-gray-50 transition-all duration-200">
        Our Plans
      </button>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-linear-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-12">
        Choose the plan that's right for you
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 drop-shadow-md rounded-2xl px-8 py-10 flex flex-col items-center gap-4 hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="text-lg font-semibold text-gray-700">{item.id}</p>
            <p className="text-sm text-gray-400 text-center">{item.desc}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              <span className="text-violet-600">${item.price}</span>
              <span className="text-base font-medium text-gray-400"> / {item.credits} credits</span>
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full mt-4 px-6 py-2.5 text-sm font-medium text-white bg-linear-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-300">
              Purchase
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-10">
        By purchasing a plan, you agree to our{" "}
        <span className="text-violet-500 underline cursor-pointer hover:text-violet-700 transition-all duration-200">
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="text-violet-500 underline cursor-pointer hover:text-violet-700 transition-all duration-200">
          Privacy Policy
        </span>
        . All purchases are final and non-refundable.
      </p>

    </div>
  )
}

export default BuyCredit