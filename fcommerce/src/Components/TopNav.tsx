import { MdAddCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
// FaGripLinesVertical

const TopNav = () => {
  return (
    <div>
      <div className='w-[100%] text-white text-sm h-8 bg-gradient-to-br from-[#f2592b] to-[orange] flex items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <p className='flex items-center'><MdAddCall/> +234-7033360836</p>
          <p className='flex items-center'><FaWhatsapp/> +234-8139318929</p>
        </div>
        <div className='lg:flex hidden items-center gap-2'>
          {/* <p>free shipping on all orders over $100</p> */}
          {/* <FaGripLinesVertical/> */}
          <p>Shop Now</p>
        </div>
        <p >Location: LAGOS</p>
      </div>
    </div>
  )
}

export default TopNav