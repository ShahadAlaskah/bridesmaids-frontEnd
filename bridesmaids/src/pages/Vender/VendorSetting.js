import React from 'react';
import {
  Box,
  VStack,
  Select,
  HStack,
  Input,
  Button, 
  useToast,
  Stack
} from '@chakra-ui/react';
import { useState , useEffect } from 'react';
import Decoration from '../../component/Decoration';
import Navbar from "../../component/Navbar";
import Title from "../../component/Title";
import Spinner from "../../component/Spinner";
import Footer from "../../component/Footer";
import {useNavigate } from 'react-router-dom';

const CustomerSetting=({user})=> {
 
  useEffect(() => {
    if (user && user.role !== 'VENDOR') {
      if(user && user.role ==='ADMIN')
      navigate('/registrationRequests');
      else{
        navigate('/')
      }
    }
  }, [user]);

const navbarItems = [
    {
      label: 'خدمات',
      path: '/products',
      color: 'black'
    },
    {
      label: 'طلبات',
      path: '/venderRequests',
      color: 'black'
    },
  ];

  const navbarItems2 = [
    {
      label: 'حجوزات',
      path: '/VenderReservations',
      color: 'black'
    },
    {
      label: 'اعدادات',
      path: '/vendor-setting',
      color: '#C08D5D'
    },
  ];

  const label = {
    display: "inline-block",
    width: "15rem",
    textAlign: "right"
  }

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
   // const [picture,setPicture]=useState('')
    const [maeroufNumber,setMaeroufNumber]=useState('')
    const [about,setAbout]=useState('')
    const [disableEditing, setDisableEditing] = useState(true);
    const [cancelEditing, setCancelEditing] = useState(true);
    const navigate = useNavigate();
    const toast=useToast()
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
          const request = await fetch('api/v1/user/getUser');
          const user = await request.json();
          const request2 = await fetch('api/v1/vendor/get-vendor');
          const vendor = await request2.json();
          setUsername(user.username)
          setName(user.name);
          setEmail(user.email)
          setPhoneNumber(user.phoneNumber)
          setMaeroufNumber(vendor.maeroufNumber)
          setAbout(vendor.about)
          setLoading(false)
        };
        fetchData();
      }, [cancelEditing]);

      const cancel = () => {
        setCancelEditing(!cancelEditing);
        setDisableEditing(true);
      };


      const saveEditing = async () => {
        if(!username ||!name ||!email|| !phoneNumber || !maeroufNumber || !about){
           return toast({
              title: 'الرجاء تعبئة جميع العناصر',
              position:'top',
              status:'error',
              isClosable: true,
            })
          }else{

        const body = {
          name: name,
          username: username,
          email: email,
          phoneNumber: phoneNumber,
          maeroufNumber: maeroufNumber,
          about: about
        };
    
        // const requestm = await fetch('/api/v1/vendor/checkmaerouf/'+maeroufNumber, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        // const dataM=await requestm.json();
        // if(dataM===true){
        //    toast({
        //     title: "رقم معروف موجود مسبقاً يرجى ادخال رقم اخر",
        //     position:'top',
        //     status:'error',
        //     isClosable: true,
        //   })
        //   return;
        // }else{
        const request = await fetch(`/api/v1/user/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await request.json();
        if (request.status === 200) {
          setCancelEditing(!cancelEditing);
          setDisableEditing(true);
        }
      }
    // }
    };

      const logout = async () => {
        const request = await fetch('/api/v1/auth/logout');
        if (request.status === 204) {
          localStorage.removeItem('loggedIn');
          navigate('/login');
        }
      };
      
  return (
   <>
   <VStack spacing={50}>
   
   <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
   
   <Title title={"اعدادات"}/>
   
   { loading? <Spinner/> :
    <>
   <Stack spacing={50} px={20} align={"center"} justify={"center"} width={'70%'} direction={['column', 'row']} >

    <VStack align='center' spacing={"3rem"} >
    <Box p={5} width={'50%'}>
    <label htmlFor="phone" style={label}>رقم الهاتف</label>
    <Input id="phone" width={'15rem'} variant='flushed' placeholder='رقم الهاتف' textAlign={'right'} mb={"1rem"} value={phoneNumber}
     onChange={e => setPhoneNumber(e.target.value)} disabled={disableEditing}/>
    <label htmlFor="about" style={label}>الوصف</label>
    <Input id={'about'} width={'15rem'} variant='flushed' placeholder='الوصف' textAlign={'right'}  mb={"1rem"} value={about}
    onChange={e => setAbout(e.target.value)} disabled={disableEditing}/>
    <label htmlFor="number" style={label}>رقم معروف</label>
    <Input id='number' width={'15rem'} variant='flushed' placeholder='رقم معروف' textAlign={'right'}  mb={"1rem"} value={maeroufNumber}
    onChange={e => setMaeroufNumber(e.target.value)} disabled={disableEditing}/>
    </Box>
    </VStack>

    <VStack align='center' spacing={"3rem"} >
    <Box p={5} width={'50%'}>
    <label htmlFor="username" style={label}>اسم المستخدم</label>
    <Input id={"username"} width={'15rem'} variant='flushed' placeholder='اسم المستخدم' textAlign={'right'} mb={"1rem"} value={username}
     onChange={e => setUsername(e.target.value)} disabled={disableEditing}/>
    <label htmlFor="name" style={label}>الاسم</label>
    <Input id='name' width={'15rem'} variant='flushed' placeholder='الاسم' textAlign={'right'}  mb={"1rem"} value={name}
     onChange={e => setName(e.target.value)} disabled={disableEditing}/>
    <label htmlFor="email" style={label}>البريد الالكتروني</label>
    <Input id='email' width={'15rem'} variant='flushed' placeholder='البريد الالكتروني ' textAlign={'right'} mb={"1rem"} value={email}
     onChange={e => email(e.target.value)} disabled={disableEditing}/>
    </Box>
    </VStack>

    </Stack>

   <HStack w={['65%','30%']} spacing={50}>
              {disableEditing ? (
                <>
                  <Button
                    type="submit"
                    onClick={logout}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    w={'50%'}
                  >
                     تسجيل الخروج
                  </Button>
                  <Button
                    type="submit"
                    // mt={'5rem'}
                    onClick={() => setDisableEditing(false)}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    // marginRight={'7rem'}
                    w={'50%'}
                  >
                    تعديل
                  </Button>
                </>
              ) : (
                <>
                   <Button
                    type="submit"
                    // mt={'5rem'}
                    onClick={cancel}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    // marginRight={'7rem'}
                    w={'50%'}
                  >
                    الغاء
                  </Button>
                  <Button
                    type="submit"
                    // mt={'5rem'}
                    onClick={saveEditing}
                    backgroundColor={'#CAA892'}
                    textColor={'white'}
                    textAlign={'right'}
                    // marginRight={'7rem'}
                    w={'50%'}
                  >
                    حفظ التغيرات
                  </Button>
                </>
              )}
    </HStack>
    </>
   }
   </VStack>
   <Footer/>
   <Decoration/>

   </>
  );
}

export default CustomerSetting;