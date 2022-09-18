
import { Flex, Image, Text, VStack , Grid, GridItem , Spinner } from "@chakra-ui/react";
import Navbar from "../../component/Navbar";
import ProductCard from "../../component/ProductCard";
import Title from "../../component/Title";
import { useState , useEffect } from "react";

const Products=()=>{
    const navbarItems=[
        {
            label:"منتجات",
            path:"/products"
        },{
            label:"طلباتي",
            path:"/venderRequests"
        }
    ]
    // change this
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


    const [places,setPlaces]=useState([]);
    const [loading, setLoading] = useState(true);

   
   // PLACES
    useEffect(()=>{
      const fetchProducts= async()=>{
          const request= await fetch("api/v1/product/myProducts");
          const data= await request.json();

          const placesMap = data.map((place) =>{

              return {
                id: place.id,
                name:place.name,
                description: place.description,
                picture:"/",
                };
           })

            setPlaces(placesMap); 
            setLoading(false)
      };
      fetchProducts();
    },[]);


    
  

return(
    <>
    <VStack>
    
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
    <Title title={"منتجاتي"}/>
    {loading? <Spinner /> :
    <ProductCard productList={places}/>
    }

    </VStack>
    </>
    )
}
export default Products;









// import { Flex, Image, Text, VStack , Grid, GridItem , Spinner } from "@chakra-ui/react";
// import Navbar from "../../component/Navbar";
// import ProductCard from "../../component/ProductCard";
// import Title from "../../component/Title";
// import { useState , useEffect } from "react";

// const Products=()=>{
//     const navbarItems=[
//         {
//             label:"منتجات",
//             path:"/products"
//         },{
//             label:"طلباتي",
//             path:"/venderRequests"
//         }
//     ]
//     // change this
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


//     const [places,setPlaces]=useState([]);
//     const [loading, setLoading] = useState(true);

   
//    // PLACES
//     useEffect(()=>{
//       const fetchProducts= async()=>{
//           const request= await fetch("api/v1/product/myProducts");
//           const data= await request.json();

//           const placesMap = data.map(async(place) =>{

//             const fetchPic= async()=>{
//             const request= await fetch("api/v1/picture/byProduct/"+place.id);
//             return await request.json().then(pic => { return pic[0].pictureUlr } )
//             };
            
//            const placeDetails =await fetchPic().then(function(result){              
//               return {
//                 id: place.id,
//                 name:place.name,
//                 description: place.description,
//                 picture:result,
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
//       fetchProducts();
//     },[]);


    
  

// return(
//     <>
//     <VStack>
    
//     <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
//     <Title title={"منتجاتي"}/>
//     {loading? <Spinner /> :
//     <ProductCard productList={places}/>
//     }

//     </VStack>
//     </>
//     )
// }
// export default Products;

