
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
  HStack,Image, Button
} from '@chakra-ui/react';
import Navbar from "../component/Navbar";
import { Navigate, useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

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



    const goToabout = () => {
        navigate('/about');
      };
  return (
   <>
   <VStack>
   <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
    <HStack spacing={300}>
      
       
  <Image src='HomePage.PNG' alt='صفحة البداية'  width={450} height={600} />

  <VStack align='end'>
            <Text fontSize='50px'>من نحن ؟</Text>
            <Text>
وصيفة العروس هي واحدة من اهم الشخصيات التي تحتاج إليها عروس تخطط لزفافها ومقبلة على ليلة العمر</Text>
<Text>حيث تبدأ في اختيار وصيفة واحدة أو اكثر , لأن الوصيفة عليها دور هام يجب القيام به تجاه العروس</Text>

<Button  onClick={goToabout}>المزيد</Button>
        </VStack>
    </HStack>
   </VStack>
   </>
  );
}

export default HomePage;


