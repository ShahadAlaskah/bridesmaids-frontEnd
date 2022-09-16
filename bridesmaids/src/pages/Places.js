import { Flex, Image, Text, VStack , Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../component/Navbar";
import ProductCard from "../component/ProductCard";
import Title from "../component/Title";


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

    const productList=[
        {
          id:123,
          pic:"./place1.jpg",
          name:"فور سيزون",
          venderName:"فندق الفور سيزون",
          description:" يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
        },{
            id:123,
            pic:"./place1.jpg",
            name:"2فور سيزون",
            venderName:"2فندق الفور سيزون",
            description:"2 يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
          },{
            id:123,
            pic:"./place1.jpg",
            name:"3فور سيزون",
            venderName:"3فندق الفور سيزون",
            description:" 3يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
          },{
            id:123,
            pic:"./place1.jpg",
            name:"فور سيزون",
            venderName:"فندق الفور سيزون",
            description:" يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
          },{
              id:123,
              pic:"./place1.jpg",
              name:"2فور سيزون",
              venderName:"2فندق الفور سيزون",
              description:"2 يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
            },{
              id:123,
              pic:"./place1.jpg",
              name:"3فور سيزون",
              venderName:"3فندق الفور سيزون",
              description:" 3يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
            },{
          id:123,
          pic:"./place1.jpg",
          name:"فور سيزون",
          venderName:"فندق الفور سيزون",
          description:" يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
        },{
            id:123,
            pic:"./place1.jpg",
            name:"2فور سيزون",
            venderName:"2فندق الفور سيزون",
            description:"2 يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
          },{
            id:123,
            pic:"./place1.jpg",
            name:"3فور سيزون",
            venderName:"3فندق الفور سيزون",
            description:" 3يقع الفندق داخل برج المملكة اللامع في الرياض, وهو اعجوبة معمارية شهيرة ،  مع الاماكن الانيقة ووسائل الراحة عالية التقنية والإطلالات المذهلة."
          }
    ]
return(
    <>
    <VStack>
    
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
    <Title title={"أماكن الزفاف"}/>
    <ProductCard productList={productList}/>

    </VStack>
    </>
    )
}
export default Places;

