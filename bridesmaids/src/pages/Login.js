import {
    Button,
    Flex,
    Heading,
    Input,
    useToast,
    VStack,
  } from '@chakra-ui/react';
  import React, { useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const toast = useToast();
    const navigate = useNavigate();
  
    const login = async () => {
      const request = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
          authorization: 'Basic ' + btoa(username + ':' + password),
        },
      });
  
      const data = await request.json();
  
      if (request.status === 401) {
        toast({
          title: 'Error',
          description: data.message,
          status: 'error',
          duration: 2000,
          isClosable: false,
          position: 'top',
        });
      } else {
        localStorage.setItem('loggedIn', true);
        navigate('/');
      }
    };
  
    useEffect(() => {
      if (localStorage.getItem('loggedIn')) {
        navigate('/');
      }
    }, []);
  
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <VStack width="20rem" spacing="2rem">
          <Heading>Login !</Heading>
          <Input
            onChange={e => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          <Button onClick={login} width="100%">
            Login
          </Button>
        </VStack>
      </Flex>
    );
  };
  
  export default Login;