import React, { useEffect,useState } from 'react';
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
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import Navbar from '../component/Navbar';

//import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
//import { AiFillInstagram } from "@react-icons/all-files/ai/AiFillInstagram";
function About() {
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

          <VStack align="end">
            <Text fontSize="50px">من نحن ؟</Text>

            <Text>
              وصيفة العروس هي واحدة من اهم الشخصيات التي تحتاج إليها عروس تخطط
            </Text>
            <Text>
              لزفافها ومقبلة على ليلة العمر, حيث تبدأ في اختيار وصيفة واحدة أو
              اكثر , لأن
            </Text>
            <Text>
              الوصيفة عليها دور هام يجب القيام به تجاه العروس وصديقة عمرها{' '}
            </Text>
            <Text>
              في هذا اليوم المميز , ولهذا أوجدنا موقع “ وصيفة “ , وموقعنا يقوم
              بمقام{' '}
            </Text>
            <Text>
              الصديقة المقربة للعروس إبتداءً من “ نعم قبلت “ إلى مغادرة العروس
              من قاعة
            </Text>
            <Text>الزفاف, كل ما تحتاجه العروس في مكان واحد </Text>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default About;
