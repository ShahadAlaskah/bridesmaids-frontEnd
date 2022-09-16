import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  Spacer,
  Image,
  Stack,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import FilterBar from '../../component/FilterBar';
import Navbar from '../../component/Navbar';

const VenderRequests = () => {
  const details = [
    {
      title: 'قاعه لورا',
      body: (
        <>
          <Text>الوقت : 10:30</Text>
          <Text>التاريخ: 10/202022</Text>
          <Text>طريقه التواصل: هاتف - 0596159810</Text>
          <Text>
            ملاحضات : ***************************************************
            ****************************
          </Text>
        </>
      ),
      listButton: (
        <>
          <HStack>
            <Button>تفاوض</Button>
            <Button>رفض</Button>
          </HStack>
        </>
      ),
    },
    {
      title: 'قاعه لورا',
      body: (
        <>
          <Text>الوقت : 10:30</Text>
          <Text>التاريخ: 10/202022</Text>
          <Text>طريقه التواصل: هاتف - 0596159810</Text>
          <Text>
            ملاحضات : ***************************************************
            ****************************
          </Text>
        </>
      ),
      listButton: (
        <>
          <HStack>
            <Button>تفاوض</Button>
            <Button>رفض</Button>
          </HStack>
        </>
      ),
    },
  ];
  const filterBarDetails = [
    {
      title: 'الكل',
      fun: () => {
        console.log('hi');
      },
    },
    {
      title: 'جديدة',
      fun: () => {
        console.log('hi');
      },
    },
    {
      title: 'قيد المفاوضه ',
      fun: () => {
        console.log('hi');
      },
    },
    {
      title: 'مؤكدة',
      fun: () => {
        console.log('hi');
      },
    },
    {
      title: 'مرفوضة',
      fun: () => {
        console.log('hi');
      },
    },
  ];
  const navbarItems = [
    {
      label: 'منتجات',
      path: '/addProduct',
    },
    {
      label: 'طلبات',
      path: '/venderRequests',
    },
  ];

  const navbarItems2 = [
    {
      label: 'حجوزات',
      path: '/contact',
    },
    {
      label: 'اعدادات',
      path: '/about',
    },
  ];
  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <VStack
          p={5}
          display={'flex'}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text>إضافة منتج منتجات</Text>

          <Divider w="150px" />
        </VStack>

        <Flex p={5} alignSelf="end">
          <FilterBar buttonList={filterBarDetails} />
        </Flex>

        <Flex p={5} width={'70%'} alignSelf="end">
          <AccordionList details={details} />
        </Flex>
      </VStack>

      <Decoration />
    </>
  );
};

export default VenderRequests;
