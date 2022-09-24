import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  HStack,
  Image,
  Button,
} from '@chakra-ui/react';
import Navbar from '../component/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

function HomePage() {
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
        },
        {
          label: 'تسجيل',
          path: '/role',
        },
        
      ])
      setNavbarItems2([
        {
          label: 'تواصل معنا',
          path: '/contact',
        },
        {
          label: 'عن وصيفة',
          path: '/about',
        },
        {
          label: 'اماكن الزفاف',
          path: '/places',
        },
      ])
    }else{
      setNavbarItems([
        {
          label: 'اعدادات',
          path: '/customer-setting',
        },{
          label: 'طلبات',
          path: '/customerRequests',
        },{
          label: 'حجوزات',
          path: '/customerReservations',
        }
      ])
      setNavbarItems2([
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
    ])
    }
    }
    fetchUser();
  },[])
  const navigate = useNavigate();

  // const navbarItems = [
  //   {
  //     label: 'تسجيل الدخول',
  //     path: '/login',
  //   },
  //   {
  //     label: 'تسجيل',
  //     path: '/role',
  //   },
    
  // ];

  // const navbarItems2 = [
  //   {
  //     label: 'تواصل معنا',
  //     path: '/contact',
  //   },
  //   {
  //     label: 'عن وصيفة',
  //     path: '/about',
  //   },
  //   {
  //     label: 'اماكن الزفاف',
  //     path: '/places',
  //   },
  // ];

  const goToabout = () => {
    navigate('/about');
  };
  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
        <HStack spacing={300}>
          <Image
            src="https://images.unsplash.com/photo-1588436199517-f2b12041a7cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEyfHx3ZWRkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
            alt="صفحة البداية"
            width={450}
            height={600}
          />
          <Box w={['100%','80%','80%']}>

          <VStack align="end" >
            <Text fontSize="50px">من نحن ؟</Text>
      <hr></hr>
      <hr></hr>
            <Text>وصيفة العروس هي واحدة من اهم الشخصيات التي تحتاج إليها عروس تخطط </Text>
            <Text>لزفافها ومقبلة على ليلة العمر , حيث تبدء في اختيار  وصيفة واحدة  او اكثر , لأن</Text>
            <Text>الوصيفة عليها دور هام يجب القيام به تجاه العروس,نحن هنا لكي نقدم لكِ هذه الخدمة </Text>
            <Text>نصف إليك مجموعة كبيرة من افضل القاعات والفنادق وماعليك سواء اختيار ما يناسبك</Text>
           
            <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>

            <Button  onClick={goToabout}>المزيد</Button>
          </VStack>
          </Box>
        </HStack>
      </VStack>
    </>
  );
}

export default HomePage;
