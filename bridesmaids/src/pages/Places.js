import { Flex, Image, Text, VStack , Grid, GridItem  } from "@chakra-ui/react";
import FilterBar from "../component/FilterBar";
import Navbar from "../component/Navbar";
import ProductCard from "../component/ProductCard";
import Title from "../component/Title";
import { useState , useEffect } from "react";
import Spinner from "../component/Spinner";

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

    const placesMap=[]

   
   // PLACES
    useEffect(()=>{
      const fetchPlaces= async()=>{
          const request= await fetch("api/v1/product/getByCategory/"+1);
          const products= await request.json();
          console.log(products)

          for (let index = 0; index < products.length; index++) {

            //Get product pic
            const requestPic= await fetch("api/v1/picture/byProduct/"+products[index].id);
            const pictures= await requestPic.json()

            //Get product user name
            const requestUser= await fetch("api/v1/user/getUser/"+products[index].userId);
            const user= await requestUser.json()

            placesMap.push({
              id: products[index].id,
              vendorId:products[index].vendorId,
              name:products[index].name,
              description: products[index].description,
              picture:pictures[0].pictureUlr,
              vendorName:user.name,
            })            
          }
            setPlaces(placesMap)
            setLoading(false)
          }
      fetchPlaces();
    },[]);


    // GET ALL
    const fetchAllPlaces= async()=>{
      const request= await fetch("api/v1/product/getByCategory/"+1);
      const products= await request.json();
      console.log(products)

      for (let index = 0; index < products.length; index++) {

        //Get product pic
        const requestPic= await fetch("api/v1/picture/byProduct/"+products[index].id);
        const pictures= await requestPic.json()

        //Get product user name
        const requestUser= await fetch("api/v1/user/getUser/"+products[index].userId);
        const user= await requestUser.json()

        placesMap.push({
          id: products[index].id,
          vendorId:products[index].vendorId,
          name:products[index].name,
          description: products[index].description,
          picture:pictures[0].pictureUlr,
          vendorName:user.name,
        })            
      }
        setPlaces(placesMap)
        setLoading(false)
  };


   // GET PLACE BY SUBCATEGORY
    const fetchPlacesBySubCategory= async(subCategory)=>{
      const request= await fetch("api/v1/product/getBySubCategory/"+subCategory);
      const products= await request.json();
      console.log(products)

      for (let index = 0; index < products.length; index++) {

        //Get product pic
        const requestPic= await fetch("api/v1/picture/byProduct/"+products[index].id);
        const pictures= await requestPic.json()

        //Get product user name
        const requestUser= await fetch("api/v1/user/getUser/"+products[index].userId);
        const user= await requestUser.json()

        placesMap.push({
          id: products[index].id,
          vendorId:products[index].vendorId,
          name:products[index].name,
          description: products[index].description,
          picture:pictures[0].pictureUlr,
          vendorName:user.name,
        })            
      }
        setPlaces(placesMap)
        setLoading(false)
  };

  

return(
    <>
    <VStack>
    
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
    <Title title={"أماكن الزفاف"}/>
    <FilterBar buttonList={buttonList}/>
    {loading? <Spinner/> :
    <ProductCard productList={places}/>
    }

    </VStack>
    </>
    )
}
export default Places;

