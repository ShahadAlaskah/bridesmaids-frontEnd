
import { Box , Flex, Text, VStack } from "@chakra-ui/react";
import Navbar from "../component/Navbar";

const HomePage=()=>{
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
    return(
       
            <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
       
    );
}
export default HomePage



