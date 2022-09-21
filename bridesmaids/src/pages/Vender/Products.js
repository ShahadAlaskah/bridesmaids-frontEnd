
import { Flex, Image, Text, VStack , Grid, GridItem , Spinner } from "@chakra-ui/react";
import Navbar from "../../component/Navbar";
import ProductCard from "../../component/ProductCard";
import Title from "../../component/Title";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router";

const Products=({user})=>{
    const navigate=useNavigate('');
    useEffect(() => {
        if (user && user.role !== 'VENDOR') {
          if(user && user.role ==='ADMIN')
          navigate('/registrationRequests');
          else{
            navigate('/')
          }
        }
      }, [user]);
    
    const navbarItems = [
        {
          label: 'منتجات',
          path: '/products',
        },
        {
          label: 'طلبات',
          path: '/venderRequests',
        },
      ];
    
      const navbarItems2 = [
        {
          label: 'حجوزات',
          path: '/VenderReservations',
        },
        {
          label: 'اعدادات',
          path: '/vendor-setting',
        },
      ];


    const [places,setPlaces]=useState([]);
    const [loading, setLoading] = useState(true);
    let placesMap=[]

   
   // PLACES
    useEffect(()=>{
            const fetchPlaces= async()=>{
                const request= await fetch("api/v1/product/myProducts/");
                const products= await request.json();
                console.log(products)
      
                for (let index = 0; index < products.length; index++) {
      
                  //Get product pic
                  const requestPic= await fetch("api/v1/picture/byProduct/"+products[index].id);
                  const pictures= await requestPic.json()
      
                  placesMap.push({
                    id: products[index].id,
                    name:products[index].name,
                    description: products[index].description,
                    picture:pictures[0].pictureUlr,
                  })            
                }
                  setPlaces(placesMap)
                  setLoading(false)
                }
            fetchPlaces();
    },[]);

return(
    <>
    <VStack>
    
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
    <Title title={"خدمات"}/>
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

