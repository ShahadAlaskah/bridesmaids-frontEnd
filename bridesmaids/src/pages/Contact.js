import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  HStack,Image 
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import Navbar from "../component/Navbar";




import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
import { AiFillInstagram } from "@react-icons/all-files/ai/AiFillInstagram";
function Contact() {
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


  return (
   <>
   <VStack>
   
   <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
   <HStack spacing={300}>
     
       
  <Image src='HomePage.PNG' alt='صفحة البداية' width={450} height={600} />

        <VStack align='end'>
<HStack>
<Text>  0530464568  رقم الجوال</Text>
        <PhoneIcon />

</HStack>

<HStack>
<Text>wassefa2022@gmail.com البريد الالكتروني</Text>
<EmailIcon />
</HStack>

<HStack>
<Text>@wassefa2022 تويتر</Text>
<AiOutlineTwitter />

</HStack>
<HStack>
<Text>wassefa_2022 الانستقرام</Text>
<AiFillInstagram />

</HStack>
        </VStack>
    </HStack>
   </VStack>
   </>
  );
}

export default Contact;