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
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router';
import Decoration from '../../Decoration';
import Navbar from '../../Navbar';
import Title from '../../Title';
import Map from '../../Map';
import { useEffect, useState } from 'react';
const AddProductDetails = () => {
  const { categoryId } = useParams();

  const [subCategoryList, setSubCategoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('/api/v1/Category/Category');
      const data = await request.json();

      setSubCategoryList(data);
    };

    fetchData();
  }, []);

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

        <HStack p={10} alignSelf="end">
          <FormControl>
            <HStack m={10}>
              <VStack>
                <Menu>
                  <MenuButton
                    borderBottom="2px"
                    borderColor="black"
                    borderRadius={0}
                    bg={'white'}
                    w="100%"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    تصنيف المتتج
                  </MenuButton>
                  <MenuList>
                    {/* {categoryList.map(i => {
                return (
                  <MenuItemOption
                    value={categoryId}
                    //  onClick={e => setCategoryId(e.target.itemID)}
                  >
                    {i.name}
                  </MenuItemOption>
                );
              })} */}
                  </MenuList>
                </Menu>
                <Map />
              </VStack>
              <VStack>
                <FormLabel textAlign={'right'}>اسم</FormLabel>
                <Input
                  type="text"
                  variant={'flushed'}
                  placeholder="Email"
                  textAlign={'right'}
                />
                <FormLabel textAlign={'right'}>السعه</FormLabel>
                <Input
                  type="number"
                  variant={'flushed'}
                  placeholder="Email"
                  textAlign={'right'}
                />
                <FormLabel textAlign={'right'}>السعر</FormLabel>
                <Input
                  type="number"
                  variant={'flushed'}
                  placeholder="Email"
                  textAlign={'right'}
                />
                <FormLabel textAlign={'right'}>الوصف</FormLabel>
                <Input
                  type="number"
                  variant={'flushed'}
                  placeholder="Email"
                  textAlign={'right'}
                />
              </VStack>
            </HStack>
          </FormControl>
        </HStack>
      </VStack>

      <Decoration />
    </>
  );
};

export default AddProductDetails;
