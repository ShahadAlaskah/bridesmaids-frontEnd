import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import logo from '../Images/logo.png';
const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

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

      const data = await request.json();

      if (request.status === 200) {
        localStorage.setItem('loggedIn', true);
        navigate(-1);
      } else {
        alert(data.message);
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

          <VStack>
            <Button
              onClick={formSubmit}
              backgroundColor={'#CAA892'}
              textColor={'white'}
              textAlign={'right'}
              marginTop={'3rem'}
              marginLeft={'8rem'}
              width={'8rem'}
            >
              {' '}
              تسجيل الدخول
            </Button>
            {/* <Link to='/Login' marginLeft={'50rem'}>تسجيل الدخول</Link> */}
          </VStack>
        </FormControl>
      </Box>
    </HStack>
  );
};

export default Login;
