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
import { useNavigate, useParams } from 'react-router';
import Decoration from '../../Decoration';
import Navbar from '../../Navbar';
import Title from '../../Title';
import Map from '../../Map';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../Footer';
//import { imgbbUploader } from 'imgbb-uploader';
const AddProductDetails = ({ user }) => {
  //const imgbbUploader = require('imgbb-uploader');
  const navigate = useNavigate('');
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
      label: 'منتجات',
      path: '/products',
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
  const [pictureUlrList, setPictureUlrList] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(
        '/api/v1/SubCategory/getAllByCategoryid/' + categoryId
      );
      const data = await request.json();

      setSubCategoryList(data);
    };

    fetchData();
  }, []);

  const getImgURL = async () => {
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

  const formSubmit = async () => {
    let imgList = await getImgURL();

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

    const request = await fetch(`/api/v1/product/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await request.json();

    if (request.status === 201) {
      console.log(imgList.length);
      for (let index = 0; index < imgList.length; index++) {
        console.log(index);
        let bodyP = {
          productId: data,
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
      setName('');
      setCapacity('');
      setCity('');
      setDescription('');
      setLocation({ lat: '', lng: '' });
      setPrice('');
      setSubCategoryId('');
      toast({
        title: 'تم اضافة المنتج بنجاح',
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'لم يتم اضافة المنتج :(',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <VStack>
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
                    onChange={e => setFileList(e.target.files)}
                    width={'15rem'}
                    textAlign={'right'}
                    // value={password}
                    // onChange={e => setPassword(e.target.value)}
                    multiple
                    id="InputPassword1"
                    variant={'flushed'}
                  />
                </Box>
                <Box backgroundColor={'gray.100'} w={235} h={150}>
                  <Map setLocation={setLocation} />
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
            <VStack w={'100%'}>
              <Button
                type="submit"
                mt={'5rem'}
                onClick={() => {
                  let imgList = getImgURL();
                  formSubmit(imgList);
                }}
                backgroundColor={'#CAA892'}
                textColor={'white'}
                textAlign={'right'}
                marginRight={'7rem'}
                w={'50%'}
              >
                أضافة منتج
              </Button>
            </VStack>
          </FormControl>
        </HStack>
        <Footer />
      </VStack>

      <Decoration />
    </>
  );
};

export default AddProductDetails;
