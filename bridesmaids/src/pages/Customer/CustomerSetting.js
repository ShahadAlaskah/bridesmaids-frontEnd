import React from 'react';
import {
  Box,
  VStack,
  Select,
  HStack,
  Input,
  Stack,
  Button ,
  useToast
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
    if (user && user.role !== 'CUSTOMER') {
      if(user && user.role ==='VENDOR'){
      navigate('/products');
      }else{
        navigate('/registrationRequests');
      }
    }
  }, [user]);

  const navbarItems = [
    {
      label: 'اعدادات',
      path: '/customer-setting',
      color: '#C08D5D'
    },{
      label: 'طلبات',
      path: '/customerRequests',
      color: 'black'
    },{
      label: 'حجوزات',
      path: '/customerReservations',
      color: 'black'
    }
  ];

  const navbarItems2=[
    {
        label:"تواصل معنا",
        path:"/contact",
        color: 'black'
    },{
        label:"عن وصيفة",
        path:"/about",
        color: 'black'
    },{
        label:"اماكن الزفاف",
        path:"/places",
        color: 'black'
    }
]

const label = {
  display: "inline-block",
  width: "15rem",
  textAlign: "right"
}

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender,setGender]=useState('')
    const [age,setAge]=useState('')
    const [disableEditing, setDisableEditing] = useState(true);
    const [cancelEditing, setCancelEditing] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast=useToast()
    const options = {
        value1: 'F',
        label1: 'انثى',
        value2: 'M',
        label2: 'ذكر',
      };

    useEffect(() => {
        const fetchData = async () => {
          const request = await fetch('api/v1/user/getUser');
          const user = await request.json();
          console.log(user)
          const request2 = await fetch('api/v1/customer/getcustomer');
          const customer = await request2.json();
          console.log(customer)
          setUsername(user.username)
          setName(user.name);
          setEmail(user.email)
          setPhoneNumber(user.phoneNumber)
          setGender(customer.gender)
          setAge(customer.age)
          setLoading(false)
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
          age: age,
          gender: gender
        };

          //Check email
          const requeste = await fetch('/api/v1/user/checkemail/'+email)
          const dataE=await requeste.json();
  
          //check username
          const requestu = await fetch('/api/v1/user/checkusername/'+username);
          const dataU=await requestu.json();
    
        if(requeste.status===200 && user.id!==dataE.id){
          toast({
            title: " البريد الالكتروني مسجل مسبقاً يرجى اختيار  بريد الكتروني اخر",
            position:'top',
            status:'error',
            isClosable: true,
          })
        }else if(requestu.status===200 && user.id!==dataU.id){
          toast({
            title: " اسم المستخدم مسجل مسبقاً يرجى اختيار اسم مستخدم اخر",
            position:'top',
            status:'error',
            isClosable: true,
          })
        }else{
        const request = await fetch(`/api/v1/user/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await request.json();
        console.log(data)
        if (request.status === 200) {
          setCancelEditing(!cancelEditing);
          setDisableEditing(true);
        }
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

   { loading? <Spinner/> :
    <>
   <Stack spacing={50} px={20} align={"center"} justify={"center"} width={'70%'} direction={['column', 'row']} >

    <VStack align='center' spacing={"3rem"} >
    <Box p={5} width={'50%'}>
    <label htmlFor="phone" style={label}>رقم الهاتف</label>
    <Input id='phone' width={'15rem'} variant='flushed' placeholder='رقم الهاتف' textAlign={'right'} mb={"1rem"} value={phoneNumber}
     onChange={e => setPhoneNumber(e.target.value)} disabled={disableEditing}/>
    <label htmlFor="age" style={label}>العمر</label>
    <Input id='age' width={'15rem'} variant='flushed' placeholder='العمر'textAlign={'right'}  mb={"1rem"} value={age}
    onChange={e => setAge(e.target.value)} disabled={disableEditing}/>
    <label htmlFor="gender" style={label}>الجنس</label>
    <Select
    id='gender'
    value={gender}
    onChange={e => setGender(e.target.value)}
    variant={'flushed'}
    placeholder="Select option"
    size={'14px'}
    width="15rem"
    disabled={disableEditing}
    textAlign={"center"}
    >
    <option value={options.value1}>{options.label1}</option>
    <option value={options.value2}>{options.label2}</option>
     </Select>
    </Box>
    </VStack>

    <VStack align='center' spacing={"3rem"} >
    <Box p={5} width={'50%'}>
    <label htmlFor="username" style={label}>اسم المستخدم</label>
    <Input id='username' width={'15rem'} variant='flushed' placeholder='اسم المستخدم' textAlign={'right'} mb={"1rem"} value={username}
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