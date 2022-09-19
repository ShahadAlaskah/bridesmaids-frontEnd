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
  HStack,
  Image,
  Button,
} from '@chakra-ui/react';
import Navbar from '../component/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

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

          <VStack align="end">
            <Text fontSize="50px">من نحن ؟</Text>
            <Text>
              وصيفة العروس هي واحدة من اهم الشخصيات التي تحتاج إليها عروس تخطط
              لزفافها ومقبلة على ليلة العمر
            </Text>
            <Text>
              حيث تبدأ في اختيار وصيفة واحدة أو اكثر , لأن الوصيفة عليها دور هام
              يجب القيام به تجاه العروس
            </Text>

            <Button onClick={goToabout}>المزيد</Button>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default HomePage;
