import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Select,
  FormControl,
  Text,
  FormLabel,
  Input,
  HStack,
  Button,
  VStack,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import logo from '../Images/logo.png';
const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [title,setTitle]=React.useState('');
  const [details,setDetails]=React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const navigate = useNavigate();


 
  const formSubmit = async e => {
    e.preventDefault();

    try {
      const request = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password),
        },
      });
      console.log(request);
      const data = await request.json();
      if (request.status === 200) {
        localStorage.setItem('loggedIn', true );
        if(data.role==='CUSTOMER'){
        navigate(-1);
        }else if(data.role==='VENDOR'){
          navigate('/venderRequests')
        }else if(data.role==='ADMIN'){
          navigate('/registrationRequests')
        }
      }  else 
      if(request.status===401){
       if(data.message==='Bad credentials'){
      onOpen();
         setTitle('خطأ في اسم المستخدم او الرمز السري')
         setDetails('الرجاء التأكد من البيانات المدخله')
     }else 
     if (data.message==='User is disabled'){
      onOpen();
      setTitle('!حسابك غير مفعل بعد')
      setDetails('انتظر حتى نقوم بتفعيل حسابك')
     }
     }
    } catch (e) {
      alert('Server error');
      console.log(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/');
    }
  }, []);

  return (
    <HStack spacing={'2rem'} justifyContent={'center'}>
      <Image
        src="https://i.pinimg.com/564x/34/ac/14/34ac14926963b749e84dc0e480d4114c.jpg"
        width={'28rem'}
      />
      <Box boxShadow={'lg'} width={'20rem'} height={'30rem'}>
        <HStack>
          <Text className="text-center" fontSize={'1.5rem'} ml={'7rem'}>
            تسجيل الدخول
          </Text>
          <Image src={logo} width={'3rem'} />
        </HStack>
        <FormControl marginTop={'2rem'}>
          <Box>
            <FormLabel
              fontSize={'15px'}
              textAlign={'right'}
              htmlFor="InputUserName1"
            >
              اسم المستخدم
            </FormLabel>
            <Input
              ml={'3rem'}
              size={'5px'}
              width={'15rem'}
              textAlign={'right'}
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              id="InputUserName1"
              variant={'flushed'}
            />
          </Box>
          <Box mt={'2rem'}>
            <FormLabel
              fontSize={'15px'}
              htmlFor="InputPassword1"
              textAlign={'right'}
            >
              الرمز السري
            </FormLabel>
            <Input
              ml={'3rem'}
              size={'5px'}
              width={'15rem'}
              textAlign={'right'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="InputPasswrord1"
              variant={'flushed'}
            />
          </Box>

          <VStack   marginTop={'2rem'} spacing={'4rem'} ml={'1rem'}>
          <Button
              onClick={formSubmit}
              backgroundColor={'#CAA892'}
              textColor={'white'}
              textAlign={'right'}
              width={'8rem'}
            >
              تسجيل الدخول
            </Button> 
          <Link to='/role'>تسجيل جديد</Link> 
          </VStack>
        </FormControl>
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent alignItems={'center'}>
            
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             {title}
            </AlertDialogHeader>

            <AlertDialogBody>
            {details}
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button backgroundColor={"#CAA892"} onClick={onClose} textColor={"white"} width={"120px"}>موافق</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> 
      </Box>
    </HStack>
  );
};

export default Login;
