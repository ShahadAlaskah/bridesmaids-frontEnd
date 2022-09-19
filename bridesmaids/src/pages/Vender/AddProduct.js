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
  MenuList,
  MenuItemOption,
  Select,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';
import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import FilterBar from '../../component/FilterBar';
import Navbar from '../../component/Navbar';
import { useLoadScript } from '@react-google-maps/api';
import Title from '../../component/Title';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const AddProduct = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('/api/v1/Category/Category');
      const data = await request.json();
      console.log(data);
      setCategoryList(data);
    };

    fetchData();
  }, []);
  console.log(categoryId);

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
      path: '/VenderReservations',
    },
    {
      label: 'اعدادات',
      path: '/map',
    },
  ];
  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
        <Title title={'أضافة منتج'} />

        <VStack spacing="50px" p={20} width={'50%'} alignSelf="end" mr={5}>
          <Select
            variant="flushed"
            isSearchable
            value={categoryId}
            onClick={e => {
              setCategoryId(e.target.value);
            }}
            textAlign="right"
          >
            {categoryList.map(i => (
              <option value={i.id}>{i.name}</option>
            ))}
          </Select>
          <Button
            w="100%"
            bg={'#CAA892'}
            opacity={0.5}
            onClick={() => navigate(`/addProductDetails/${categoryId}`)}
          >
            أضافة منتج
          </Button>
        </VStack>
      </VStack>

      <Decoration />
    </>
  );
};

export default AddProduct;
