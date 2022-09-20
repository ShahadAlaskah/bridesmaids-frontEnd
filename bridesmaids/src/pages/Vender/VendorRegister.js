import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
useDisclosure,
AlertDialog,
AlertDialogOverlay,
AlertDialogContent,
AlertDialogHeader,
AlertDialogBody,
AlertDialogFooter,
  FormControl,
  Text,
  FormLabel,
  Input,
  HStack,
  Button,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import logo from '../../Images/logo.png';


const VendorRegister = () => {
  const [username, setUsername] = React.useState('');
  const [role, SetRole] = React.useState('VENDOR');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [pic, setPic] = React.useState('');
  const [maeroufNumber, setMaeroufNumber] = React.useState('');
  const [about, setAbout] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const navigate = useNavigate();
  const toast=useToast();

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
      if (!username ||!name ||!email||!password ||!phoneNumber || !maeroufNumber
        ) {
          toast({
            title: 'الرجاء تعبئة جميع العناصر',
            position:'top',
            status:'error',
            isClosable: true,
          })
          return;
        } else 
        if (password !== confirmPass) {
          toast({
            title: 'الرمز السري غير متطابق',
            position:'top',
            status:'error',
            isClosable: true,
          })
          return;
        }else {
      const request = await fetch('/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue),
      });

      const data = await request.json();

      if (request.status === 201) {
        onOpen();  
      }else if(request.status===400){  
        if(data.message.startsWith('Duplicate entry ')){
          toast({
            title: 'البريد الالكتروني او اسم المستخدم موجود مسبقا يرجى استخدام بريد الكتروني اخر',
            position:'top',
            status:'error',
            isClosable: true,
          })
        }else{
        toast({
          title: data.message,
          position:'top',
          status:'error',
          isClosable: true,
        })
      }
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
    <Box boxShadow={'lg'} maxW="80%"  pb={'1rem'} ml={'7rem'} mt={'4rem'}>
      <HStack ml={'15rem'}>
        <Text className="text-center" fontSize={'1.5rem'} ml={'35rem'}>
        تسجيل كمزود خدمه

        </Text>
        <Image src={logo} width={'4rem'} alt={'logo'} />
      </HStack>
      <FormControl marginTop={'2rem'} marginLeft={'20rem'}>
        <HStack spacing={'12'} marginRight={'12rem'}>
          <Box>
            <Heading marginBottom={'4rem'}>Location</Heading>
          </Box>
          <Box>
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
                size={'5px'}
                width={'15rem'}
                textAlign={'right'}
                type="password"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                id="InputConfirmPass"
                variant={'flushed'}
              />
          </Box>
        </HStack>
        <HStack spacing={'12'} marginLeft={'12rem'}>
          {/* <Box className='mb-3'>
        <FormLabel htmlFor='InputPic' textAlign={'right'}>
        اضف صورة 
          </FormLabel>
          <Input
           textAlign={'right'}
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            type='file'
            id='InputPic'
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent alignItems={'center'}>
            
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             !تم التسجيل بنجاح
            </AlertDialogHeader>

            <AlertDialogBody>
            سنقوم بتفعيل حسابك بعدالتحقق منه
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button backgroundColor={"#CAA892"} onClick={onClose} textColor={"white"} width={"120px"}>موافق</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> 
    </Box>
  );
};

export default VendorRegister;
