import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  Text,
  FormLabel,
  Input,
  HStack,
  Button,
  VStack,
  Heading,
} from '@chakra-ui/react';
import logo from '../../Images/logo.png';

const VendorRegister = () => {
  const [username, setUsername] = React.useState('');
  const [role, SetRole] = React.useState('VENDOR');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [pic, setPic] = React.useState('');
  const [maeroufNumber, setMaeroufNumber] = React.useState('');
  const [about, setAbout] = React.useState('');

  const navigate = useNavigate();

  const formSubmit = async e => {
    e.preventDefault();

    const bodyValue = {
      username,
      name,
      role,
      email,
      password,
      phoneNumber,
      location,
      pic,
      maeroufNumber,
      about,
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

      if (request.status === 201) {
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            تم التسجيل بنجاح
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            سنقوم بتفعيل حسابك بعد التحقق منه
          </AlertDescription>
        </Alert>;
      } else {
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
    <Box boxShadow={'lg'} maxW="80%" pb={'1rem'} ml={'7rem'} mt={'4rem'}>
      <HStack ml={'15rem'}>
        <Text className="text-center" fontSize={'1.5rem'} ml={'28rem'}>
          تسجيل كمزود خدمه
        </Text>
        <Image src={logo} width={'4rem'} alt={'logo'} />
      </HStack>
      <FormControl marginTop={'2rem'} marginLeft={'4rem'}>
        <HStack spacing={'12'} marginRight={'2rem'}>
          <Box>
            <Heading marginBottom={'4rem'}>Location</Heading>
          </Box>
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
              اسم المستخدم
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              id="InputUserName1"
              variant={'flushed'}
            />
          </Box>
        </HStack>
        <HStack spacing={'12'} marginLeft={'12rem'}>
          <Box className="mb-3">
            <FormLabel htmlFor="InputEmail1" textAlign={'right'}>
              البريد الالكتروني
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              id="InputEmail1"
              variant={'flushed'}
            />
          </Box>
          <Box className="mb-3">
            <FormLabel htmlFor="InputPassword1" textAlign={'right'}>
              الرمز السري
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="InputPasswrord1"
              variant={'flushed'}
            />
          </Box>
        </HStack>
        <HStack spacing={'12'} marginLeft={'12rem'}>
          <Box className="mb-3">
            <FormLabel htmlFor="InputPhoneNumber1" textAlign={'right'}>
              رقم الهاتف
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              type="number"
              id="InputPhoneNumber1"
              variant={'flushed'}
            />
          </Box>
          <Box className="mb-3">
            <FormLabel htmlFor="InputConfirmPass" textAlign={'right'}>
              تأكيد كلمة السر
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              type="password"
              id="InputConfirmPass"
              variant={'flushed'}
            />
          </Box>
        </HStack>
        <HStack spacing={'12'} marginLeft={'12rem'}>
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
          <Box className="mb-3">
            <FormLabel htmlFor="InputAbout" textAlign={'right'}>
              وصف
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={about}
              onChange={e => setAbout(e.target.value)}
              type="text"
              id="InputAbout"
              variant={'flushed'}
            />
          </Box>
          <Box className="mb-3">
            <FormLabel htmlFor="InputMaeroufNumber" textAlign={'right'}>
              الرقم المعروف
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={maeroufNumber}
              onChange={e => setMaeroufNumber(e.target.value)}
              type="text"
              id="InputMaeroufNumber"
              variant={'flushed'}
            />
          </Box>
        </HStack>
        <VStack>
          <Button
            mt={'2rem'}
            onClick={formSubmit}
            backgroundColor={'#CAA892'}
            textColor={'white'}
            textAlign={'right'}
            marginRight={'7rem'}
            width={'10rem'}
          >
            تسجيل
          </Button>
          {/* <Link to='/Login' marginLeft={'50rem'}>تسجيل الدخول</Link> */}
        </VStack>
      </FormControl>
    </Box>
  );
};

export default VendorRegister;
