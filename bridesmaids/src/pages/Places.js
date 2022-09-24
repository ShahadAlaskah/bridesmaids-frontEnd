import { Flex, Image, Text, VStack , Grid, GridItem  } from "@chakra-ui/react";
import FilterBar from "../component/FilterBar";
import Navbar from "../component/Navbar";
import ProductCard from "../component/ProductCard";
import Title from "../component/Title";
import { useState , useEffect } from "react";
import Spinner from "../component/Spinner";
import Footer from "../component/Footer";

const Places=()=>{
  const [navbarItems,setNavbarItems]=useState([]);
  const [navbarItems2,setNavbarItems2]=useState([]);
  useEffect(()=>{
    const fetchUser = async () => {
    const request = await fetch('/api/v1/user/me');
    const data= await request.json();
    if(request.status ===401){
      
      setNavbarItems([
        {
          label: 'تسجيل الدخول',
          path: '/login',
          color: 'black'
        },
        {
          label: 'تسجيل',
          path: '/role',
          color: 'black'
        },
        
      ])
      setNavbarItems2([
        {
          label: 'تواصل معنا',
          path: '/contact',
          color: 'black'
        },
        {
          label: 'عن وصيفة',
          path: '/about',
          color: 'black'
        },
        {
          label: 'اماكن الزفاف',
          path: '/places',
          color: '#C08D5D'
        },
      ])
    }else{
      setNavbarItems([
        {
          label: 'اعدادات',
          path: '/customer-setting',
          color: 'black'
        },{
          label: 'طلبات',
          path: '/customerRequests',
          color: 'black'
        },{
          label: 'حجوزات',
          path: '/customerReservations',
          color: 'black'
        }
      ])
      setNavbarItems2([
        {
            label:"تواصل معنا",
            path:"/contact",
            color: 'black'
        },{
            label:"عن وصيفة",
            path:"/about",
            color: 'black'
        },{
            label:"اماكن الزفاف",
            path:"/places",
            color: '#C08D5D'
        }
    ])
    }
    }
    fetchUser();
  },[])
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
    <Footer/>
    </>
    )
}
export default Places;

