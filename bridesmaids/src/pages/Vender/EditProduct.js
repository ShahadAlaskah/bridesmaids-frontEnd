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
  Heading,
  Select,
  useToast,
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
import { useNavigate, useParams } from 'react-router';
import Map from '../../component/Map';
const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const toast = useToast();
  const [subCategoryList, setSubCategoryList] = useState([
    { id: '', name: '' },
  ]);
  const [subCategoryId, setSubCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [file, setFile] = useState();
  const [disableEditing, setDisableEditing] = useState(true);
  const [cancelEditing, setCancelEditing] = useState(true);
  // const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('/api/v1/product/byProductId/' + productId);
      const data = await request.json();
      const requestP = await fetch(
        '/api/v1/place/getPlaceByProductId/' + productId
      );
      const dataP = await requestP.json();
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCity(dataP.city);
      setCapacity(dataP.capacity);
      setLocation({ lat: dataP.lat, lng: dataP.lng });
      // setCategoryList(data);
    };

    fetchData();
  }, [cancelEditing]);
  const cancel = () => {
    setCancelEditing(!cancelEditing);
    setDisableEditing(true);
  };
  const saveEditing = async () => {
    const body = {
      name: name,
      description: description,
      price: price,
      city: city,
      capacity: capacity,
      lat: location.lat,
      lng: location.lng,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
    };

    const request = await fetch(`/api/v1/product/update/${productId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await request.json();
    if (request.status === 201) {
      setCancelEditing(!cancelEditing);
      setDisableEditing(true);
    }
  };
  // console.log(categoryId);

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
      <VStack width={'95%'}>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
        <Title title={'أضافة منتج'} />
        <HStack px={10} alignSelf="end" width={'70%'}>
          <FormControl w={'100%'} marginTop={'2rem'} marginLeft={'4rem'}>
            <HStack alignSelf="end" spacing={8}>
              <VStack w={'30%'}>
                <Box className="mb-3">
                  <FormLabel htmlFor="InputPassword1" textAlign={'right'}>
                    تحميل الصور
                  </FormLabel>
                  <Input
                    type="file"
                    //onChange={handleChange}
                    width={'15rem'}
                    textAlign={'right'}
                    // value={password}
                    // onChange={e => setPassword(e.target.value)}
                    disabled={disableEditing}
                    id="InputPassword1"
                    variant={'flushed'}
                  />
                  <Image src={file} />
                </Box>
                <Box backgroundColor={'gray.100'} w={235} h={150}>
                  {/* <Map setLocation={setLocation} /> */}
                </Box>
              </VStack>
              <VStack w={'30%'}>
                <Box className="mb-3">
                  <FormLabel htmlFor="InputPassword1" textAlign={'right'}>
                    المدينة
                  </FormLabel>
                  <Input
                    width={'15rem'}
                    textAlign={'right'}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    type="text"
                    id="InputPasswrord1"
                    variant={'flushed'}
                    disabled={disableEditing}
                    required
                  />
                </Box>
                <Box className="mb-3">
                  <FormLabel htmlFor="InputEmail1" textAlign={'right'}>
                    السعر
                  </FormLabel>
                  <Input
                    width={'15rem'}
                    textAlign={'right'}
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    type="number"
                    id="InputEmail1"
                    disabled={disableEditing}
                    variant={'flushed'}
                  />
                </Box>
                <Box className="mb-3">
                  <FormLabel htmlFor="InputAbout" textAlign={'right'}>
                    التصنيف
                  </FormLabel>
                  <Select
                    width={'15rem'}
                    textAlign={'right'}
                    id="InputAbout"
                    variant="flushed"
                    isSearchable
                    value={subCategoryId}
                    disabled={disableEditing}
                    onClick={e => {
                      setSubCategoryId(e.target.value);
                    }}
                  >
                    {subCategoryList.map(i => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                  </Select>
                </Box>
              </VStack>
              <VStack w={'40%'}>
                <Box className="mb-3">
                  <FormLabel htmlFor="InputName1" textAlign={'right'}>
                    الاسم
                  </FormLabel>
                  <Input
                    width={'15rem'}
                    textAlign={'right'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    id="InputName1"
                    disabled={disableEditing}
                    variant={'flushed'}
                  />
                </Box>
                <Box className="mb-3">
                  <FormLabel textAlign={'right'} htmlFor="InputUserName1">
                    الوصف
                  </FormLabel>
                  <Input
                    width={'15rem'}
                    textAlign={'right'}
                    value={description}
                    disabled={disableEditing}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    id="InputUserName1"
                    variant={'flushed'}
                  />
                </Box>
                <Box className="mb-3">
                  <FormLabel htmlFor="InputPhoneNumber1" textAlign={'right'}>
                    السعة
                  </FormLabel>
                  <Input
                    width={'15rem'}
                    disabled={disableEditing}
                    textAlign={'right'}
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    type="number"
                    id="InputPhoneNumber1"
                    variant={'flushed'}
                  />
                </Box>
              </VStack>
            </HStack>
            <HStack w={'100%'}>
              {disableEditing ? (
                <>
                  <Button
                    type="submit"
                    mt={'5rem'}
                    onClick={() => setDisableEditing(false)}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    marginRight={'7rem'}
                    w={'50%'}
                  >
                    تعديل
                  </Button>
                  <Button
                    type="submit"
                    mt={'5rem'}
                    // onClick={formSubmit}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    marginRight={'7rem'}
                    w={'50%'}
                  >
                    حذف المنتج
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    mt={'5rem'}
                    onClick={saveEditing}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    marginRight={'7rem'}
                    w={'50%'}
                  >
                    حفظ التغيرات
                  </Button>
                  <Button
                    type="submit"
                    mt={'5rem'}
                    onClick={cancel}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    marginRight={'7rem'}
                    w={'50%'}
                  >
                    الغاء
                  </Button>
                </>
              )}
            </HStack>
          </FormControl>
        </HStack>
      </VStack>

      <Decoration />
    </>
  );
};

export default EditProduct;
