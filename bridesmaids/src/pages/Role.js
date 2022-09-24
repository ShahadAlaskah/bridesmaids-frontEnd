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
  Flex,
} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

function Role() {
  const navigate = useNavigate();

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
  return (
    <>
      <VStack spacing={0}>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
        <HStack
          spacing={0}
          // w={'98vw'}
          w={['98vw','100%' ,'99%']}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
         
          <VStack
            justifyContent={'end'}
            alignItems={'center'}
            bgImage={
              "url('https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlZGRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60')"
            }
            onClick={() => navigate('/vendorRegiter')}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            width={'50%'}
            height={580}
          >
            {/* <Button colorScheme='blackAlpha' mb={8} onClick={() => navigate('/vendorRegiter')}>
  تسجيل كمزود خدمة 
            </Button> */}
            <Box  background color="black" opacity="2.5">
            <Text  fontSize={['19','19','25px']} mb={202} fontWeight= 'bold'> تسجيل كمزود خدمة</Text>
            </Box>
          </VStack>
          <VStack
            justifyContent={'end'}
            alignItems={'center'}
            bgImage={
              "url('https://images.unsplash.com/photo-1579583764988-3e08c6132d2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=583&q=80')"
              
            }
            onClick={() => navigate('/customerRegister')}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            width={['50%']}
            height={690}
            
          >
            {/* mr={['3','0','0']} */}
            {/* <Button  colorScheme='blackAlpha' mb={['20','20','20']}  onClick={() => navigate('/customerRegister')}>
              تسجيل كمستخدم
            </Button> */}
            <Box  background color="black" opacity="2.5">
               <Text fontSize={['19','19','25px']} mb={259}  fontWeight= 'bold' >تسجيل كمستخدم</Text>
               </Box>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default Role;
