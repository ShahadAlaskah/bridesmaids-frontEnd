import React from 'react';
import {
  Box,
  VStack,
  Select,
  HStack,
  Input,
  Button 
} from '@chakra-ui/react';
import { useState , useEffect } from 'react';
import Decoration from '../../component/Decoration';
import Navbar from "../../component/Navbar";
import Title from "../../component/Title";
// import Footer from "../../component/Footer";
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

    useEffect(() => {
        const fetchData = async () => {
          const request = await fetch('/api/v1/user/getUser');
          const user = await request.json();
          const request2 = await fetch('/api/v1/vendor/get-vendor');
          const vendor = await request2.json();
          setUsername(user.username)
          setName(user.name);
          setEmail(user.email)
          setPhoneNumber(user.phoneNumber)
          setMaeroufNumber(vendor.maeroufNumber)
          setAbout(vendor.about)
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
          username: username,
          email: email,
          phoneNumber: phoneNumber,
          maeroufNumber: maeroufNumber,
          about: about
        };
    
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
   
   <HStack spacing={50} px={20} alignSelf="end" width={'70%'} >

    <VStack align='end' spacing={"3rem"} >
    <Box p={5} width={'50%'} alignSelf="end">
    <Input width={'15rem'} variant='flushed' placeholder='رقم الهاتف' textAlign={'right'} mb={"1rem"} value={phoneNumber}
     onChange={e => setPhoneNumber(e.target.value)} disabled={disableEditing}/>
    <Input width={'15rem'} variant='flushed' placeholder='الوصف'textAlign={'right'}  mb={"1rem"} value={about}
    onChange={e => setAbout(e.target.value)} disabled={disableEditing}/>
    <Input width={'15rem'} variant='flushed' placeholder='رقم معروف'textAlign={'right'}  mb={"1rem"} value={maeroufNumber}
    onChange={e => setMaeroufNumber(e.target.value)} disabled={disableEditing}/>
    </Box>
    </VStack>

    <VStack align='end' spacing={"3rem"} >
    <Box p={5} width={'50%'} alignSelf="end" >
    <Input width={'15rem'} variant='flushed' placeholder='اسم المستخدم' textAlign={'right'} mb={"1rem"} value={username}
     onChange={e => setUsername(e.target.value)} disabled={disableEditing}/>
    <Input width={'15rem'} variant='flushed' placeholder='الاسم' textAlign={'right'}  mb={"1rem"} value={name}
    onChange={e => setName(e.target.value)} disabled={disableEditing}/>
    <Input width={'15rem'} variant='flushed' placeholder='البريد الالكتروني ' textAlign={'right'} mb={"1rem"} value={email}
     onChange={e => email(e.target.value)} disabled={disableEditing}/>
    </Box>
    </VStack>

    </HStack>

   <HStack w={'30%'} spacing={50}>
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

   </VStack>

   <Decoration />
   </>
  );
}

export default CustomerSetting;