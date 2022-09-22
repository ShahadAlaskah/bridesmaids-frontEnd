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
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
        <HStack
          spacing={0}
          w={'100vw'}
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
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            width={'50%'}
            height={550}
          >
            <Button mb={10} onClick={() => navigate('/vendorRegiter')}>
              تسجيل كمزود
            </Button>
          </VStack>
          <VStack
            justifyContent={'end'}
            alignItems={'center'}
            bgImage={
              "url('https://images.unsplash.com/photo-1579583764988-3e08c6132d2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=583&q=80')"
            }
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            width={'50%'}
            height={550}
          >
            <Button mb={10} onClick={() => navigate('/customerRegister')}>
              تسجيل كمستخدم
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default Role;
