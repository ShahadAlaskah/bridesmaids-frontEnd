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
  Input,
  MenuButton,
  Menu,
  MenuItem,
  ChevronDownIcon,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import FilterBar from '../../component/FilterBar';
import Navbar from '../../component/Navbar';
import { useLoadScript } from '@react-google-maps/api';
const AddProduct = () => {
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
          <Text>طلباتي</Text>

          <Divider w="150px" />
        </VStack>
        <HStack w={'70%'} alignSelf="end">
          <VStack w={'35%'}>
            <Menu>
              <MenuButton as={Button}>Actions</MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </VStack>
          <VStack w={'35%'}>
            <Input textAlign="right" variant="flushed" placeholder="Flushed" />
            <Input textAlign="right" variant="flushed" placeholder="Flushed" />
            <Input textAlign="right" variant="flushed" placeholder="Flushed" />
            <Input textAlign="right" variant="flushed" placeholder="Flushed" />
            <Input textAlign="right" variant="flushed" placeholder="Flushed" />
          </VStack>
        </HStack>
      </VStack>

      <Decoration />
    </>
  );
};

export default AddProduct;
