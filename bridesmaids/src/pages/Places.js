import { Flex, Image, Text, VStack , Grid, GridItem , Spinner } from "@chakra-ui/react";
import FilterBar from "../component/FilterBar";
import Navbar from "../component/Navbar";
import ProductCard from "../component/ProductCard";
import Title from "../component/Title";
import { useState , useEffect } from "react";

const Places=()=>{
    const navbarItems=[
        {
            label:"تسجيل الدخول",
            path:"/login"
        },{
            label:"تسجيل",
            path:"/role"
        }
    ]

    const navbarItems2=[
        {
            label:"تواصل معنا",
            path:"/contact"
        },{
            label:"عن وصيفة",
            path:"/about"
        },{
            label:"اماكن الزفاف",
            path:"/places"
        }
    ]

    const buttonList = [
      {
        title: 'الكل',
        fun: () => {
          setPlaces([])
          setLoading(true)
          fetchAllPlaces()
        },
      },
      {
        title: 'قاعات',
        fun: () => {
          setPlaces([])
          setLoading(true)
          fetchPlacesBySubCategory(1)
        },
      },
      {
        title: 'فنادق',
        fun: () => {
          setPlaces([])
          setLoading(true)
          fetchPlacesBySubCategory(2)
        },
      },
      {
        title: 'استراحات',
        fun: () => {
          setPlaces([])
          setLoading(true)
          fetchPlacesBySubCategory(3)
        },
      },
      {
        title: 'شاليهات',
        fun: () => {
          setPlaces([])
          setLoading(true)
          fetchPlacesBySubCategory(4)
        },
      },
    ];

    const [places,setPlaces]=useState([]);
    const [loading, setLoading] = useState(true);

   
   // PLACES
    useEffect(()=>{
      const fetchPlaces= async()=>{
          const request= await fetch("api/v1/product/getByCategory/"+1);
          const data= await request.json();

          const placesMap = data.map((place) =>{

    
              return {
                id: place.id,
                vendorId:place.vendorId,
                name:place.name,
                description: place.description,
                picture:"/",
                vendorName:"Maha"
                };
           })
            // list of promise
            setPlaces(placesMap); 
            setLoading(false)
      };
      fetchPlaces();
    },[]);


    // GET ALL
    const fetchAllPlaces= async()=>{
      let pic=""
      const request= await fetch("api/v1/product/getByCategory/"+1);
      const data= await request.json();

      const placesMap = data.map((place) => {
        
      
          return {
          id: place.id,
          vendorId:place.vendorId,
          name:place.name,
          description: place.description,
          picture:"/",
          vendorName:"Maha"
          };

        });

        setPlaces(placesMap);
        setLoading(false)

  };


   // GET PLACE BY SUBCATEGORY
    const fetchPlacesBySubCategory= async(subCategory)=>{
      let pic=""
      const request= await fetch("/api/v1/product/getBySubCategory/"+subCategory);
      const data= await request.json();

      const placesMap = data.map((place) => {

  
          return {
          id: place.id,
          vendorId:place.vendorId,
          name:place.name,
          description: place.description,
          picture:"/",
          vendorName:"Maha"
          };

        });

        setPlaces(placesMap);
  };

  
 
  //  // VENDER NAME
  //   useEffect(()=>{
  //     places.map((place) => {
  //     const fetchVendor= async()=>{
  //         const request= await fetch("api/v1/vendor/get/"+place.vendorId);
  //         const data= await request.json();
  //         console.log(data.userId)

  //         const fetchVendorName= async()=>{
  //           const request= await fetch("api/v1/user/getUser/"+data.userId);
  //           const data2= await request.json();
  //           console.log(data2)
  //       };
  //       fetchVendorName();

  //     };
  //       fetchVendor();
  //   })
  //   },[]);


 


return(
    <>
    <VStack>
    
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
    <Title title={"أماكن الزفاف"}/>
    <FilterBar buttonList={buttonList}/>
    {loading? <Spinner /> :
    <ProductCard productList={places}/>
    }

    </VStack>
    </>
    )
}
export default Places;













// import { Flex, Image, Text, VStack , Grid, GridItem , Spinner } from "@chakra-ui/react";
// import FilterBar from "../component/FilterBar";
// import Navbar from "../component/Navbar";
// import ProductCard from "../component/ProductCard";
// import Title from "../component/Title";
// import { useState , useEffect } from "react";

// const Places=()=>{
//     const navbarItems=[
//         {
//             label:"تسجيل الدخول",
//             path:"/login"
//         },{
//             label:"تسجيل",
//             path:"/role"
//         }
//     ]

//     const navbarItems2=[
//         {
//             label:"تواصل معنا",
//             path:"/contact"
//         },{
//             label:"عن وصيفة",
//             path:"/about"
//         },{
//             label:"اماكن الزفاف",
//             path:"/places"
//         }
//     ]

//     const buttonList = [
//       {
//         title: 'الكل',
//         fun: () => {
//           setPlaces([])
//           setLoading(true)
//           fetchAllPlaces()
//         },
//       },
//       {
//         title: 'قاعات',
//         fun: () => {
//           setPlaces([])
//           setLoading(true)
//           fetchPlacesBySubCategory(1)
//         },
//       },
//       {
//         title: 'فنادق',
//         fun: () => {
//           setPlaces([])
//           setLoading(true)
//           fetchPlacesBySubCategory(2)
//         },
//       },
//       {
//         title: 'استراحات',
//         fun: () => {
//           setPlaces([])
//           setLoading(true)
//           fetchPlacesBySubCategory(3)
//         },
//       },
//       {
//         title: 'شاليهات',
//         fun: () => {
//           setPlaces([])
//           setLoading(true)
//           fetchPlacesBySubCategory(4)
//         },
//       },
//     ];

//     const [places,setPlaces]=useState([]);
//     const [loading, setLoading] = useState(true);

   
//    // PLACES
//     useEffect(()=>{
//       const fetchPlaces= async()=>{
//           const request= await fetch("api/v1/product/getByCategory/"+1);
//           const data= await request.json();

//           const placesMap = data.map(async(place) =>{

//             const fetchPic= async()=>{
//             const request= await fetch("api/v1/picture/byProduct/"+place.id);
//             return await request.json().then(pic => { return pic[0].pictureUlr } )
//             };
            
//            const placeDetails =await fetchPic().then(function(result){              
//               return {
//                 id: place.id,
//                 vendorId:place.vendorId,
//                 name:place.name,
//                 description: place.description,
//                 picture:result,
//                 vendorName:"Maha"
//                 };
//            })

//            // Object
//            console.log("1")
//            return placeDetails; 
//             })
  
//             // list of promise
//             console.log("2")
//             setPlaces(placesMap); 
//             setLoading(false)
//       };
//       fetchPlaces();
//     },[]);


//     // GET ALL
//     const fetchAllPlaces= async()=>{
//       let pic=""
//       const request= await fetch("api/v1/product/getByCategory/"+1);
//       const data= await request.json();

//       const placesMap = data.map((place) => {

//         const fetchPic= async()=>{
//         const request= await fetch("api/v1/picture/byProduct/"+place.id);
//         return await request.json().then(pic => { return pic[0].pictureUlr } )
//         };
        
//        fetchPic().then(function(result) {
//           pic=result //"Some User token"
//           console.log("1")
//           setLoading(false)
//        })

//        console.log("2");

//           return {
//           id: place.id,
//           vendorId:place.vendorId,
//           name:place.name,
//           description: place.description,
//           picture:pic,
//           vendorName:"Maha"
//           };

//         });

//         setPlaces(placesMap);
//   };


//    // GET PLACE BY SUBCATEGORY
//     const fetchPlacesBySubCategory= async(subCategory)=>{
//       let pic=""
//       const request= await fetch("/api/v1/product/getBySubCategory/"+subCategory);
//       const data= await request.json();

//       const placesMap = data.map((place) => {

//         const fetchPic= async()=>{
//         const request= await fetch("api/v1/picture/byProduct/"+place.id);
//         return await request.json().then(pic => { return pic[0].pictureUlr } )
//         };
        
//        fetchPic().then(function(result) {
//           pic=result //"Some User token"
//           console.log("1")
//           setLoading(false)
//        })

//        console.log("2");

//           return {
//           id: place.id,
//           vendorId:place.vendorId,
//           name:place.name,
//           description: place.description,
//           picture:pic,
//           vendorName:"Maha"
//           };

//         });

//         setPlaces(placesMap);
//   };

  
 
//   //  // VENDER NAME
//   //   useEffect(()=>{
//   //     places.map((place) => {
//   //     const fetchVendor= async()=>{
//   //         const request= await fetch("api/v1/vendor/get/"+place.vendorId);
//   //         const data= await request.json();
//   //         console.log(data.userId)

//   //         const fetchVendorName= async()=>{
//   //           const request= await fetch("api/v1/user/getUser/"+data.userId);
//   //           const data2= await request.json();
//   //           console.log(data2)
//   //       };
//   //       fetchVendorName();

//   //     };
//   //       fetchVendor();
//   //   })
//   //   },[]);


 


// return(
//     <>
//     <VStack>
    
//     <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
//     <Title title={"أماكن الزفاف"}/>
//     <FilterBar buttonList={buttonList}/>
//     {loading? <Spinner /> :
//     <ProductCard productList={places}/>
//     }

//     </VStack>
//     </>
//     )
// }
// export default Places;

