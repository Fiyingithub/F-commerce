// import{ useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Product } from '../../Types/Product';

// const AllCategories = () => {
//   const navigate = useNavigate();

//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   useEffect(() => {
//     const getAllProducts = async () => {
//       try {
//         const res = await axios.get('https://oneworld-fq81.onrender.com/api/Product/GetAllProduct');
//         setAllProducts(res.data)
//         // console.log(res.data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getAllProducts()
//   }, [])

//   const categoryMap = new Map();

//   allProducts.forEach(product => {
//     if (!categoryMap.has(product.category)) {
//       // Split the imageUrl string and get the first URL
//       const firstImage = product.imageUrl.split(",")[0];
//       categoryMap.set(product.category, firstImage);
//     }
//   });

//   // Step 2: Convert the map to an array of objects
//   const uniqueCategoriesWithImages = Array.from(categoryMap).map(([category, image]) => ({
//     category,
//     image
//   }));

//   // console.log(uniqueCategoriesWithImages);

//   return (
//     <div className='flex justify-center my-4 '>
//       <div className='flex flex-col lg:items-center rounded-sm w-full max-w-[1100px] px-2 '>
//         <p className="text-xl font-semibold opacity-85">Browse by Categories</p>
//         {/* <div className=" flex flex-col my-4 space-y-3 px-4 lg:px-10 container ">
//         </div> */}
//         <div className="flex gap-4 space-x-4 overflow-x-scroll lg:overflow-x-hidden py-4 scrollbar-hide ">
//           {uniqueCategoriesWithImages?.map((item, index) => (
//             <div className='cursor-pointer' key={index} onClick={() => navigate(`/products?category=${item.title}`)}>
//               <div className='h-20 w-20 bg-secondary flex items-center justify-center'>
//                 <img src={item.image} alt="" className='w-[80%] object-cover' />
//               </div>
//               <div className='h-6 w-20 '>
//                 <p className='text-center text-sm font-medium'>{item.category}</p>
//               </div>
//             </div>

//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AllCategories



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../Types/Product';

type CategoryWithImage = {
  category: string;
  image: string;
};

const AllCategories = () => {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get('https://oneworld-fq81.onrender.com/api/Product/GetAllProduct');
        setAllProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
  }, []);

  const categoryMap = new Map<string, string>();

  allProducts.forEach((product) => {
    if (product.category && product.imageUrl && !categoryMap.has(product.category)) {
      const firstImage = product.imageUrl.split(',')[0];
      categoryMap.set(product.category, firstImage);
    }
  });
  

  const uniqueCategoriesWithImages: CategoryWithImage[] = Array.from(categoryMap).map(([category, image]) => ({
    category,
    image
  }));

  return (
    <div className='flex justify-center my-4'>
      <div className='flex flex-col lg:items-center rounded-sm w-full max-w-[1100px] px-2'>
        <p className="text-xl font-semibold opacity-85">Browse by Categories</p>
        <div className="flex gap-4 space-x-4 overflow-x-scroll lg:overflow-x-hidden py-4 scrollbar-hide">
          {uniqueCategoriesWithImages?.map((item, index) => (
            <div
              className='cursor-pointer'
              key={index}
              onClick={() => navigate(`/products?category=${item.category}`)}
            >
              <div className='h-20 w-20 bg-secondary flex items-center justify-center'>
                <img src={item.image} alt={item.category} className='w-[80%] object-cover' />
              </div>
              <div className='h-6 w-20'>
                <p className='text-center text-sm font-medium'>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
