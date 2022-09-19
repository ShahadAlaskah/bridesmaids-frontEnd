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
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import Navbar from '../component/Navbar';

//import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
//import { AiFillInstagram } from "@react-icons/all-files/ai/AiFillInstagram";
function About() {
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
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
        <HStack spacing={300}>
          <Image
            src="HomePage.PNG"
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
