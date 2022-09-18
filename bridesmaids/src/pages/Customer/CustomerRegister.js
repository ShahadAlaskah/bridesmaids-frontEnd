import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Image,Select,FormControl, Text,FormLabel,Input, HStack, Button, VStack} from '@chakra-ui/react';
import ErrorMessage from '../../component/ErrorMessage';
const CustomerRegister = () => {
  const [username, setUsername] = React.useState('');
  const [role,SetRole]=React.useState('CUSTOMER');
  const [name,setName]=React.useState('');
  const [email,setEmail]=React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber,setPhoneNumber]=React.useState('');
  const [location,setLocation]=React.useState('');
  const [age,setAge]=React.useState('');
  const [gender,setGender]=React.useState('');
  const [error,setError]=React.useState(false);
  const [confirmPass,setConfirmPass]=React.useState('');
  const options={
   value1:'F',
    label1:'Female',
    value2:'M',
    label2:'Male', 
  }


  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();

    const bodyValue = {
      username,
      name,
      role,
      email,
      password,
      phoneNumber,
     age,
     gender,
    };

    try {
      const request = await fetch('/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue),
      });

      const data = await request.json();

      const getdata = await fetch('/api/v1/user/register', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue),
      });

      const info = await request.json();
     
      if (request.status === 201) {
       navigate('/login')
      }else 
      if(!username||!name||!email||!password||!phoneNumber||!age||!gender){
        setError(true);
      }else
      if(password!=confirmPass){
        setError(true)
        console.log(confirmPass)
      }
      else {
      }
    } catch (e) {
      alert('Server error');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/');
    }
  }, []);

  return (
    <HStack>
      <Image src='./img/weddingflower.jfif' width={'30rem'}/>
    <Box boxShadow={"lg"} scale={'3rem'}>
     
      <HStack>
      <Text className='text-center' fontSize={'1.5rem'} ml={'20rem'}>تسجيل جديد</Text>
      <Image src="./logo.png" width={'3rem'}/>
      </HStack>
      <FormControl marginTop={'2rem'} marginLeft={'4rem'}>
       {error && <ErrorMessage>الرجاء التأكد من تعبئة جميع العناصر</ErrorMessage>}
        <VStack marginRight={'2rem'}>
        <Box>
        <FormLabel fontSize={"15px"} htmlFor='InputName1' textAlign={'right'}>
            الاسم
          </FormLabel>
          <Input
          size={"15px"}
          width={'15rem'}
           textAlign={'right'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            id='InputName1'
            variant={'flushed'}
          />
        </Box>
        <Box>
        <FormLabel fontSize={"15px"} textAlign={'right'} htmlFor='InputUserName1'>
            اسم المستخدم
          </FormLabel>
          <Input 
          size={'5px'}
           width={'15rem'}
            textAlign={'right'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            id='InputUserName1'
            variant={'flushed'}
          />
        </Box>
        <Box>
        <FormLabel fontSize={'15px'} htmlFor='InputEmail1' textAlign={'right'}>
           البريد الالكتروني
          </FormLabel>
          <Input
          size={"5px"}
           width={'15rem'}
          textAlign={'right'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            id='InputEmail1'
            variant={'flushed'}
          />
        </Box>
        <Box>
        {error && <ErrorMessage>الرمز السري غير متطابق</ErrorMessage>}
        <FormLabel fontSize={"15px"} htmlFor='InputPassword1' textAlign={'right'}>
           الرمز السري
          </FormLabel>
          <Input
          size={"5px"}
           width={'15rem'}
           textAlign={'right'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            id='InputPasswrord1'
            variant={'flushed'}
          />
        </Box>
        <Box>
        <FormLabel fontSize={'15px'} htmlFor='InputConfirmPass' textAlign={'right'}>
          تأكيد الرمز السري
          </FormLabel>
          <Input
          size={'5px'}
           width={'15rem'}
           textAlign={'right'}
            type='password'
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            id='InputConfirmPass'
            variant={'flushed'}
          />
        </Box>
        <Box className='mb-3'>
        <FormLabel htmlFor='InputPhoneNumber1' fontSize={'15px'} textAlign={'right'}>
          رقم الهاتف
          </FormLabel>
          <Input
          size={'15px'}
           width={'15rem'}
           textAlign={'right'}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type='number'
            id='InputPhoneNumber1'
            variant={'flushed'}
          />
        </Box>
        {/* <Box className='mb-3'>
        <FormLabel htmlFor='InputPic' textAlign={'right'}>
        pic
          </FormLabel>
          <Input
           textAlign={'right'}
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            type='text'
            id='InputPic'
            variant={'flushed'}
          />
        </Box> */}
        <Box>
        <FormLabel htmlFor='InputAge' fontSize={'15px'} textAlign={'right'}>
       العمر
          </FormLabel>
          <Input
          size={'15px'}
           width={'15rem'}
           textAlign={'right'}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type='number'
            id='InputNumber'
            variant={'flushed'}
          />
        </Box>
        <Box className='mb-3'>
        <FormLabel htmlFor='InputAge' fontSize={'15px'} textAlign={'right'}>
       الجنس
          </FormLabel>
        <Select  onChange={(e) => setGender(e.target.value)} variant={'flushed'} placeholder='Select option' size={'15px'} marginLeft={'4rem'}>
        <option value={options.value1}>{options.label1}</option> 
        <option value={options.value2}>{options.label2}</option> 
</Select>
        </Box>
        </VStack>
        <VStack>
         <Button onClick={formSubmit} backgroundColor={'#CAA892'} textColor={'white'} textAlign={'right'} marginRight={'7rem'} size={'sm'} width={'10rem'}>تسجيل</Button>
         {/* <Link to='/Login' marginLeft={'50rem'}>تسجيل الدخول</Link> */}
         </VStack>
      </FormControl>
     
    </Box>
    </HStack>
  );
};

export default CustomerRegister;
