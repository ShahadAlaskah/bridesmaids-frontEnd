import React, { useEffect, useState } from 'react'
import Decoration from '../component/Decoration'
import { Box,Input,FormLabel,FormControl, HStack, Flex,WrapItem,Image,Avatar, Container,Text, Heading, VStack } from '@chakra-ui/react' 
import Navbar from '../component/Navbar'
import Title from '../component/Title'
import { useParams } from 'react-router'
const VendorDetails = () => {
    const params=useParams();
    const vendorid=params.id;
    const [userName,setUserName]=useState('');
    const [vendorName,setVendorName]=useState('');
    const [pic,setPic]=useState('');
    const [about,setAbout]=useState('');
  useEffect(()=>{
      const fetchProductDetails = async () => {
          const request = await fetch("/api/v1/vendor/get/36");
          const data = await request.json();
           setPic(data.pic);
           setAbout(data.about);
          const requestd= await fetch("/api/v1/user/getUser/"+data.userId);
          const data2 = await requestd.json();
          setVendorName(data2.name);
        };
        fetchProductDetails();
  },[]);
    const navbarItems = [
        {
          label: 'تسجيل الدخول',
          path: '/login',
        },
        {
          label: 'تسجيل',
          path: '/role',
        },
        
      ];
    
      const navbarItems2 = [
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
      ];
  return (
 <VStack>
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
    <Title title={vendorName} />
        <Flex p={5} alignSelf="end">
        </Flex>
        <HStack>
        <WrapItem>
        <Text mt={'3rem'} ml={'35rem'}>{about}</Text>     
       
  </WrapItem>
        
       <Box
             position={'absolute'}
             backgroundColor={'#FFFAF3'}
             width={'148px'}
             height={'230px'}
             left={'882px'}
             top={'180px'}
             borderRadius={'115px 115px 0px 0px'}
             opacity={'0.5'}
           transform={'rotate(-90.28deg)'}
      ></Box>
         <Box
             position={'absolute'}
             backgroundColor={'white'}
             
             width={'104px'}
             height={'107px'}
             left={'920px'}
             top={'237px'}
             borderRadius={'94px'}
            border={'1px solid '}
      ></Box>
       </HStack>
          <Decoration /> 
         
   
          </VStack>
  )
}

export default VendorDetails