// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { useToast } from '../../Loaders/ToastContext';
// import WaitingLoader from '../../Loaders/WaitingLoader'

// // import { FaRegHeart } from "react-icons/fa";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { MdOutlineClose } from "react-icons/md";

// const AllProducts = () => {
//   const navigate = useNavigate();
//   const { addToCart } = useToast()

//   // if(allProducts){
//   //   const img = allProducts[0].imageUrl
//   // }

//   const [allProducts, setAllProducts] = useState([]);
//   useEffect(() => {
//     const getAllProducts = async () => {
//       try {
//         const res = await axios.get('https://oneworld-fq81.onrender.com/api/Product/GetAllProduct');
//         setAllProducts(res.data)
//         console.log(res.data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getAllProducts()
//   }, [])

//   const [addToCartAlertModal, setAddToCartAlertModal] = useState(false)
//   const handleAddToCart = (item) => {
//     setAddToCartAlertModal(true)
//     const sendToApi = {
//       productId: item.productId,
//       quantity: 1,
//       price: item.price
//     }
//     addToCart(sendToApi)
//   }

//   return (
//     <div >
//       <WaitingLoader />
//       <div className='flex justify-center'>
//         <div className="flex flex-col mx-5 md:mx-10 lg:max-w-[1100px] py-10 bg-white">
//           <p className="text-2xl font-semibold my-5 opacity-85">All Categories</p>
//           <div className="flex justify-between flex-col flex-wrap gap-10 sm:flex-row mx-4 sm:mx-0 ">
//             {allProducts.map((item) => (
//               <div key={item.productId} className='md:w-56 overflow-hidden h-78 transition-all duration-500 ease-in-out'>
//                 <div className='w-[100%] h-52 flex items-center justify-center bg-[#fff9f8] rounded-lg relative'>
//                   <img src={item.imageUrl !== undefined && item.imageUrl !== null ? item.imageUrl.split(",")[1] : null} alt="" className='w-[40%] lg:w-[80%] object-contain' />
//                   {/* <div className='absolute top-2 right-2 h-7 w-7 bg-white rounded-full flex items-center justify-center'>
//                     <FaRegHeart className='text-primary'/>
//                   </div> */}
//                 </div>
//                 <div className='h-28 flex flex-col justify-between '>
//                   <div className='flex justify-between h-6'>
//                     <h1 className='font-semibold'>{item.name}</h1>
//                     <p className='font-semibold'><span className='text-[10px]'>₦</span>{item.price}</p>
//                   </div>
//                   <div className='h-12 overflow-hidden text-ellipsis whitespace-normal break-words line-clamp'>
//                     <p className='text-sm'>{item.description}</p>
//                   </div>
//                   <div className='space-x-2'>
//                     <button className='border border-primary py-1 px-4 rounded-full font-medium hover:bg-gradient-to-br from-primary to-[orange] ' onClick={() => navigate(`/productdetails/?productId=${item.productId}`, { state: item })}>View</button>
//                     <button className='border border-primary py-1 px-4 rounded-full font-medium hover:bg-gradient-to-br from-primary to-[orange] ' onClick={() => handleAddToCart(item)}>Add to cart</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {addToCartAlertModal && (
//         <div className='fixed p-4 z-50 flex items-center justify-center left-0 top-0 w-full h-full bg-[#00000066]'>
//           <div className='bg-white py-14 px-4 lg:p-20 rounded-xl space-y-4 relative'>
//             <div className='flex items-center'>
//               <IoIosCheckmarkCircle className='text-xl lg:text-2xl text-green-500' />
//               <span className='text-[11px] lg:text-[14px]'>Product added to cart. Continue to cart?</span>
//             </div>
//             <div className='space-x-4'>
//               <button className='bg-yellow-400 rounded-md px-4 py-1 text-[11px] lg:text-[14px] ' onClick={() => navigate('/cart')}>Yes</button>
//               <button className='bg-primary rounded-md px-4 py-1 text-white text-[11px] lg:text-[14px]' onClick={() => setAddToCartAlertModal(false)}>Add more items</button>
//             </div>
//             <MdOutlineClose className='cursor-pointer text-xl lg:text-2xl absolute right-4 top-1' onClick={() => setAddToCartAlertModal(false)} />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllProducts








import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../../Loaders/ToastContext';
import WaitingLoader from '../../Loaders/WaitingLoader';

import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { Product } from '../../Types/Product';


const AllProducts: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useToast();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addToCartAlertModal, setAddToCartAlertModal] = useState<boolean>(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get<Product[]>('https://oneworld-fq81.onrender.com/api/Product/GetAllProduct');
        setAllProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  const handleAddToCart = (item: Product) => {
    setAddToCartAlertModal(true);
    const sendToApi = {
      productId: item.productId,
      quantity: 1,
      price: item.price,
    };
    console.log(sendToApi)
    addToCart(sendToApi);
  };

  const getImageSrc = (url: string | null) => {
    if (!url) return '';
    const parts = url.split(',');
    return parts.length > 1 ? parts[1] : parts[0];
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);

  if (loading) return <WaitingLoader />;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mx-5 md:mx-10 lg:max-w-[1100px] py-10 bg-white">
        <p className="text-2xl font-semibold my-5 opacity-85">All Categories</p>
        <div className="flex justify-between flex-col flex-wrap gap-10 sm:flex-row mx-4 sm:mx-0">
          {allProducts.map((item) => (
            <div key={item.productId} className="md:w-56 overflow-hidden h-78 transition-all duration-500 ease-in-out">
              <div className="w-full h-52 flex items-center justify-center bg-[#fff9f8] rounded-lg relative">
                <img
                  src={getImageSrc(item.imageUrl)}
                  alt={item.name}
                  className="w-[40%] lg:w-[80%] object-contain"
                />
              </div>
              <div className="h-28 flex flex-col justify-between">
                <div className="flex justify-between h-6">
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="font-semibold text-sm">{formatPrice(item.price)}</p>
                </div>
                <div className="h-12 overflow-hidden text-ellipsis whitespace-normal break-words">
                  <p className="text-sm">{item.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="border border-primary py-1 px-4 rounded-full font-medium hover:bg-gradient-to-br from-primary to-[orange]"
                    onClick={() => navigate(`/productdetails/?productId=${item.productId}`, { state: item })}
                    aria-label={`View ${item.name}`}
                  >
                    View
                  </button>
                  <button
                    className="border border-primary py-1 px-4 rounded-full font-medium hover:bg-gradient-to-br from-primary to-[orange]"
                    onClick={() => handleAddToCart(item)}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {addToCartAlertModal && (
        <div
          className="fixed p-4 z-50 flex items-center justify-center left-0 top-0 w-full h-full bg-[#00000066]"
          onClick={() => setAddToCartAlertModal(false)}
        >
          <div
            className="bg-white py-14 px-4 lg:p-20 rounded-xl space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center">
              <IoIosCheckmarkCircle className="text-xl lg:text-2xl text-green-500" />
              <span className="text-[11px] lg:text-[14px] ml-2">
                Product added to cart. Continue to cart?
              </span>
            </div>
            <div className="space-x-4">
              <button
                className="bg-yellow-400 rounded-md px-4 py-1 text-[11px] lg:text-[14px]"
                onClick={() => navigate('/cart')}
              >
                Yes
              </button>
              <button
                className="bg-primary rounded-md px-4 py-1 text-white text-[11px] lg:text-[14px]"
                onClick={() => setAddToCartAlertModal(false)}
              >
                Add more items
              </button>
            </div>
            <MdOutlineClose
              className="cursor-pointer text-xl lg:text-2xl absolute right-4 top-1"
              onClick={() => setAddToCartAlertModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
