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
import DisplayMap from '../../component/DisplayMap';
import axios from 'axios';
const EditProduct = ({ user }) => {
  useEffect(() => {
    if (user && user.role !== 'VENDOR') {
      if (user && user.role === 'ADMIN') navigate('/registrationRequests');
      else {
        navigate('/');
      }
    }
  }, [user]);

  const navbarItems = [
    {
      label: 'خدمات',
      path: '/products',
      color: '#C08D5D'
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
      path: '/vendor-setting',
    },
  ];

  const { productId, categoryId } = useParams();

  const navigate = useNavigate();
  //const {  } = useParams();
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
  const [fileList, setFileList] = useState([]);
  const [pictureUlrList, setPictureUlrList] = useState([]);
  //const [categoryId, setCategoryId] = useState('');

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
      setSubCategoryId(dataP.subCategoryId);
      const requestS = await fetch(
        '/api/v1/SubCategory/getAllByCategoryid/' + categoryId
      );
      const dataS = await requestS.json();

      setSubCategoryList(dataS);
    };

    fetchData();
  }, [cancelEditing]);
  // console.log()
  const cancel = () => {
    setCancelEditing(!cancelEditing);
    setDisableEditing(true);
  };


  const getImgURL = async () => {
    let deleteImg = await deleteImgURL();
    let imgList = [];
    for (let index = 0; index < fileList.length; index++) {
      let body = new FormData();
      body.set('key', '4178c08b973c71db51efc665717fe3e6');
      body.append('image', fileList[index]);

      let res = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body,
      });
      imgList.push(res.data.data.display_url);
    }
    return imgList;
  };


  const deleteImgURL = async () => {
    const requestD = await fetch('/api/v1/picture/byProduct/' + productId);
    const dataD = await requestD.json();
    if (requestD.status == 200) {
      for (let index = 0; index < dataD.length; index++) {
        let request = await fetch('/api/v1/picture/delete/' + dataD[index].id, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        let data = await request.json();
      }
    }
  };


  const saveEditing = async () => {
    if (fileList.length >= 1) {
      let imgList = await getImgURL();
      for (let index = 0; index < imgList.length; index++) {
        console.log(index);
        let bodyP = {
          productId: productId,
          pictureUlr: String(imgList[index]),
        };
        let requestP = await fetch(`/api/v1/picture/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyP),
        });
        let dataP = await requestP.json();
        console.log(dataP);
      }
    }
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
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await request.json();
    if (request.status === 200) {
      setCancelEditing(!cancelEditing);
      setDisableEditing(true);
    } else {
      console.log(data);
    }
  };
  const deleteProduct = async () => {
    const request = await fetch(`/api/v1/product/delete/${productId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await request.json();
  };

  return (
    <>
      <VStack width={'95%'}>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />
        <Title title={'تعديل منتج'} />
        <VStack alignSelf="end" width={'70%'}>
          <FormControl w={'100%'}>
            <HStack alignSelf="end" spacing={8}>
              <VStack w={'30%'} spacing={1}>
                <Box>
                  <FormLabel htmlFor="InputPassword1" textAlign={'right'}>
                    تحميل الصور
                  </FormLabel>
                  <Input
                    type="file"
                    //onChange={handleChange}
                    width={'15rem'}
                    textAlign={'right'}
                    // value={password}
                    multiple
                    onChange={e => setFileList(e.target.files)}
                    disabled={disableEditing}
                    id="InputPassword1"
                    variant={'flushed'}
                  />
                </Box>
                <Box backgroundColor={'gray.100'} w={235} h={150}>
                  {disableEditing ? (
                    <DisplayMap lat={location.lat} lng={location.lng} />
                  ) : (
                    <Map setLocation={setLocation} />
                  )}
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
                    // value={subCategoryId}
                    disabled={disableEditing}
                    onClick={e => {
                      console.log(e.target.value);
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
            <HStack
              w={'100%'}
              pt={14}
              justifyContent="center"
              alignItems={'center'}
            >
              {disableEditing ? (
                <>
                  <Button
                    type="submit"
                    onClick={() => setDisableEditing(false)}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    // marginRight={'7rem'}
                    w={'40%'}
                  >
                    تعديل
                  </Button>
                  <Button
                    type="submit"
                    onClick={deleteProduct}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    // marginRight={'7rem'}
                    w={'40%'}
                  >
                    حذف المنتج
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    //  mt={'5rem'}
                    onClick={saveEditing}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    // marginRight={'7rem'}
                    w={'40%'}
                  >
                    حفظ التغيرات
                  </Button>
                  <Button
                    type="submit"
                    // mt={'5rem'}
                    onClick={cancel}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    // marginRight={'7rem'}
                    w={'40%'}
                  >
                    الغاء
                  </Button>
                </>
              )}
            </HStack>
          </FormControl>
        </VStack>
      </VStack>

      <Decoration />
    </>
  );
};

export default EditProduct;
