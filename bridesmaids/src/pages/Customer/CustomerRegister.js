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
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure
} from '@chakra-ui/react';
import logo from '../../Images/logo.png';
import Spinner from '../../component/Spinner';


const CustomerRegister = () => {
  const [username, setUsername] = React.useState('');
  const [role, SetRole] = React.useState('CUSTOMER');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const toast=useToast();
  const options = {
    value1: 'F',
    label1: 'انثى',
    value2: 'M',
    label2: 'ذكر',
  };

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
      age,
      gender,
    };

    try {
      if (!username ||!name ||!email||!password ||!phoneNumber || !age ||!gender
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
            
          })
        const data=await request.json();
          if(request.status === 201) {
            onOpen();
            const timeout = setTimeout(() => {
             navigate('/login')
            }, 5000);
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
            }
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
      toast({
        title: 'server error',
        position:'top',
        status:'error',
        isClosable: true,
      })
    }
 
  };

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/');
    }
  }, []);

  return (
    <HStack justifyContent={'center'} mt={"4rem"}>
      <Image
        src="https://i.pinimg.com/564x/34/ac/14/34ac14926963b749e84dc0e480d4114c.jpg"
        width={['0rem','0rem','28rem']}
      />
      <Box boxShadow={'lg'} scale={'3rem'} px={'1rem'} pb={'1rem'}>
        <HStack mr={['2rem','0rem','0rem']}>
          <Text fontSize={['1rem','1.5rem','1.5rem']} ml={'20rem'}>
            تسجيل جديد
          </Text>
          <Image src={logo} width={['2rem','2.5rem','2.5rem']} />
        </HStack>
        <FormControl marginLeft={'4rem'} mt={['1rem','0rem','0rem']}>
          <VStack marginRight={'2rem'}>
            <Box>
              <FormLabel
                fontSize={['14px']}
                htmlFor="InputName1"
                textAlign={'right'}
              >
                الاسم
              </FormLabel>
              <Input
                size={'5px'}
                width={'14rem'}
                textAlign={'right'}
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                id="InputName1"
                variant={'flushed'}
              />
            </Box>
            <Box>
              <FormLabel
                fontSize={'14px'}
                textAlign={'right'}
                htmlFor="InputUserName1"
              >
                اسم المستخدم
              </FormLabel>
              <Input
                size={'5px'}
                width={'14rem'}
                textAlign={'right'}
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                id="InputUserName1"
                variant={'flushed'}
              />
            </Box>
            <Box>
              <FormLabel
                fontSize={'14px'}
                htmlFor="InputEmail1"
                textAlign={'right'}
              >
                البريد الالكتروني
              </FormLabel>
              <Input
                size={'5px'}
                width={'14rem'}
                textAlign={'right'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                id="InputEmail1"
                variant={'flushed'}
              />
            </Box>
            <Box>
              <FormLabel
                fontSize={'14px'}
                htmlFor="InputPassword1"
                textAlign={'right'}
              >
                الرمز السري
              </FormLabel>
              <Input
                size={'5px'}
                width={'14rem'}
                textAlign={'right'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                id="InputPasswrord1"
                variant={'flushed'}
              />
            </Box>
            <Box>
              <FormLabel
                fontSize={'14px'}
                htmlFor="InputConfirmPass"
                textAlign={'right'}
              >
                تأكيد الرمز السري
              </FormLabel>
              <Input
                size={'5px'}
                width={'14rem'}
                textAlign={'right'}
                type="password"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                id="InputConfirmPass"
                variant={'flushed'}
              />
            </Box>
            <Box className="mb-3">
              <FormLabel
                htmlFor="InputPhoneNumber1"
                fontSize={'14px'}
                textAlign={'right'}
              >
                رقم الهاتف
              </FormLabel>
              <Input
                size={'5px'}
                width={'14rem'}
                textAlign={'right'}
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                type="number"
                id="InputPhoneNumber1"
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
              <FormLabel
                htmlFor="InputAge"
                fontSize={'14px'}
                textAlign={'right'}
              >
                العمر
              </FormLabel>
              <Input
                size={'5px'}
                width={'14rem'}
                textAlign={'right'}
                value={age}
                onChange={e => setAge(e.target.value)}
                type="number"
                id="InputNumber"
                variant={'flushed'}
              />
            </Box>
            <Box>
              <FormLabel
                htmlFor="InputGender"
                fontSize={'14px'}
                textAlign={'right'}
                ml="11rem"
              >
                الجنس
              </FormLabel>
              <Select
              id='InputGender'
                onChange={e => setGender(e.target.value)}
                variant={'flushed'}
                placeholder="اختر"
                size={'5px'}
                textAlign={"center"}
              >
                <option value={options.value1}>{options.label1}</option>
                <option value={options.value2}>{options.label2}</option>
              </Select>
            </Box>
          </VStack>
          <VStack spacing={['1rem','8rem','0.5rem']} mt={"1rem"} marginRight={'2rem'}>
            <Button
              onClick={formSubmit}
              backgroundColor={'#CAA892'}
              textColor={'white'}
              textAlign={'right'}
              size={'sm'}
              width={'15rem'}
            
            >
              تسجيل
            </Button>
            <Link to='/Login'>تسجيل الدخول</Link>
          </VStack>
        </FormControl>
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent  alignItems={'center'} h={'12rem'} >
            
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             !تم التسجيل بنجاح
            </AlertDialogHeader>
           <AlertDialogBody>
            سيتم نقلك الي صفحة تسجيل الدخول خلال ثواني
            <Spinner/>
           </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> 
      </Box>
    </HStack>
  );
};

export default CustomerRegister;
