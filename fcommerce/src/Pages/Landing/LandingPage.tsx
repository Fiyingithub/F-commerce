import {useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import TopNav from '../../Components/TopNav';
import Footer from '../../Components/Footer';
import Categories from './Categories';
import FeaturedProduct from './FeaturedProduct';

import man from '../../Asset/images/man.png';
// import AllProducts from './AllProducts';

function LandingPage() {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <TopNav/>
      <div className="sticky top-0 z-50 w-full">
        <Navbar/>
      </div>
      {/* "primary": "#f2592b",
  //       "secondary": "#feefec",
  //       "hover" : "#ce5733" */}
      <div className=" lg:h-[300px] w-[100%] flex items-center justify-center relative">
        <div className="flex flex-col gap-10 lg:flex-row justify-center items-center lg:max-w-[1100px] bg-[#feefec] w-[100%] pt-10 lg:pt-0 lg:px-10 ">
          <div className="flex flex-col space-y-6 px-4">
            <h1 className="text-[#f2592b] text-3xl lg:text-5xl font-semibold">oneWorld Wireless HeadPhone</h1>
            <button className="bg-[#f2592b] text-white shadow-lg flex justify-center gap-4 w-[150px] py-3 rounded-full hover:scale-105 transition-all duration-700 ease-in-out"> Shop now</button>

            {/* <box-icon name='cart-alt' className="items-center justify-center"></box-icon> */}
          </div>
          <div className='h-[300px] w-[100%] '>
            <img src={man} alt="" className='w-[100%] h-[100%] object-contain' />
          </div>
        </div>
      </div>

      <Categories/>

      {/* Featured product */}
      <FeaturedProduct />
      
      {/* All products */}
      {/* <AllProducts/> */}

      <Footer/>
    </div>
  )
}

export default LandingPage