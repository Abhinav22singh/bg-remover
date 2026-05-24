import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>

      <h1 className="text-center text-5xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-4">
        Customer Reviews
      </h1>
      <p className="text-center text-gray-500 text-sm sm:text-base mb-12">
        What our users are saying about us
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className='bg-white border border-gray-100 drop-shadow-md rounded-2xl p-6 flex flex-col gap-4 hover:scale-105 transition-all duration-500'
          >
            {/* stars */}
            <div className='flex gap-1'>
              {Array(5).fill('').map((_, i) => (
                <span key={i} className='text-yellow-400 text-lg'>★</span>
              ))}
            </div>

            {/* quote */}
            <p className='text-gray-600 text-sm leading-relaxed flex-1'>
              "{item.text}"
            </p>

            {/* author */}
            <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
              <img
                src={item.image}
                alt={item.author}
                className='w-10 h-10 rounded-full object-cover'
              />
              <div>
                <p className='text-sm font-semibold text-gray-800'>{item.author}</p>
                <p className='text-xs text-gray-400'>{item.jobTitle}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Testimonials;