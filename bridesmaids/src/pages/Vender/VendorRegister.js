import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Map from '../../component/Map';
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
  Stack,
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
  const [location, setLocation] = React.useState({lat:'',lng:""});
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
      lat:location.lat,
      lng:location.lng,
      pic,
      maeroufNumber,
      about,
    };

    try {
      if (!username ||!name ||!email||!password ||!phoneNumber || !maeroufNumber
        ) {
         return toast({
            title: 'الرجاء تعبئة جميع العناصر',
            position:'top',
            status:'error',
            isClosable: true,
          })
      
        } else 
        if (password !== confirmPass) {
          return toast({
            title: 'الرمز السري غير متطابق',
            position:'top',
            status:'error',
            isClosable: true,
          })
         
        }else{
          const requestm = await fetch('/api/v1/vendor/checkmaerouf/'+maeroufNumber, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const dataM=await requestm.json();
          if(dataM.maeroufNumber===maeroufNumber){
             toast({
              title: "رقم معروف مسجل مسبقاً",
              position:'top',
              status:'error',
              isClosable: true,
            })
            return;
          }   
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
        const timeout = setTimeout(() => {
         navigate('/')
        }, 3000); 
      }else if(request.status===400){
        if(data.message.startsWith('Duplicate')){
          const requeste = await fetch('/api/v1/user/checkemail/'+email, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const dataE=await requeste.json();
          if(dataE.email===email){
            return toast({
              title: " البريد الالكتروني مسجل مسبقاً يرجى اختيار  بريد الكتروني اخر",
              position:'top',
              status:'error',
              isClosable: true,
            })
          }
          const requestu = await fetch('/api/v1/user/checkusername/'+username, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const dataU=await requestu.json();
          if(dataU.username===username){
            return toast({
              title: " اسم المستخدم مسجل مسبقاً يرجى اختيار اسم مستخدم اخر",
              position:'top',
              status:'error',
              isClosable: true,
            })
          }} else{
            return toast({
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
    <Box boxShadow={'lg'} maxW={"80%"} pb={'2rem'} ml={'8rem'} mt={'6rem'}>
      <HStack alignItems={"center"} justifyContent={"end"} pr={"1rem"}>
        <Text className="text-center" fontSize={'1.5rem'}>
        تسجيل كمزود خدمه
        </Text>
        <Image src={logo} width={'4rem'} alt={'logo'} />
      </HStack>
      <FormControl marginTop={'2rem'}>
     
      <VStack spacing={"2rem"}>
        <HStack spacing={"5rem"}>
          <VStack spacing={"3rem"}>
          <Box backgroundColor={'gray.100'} w={235} h={150}>
          <Map setLocation={setLocation}/>
          </Box> 
          </VStack>
          <VStack spacing={"3rem"}>
          <Box>
            <FormLabel htmlFor="InputPhoneNumber5" textAlign={'right'}>
              رقم معروف
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={maeroufNumber}
              onChange={e => setMaeroufNumber(e.target.value)}
              type="text"
              id="InputPhoneNumber5"
              variant={'flushed'}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="about" textAlign={'right'}>
              الوصف 
            </FormLabel>
            <Input
              width={'15rem'}
              textAlign={'right'}
              value={about}
              onChange={e => setAbout(e.target.value)}
              type="text"
              id="about"
              variant={'flushed'}
            />
          </Box> 
          </VStack>
          <VStack spacing={"3rem"}>
          <Box>
            <FormLabel htmlFor="InputName1" textAlign={'right'} w={"15rem"}>
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
            <FormLabel htmlFor="InputPassword1" textAlign={'right'} w={"15rem"}>
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
          <Box>
            <FormLabel htmlFor="InputConfirmPass" textAlign={'right'} w={"15rem"}>
              تأكيد كلمة السر
            </FormLabel>
            <Input
                width={'15rem'}
                textAlign={'right'}
                type="password"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                id="InputConfirmPass"
                variant={'flushed'}
              />
          </Box>
          </VStack>

          <VStack spacing={"3rem"}>
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
          <Box>
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
          <Box>
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
          </VStack>
          </HStack>

        <VStack>
          <Button
            onClick={formSubmit}
            backgroundColor={'#CAA892'}
            textColor={'white'}
            textAlign={'right'}
            width={'15rem'}
          >
            تسجيل
          </Button>
          <Link to='/Login'>تسجيل الدخول</Link>
        </VStack>
        
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
