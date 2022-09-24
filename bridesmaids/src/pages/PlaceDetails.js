import  {HStack, Text, VStack ,Box , Stack, Heading , Button , Input,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure, Radio , RadioGroup , useToast} from "@chakra-ui/react";
import Navbar from "../component/Navbar";
import Title from "../component/Title";
import ImagesGallery from "../component/ImagesGallery";
import React, { useEffect, useRef, useState } from 'react';
import {useParams} from 'react-router-dom';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import {useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'
import DisplayMap from "../component/DisplayMap";
import Spinner from "../component/Spinner";
import Footer from "../component/Footer";



const PlaceDetails=()=>{
  const [navbarItems,setNavbarItems]=useState([]);
  const [navbarItems2,setNavbarItems2]=useState([]);

  useEffect(()=>{
    const fetchUser = async () => {
    const request = await fetch('/api/v1/user/me');
    const data= await request.json();
    if(request.status ===401){
      
      setNavbarItems([
        {
          label: 'تسجيل الدخول',
          path: '/login',
          color: 'black'
        },
        {
          label: 'تسجيل',
          path: '/role',
          color: 'black'
        },
        
      ])
      setNavbarItems2([
        {
          label: 'تواصل معنا',
          path: '/contact',
          color: 'black'
        },
        {
          label: 'عن وصيفة',
          path: '/about',
          color: 'black'
        },
        {
          label: 'اماكن الزفاف',
          path: '/places',
          color: '#C08D5D'
        },
      ])
    }else{
      setNavbarItems([
        {
          label: 'اعدادات',
          path: '/customer-setting',
          color: 'black'
        },{
          label: 'طلبات',
          path: '/customerRequests',
          color: 'black'
        },{
          label: 'حجوزات',
          path: '/customerReservations',
          color: 'black'
        }
      ])
      setNavbarItems2([
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
            color: '#C08D5D'
        }
    ])}}
    fetchUser();
  },[])


  const toast=useToast()
  const params = useParams();
  const productId = params.id;
  const[name,setName]=useState('');
  const[vendorName,setVendorName]=useState('');
  const[vendorId,setVendorId]=useState()
  const[description,setDescription]=useState('');
  const[price,setPrice]=useState();
  const[capacity,setCapacity]=useState();
  const[pictures,setPictures]=useState([]);
  const[city,setCity]=useState('')
  const[lat,setLat]=useState('')
  const[lng,setLng]=useState('')
  const[loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[disabledDays,setDisabledDays]=useState([])
  const[phoneNumber,setPhoneNumber]=useState('')
  const[email,setEmail]=useState('')

  // Radio button
  const[selectedDay, setSelectedDay] = useState('');
  const[note,setNote] = useState("")
  const[value, setValue] = useState()


  // Get user Data
  useEffect(()=>{
      const fetchUser = async () => {
          const request = await fetch("/api/v1/user/me");
          const data = await request.json();
          setPhoneNumber(data.phoneNumber)
        };
        fetchUser();
  },[]);

  // Get Product Data
  useEffect(()=>{
      const fetchProductDetails = async () => {
          const request = await fetch("/api/v1/product/byProductId/"+productId);
          const data = await request.json();
          setName(data.name)
          setDescription(data.description)
          setPrice(data.price)
          setVendorId(data.vendorId)
          const requestd= await fetch("/api/v1/user/byVendor/"+data.vendorId);
          const data2 = await requestd.json();
          setVendorName(data2.name)
          setEmail(data2.email)
        };
        fetchProductDetails();
  },[]);

  // Get Place Data
   useEffect(()=>{
      const fetchPlaceDetails = async () => {
          const request = await fetch("/api/v1/place/getPlaceByProductId/"+productId);
          const data = await request.json();
          setCapacity(data.capacity)
          setCity(data.city)
          setLat(data.lat)
          setLng(data.lng)
        };
        fetchPlaceDetails();
  },[]);

  // Get Product Pictures
  useEffect(()=>{
      const fetchPictures= async()=>{
          const request= await fetch("/api/v1/picture/byProduct/"+productId);
          const data = await request.json();
          const pic = data.map((pic) =>{
              return pic.pictureUlr
          })
          setPictures(pic)
      };
      fetchPictures();
  },[]);

   // Get Product times
   useEffect(()=>{
    const fetchReservedTimes= async()=>{
        const request= await fetch("/api/v1/timeSlot/byProduct/"+productId);
        const data = await request.json();
        const times = data.map((time) =>{
            return{
                year: time.year,
                month: time.month,
                day: time.day,
            }
        })
        setDisabledDays(times)
        setLoading(false);
    };
    fetchReservedTimes();
},[]);


  const sendEmail = () => {
    let templateParams = {
        vendor_name: vendorName,
        email: email,
        name: name
      };
    
      emailjs.send("service_05xv9lh","template_zxleita", templateParams , "OlZqYySu9TtUdJuUg")
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
          console.log('FAILED...', error);
        });
  };

  const sendRequest= async ()=>{

    if(!selectedDay) {
       return toast({
          title: 'الرجاء اختيار تاريخ الحجز',
          position:'top',
          status:'error',
          isClosable: true,
        })
      }else if(!value){
        return toast({
          title: 'الرجاء اختيار طريقة التواصل المفضلة ',
          position:'top',
          status:'error',
          isClosable: true,
        })
      }else{
    let way=''
    if(value=="1"){
      way="هاتف-"+phoneNumber
    }else{
      way="زيارة القاعة"
    }

    const bodyValue = {
      vendorId,
      productId,
      dateReceived:String(new Date()),
      bookDate:selectedDay.year+"/"+selectedDay.month+"/"+selectedDay.day,
      wayToCommunicate:way,
      price,
      note,
    };

    try {
      const request = await fetch('/api/v1/request/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue),
      });

      const data = await request.json();
     
      if (request.status === 201) {
        onClose()
        toast({
          description:'تم طلب الحجز بنجاح! سوف يتم التواصل معك خلال 24 ساعة',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })  
      sendEmail()
      } else {
        console.log("erroe")
      }
    } catch (e) {
      alert('Server error');
      console.log(e);
    }
  }
  };


return(
  <VStack> 
 { loading ? <Spinner/> :
  <>
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>

    <Title title={name}/>




    <Stack w={"100%"} spacing={0} px={"5rem"} mb={"4rem"} direction={['column', 'row']}>

      <VStack w={"60%"}>
      <ImagesGallery pictures={pictures} /> 
      </VStack>

      <VStack w={"40%"} flex={1}
        flexDirection="column"
        justifyContent="start"
        alignItems="end"
        >


        <Heading fontSize={'1rem'} fontFamily={'body'}>
          {name}
        </Heading>

        <Text fontWeight={600} color={'gray.500'} size="sm" mb={4} onClick={()=>navigate('/vendordetails/'+vendorId)}>
         {vendorName} 
        </Text>

        <Text fontWeight={400} color={'gray.500'} size="sm" mb={4}>
         {city} 
        </Text>

        <Text
          textAlign={'end'}
          color={'gray.700'}
          >
          {description}
        </Text>

        <Text fontWeight={600} color={'gray.500'} size="sm">
        تبدأ الاسعار من : {price}ريال  
        </Text>

        <Text fontWeight={600} color={'gray.500'} size="sm">
          السعة : {capacity} شخص
        </Text>
      
        <Box backgroundColor={'gray.100'} w={"20rem"} h={"15rem"}>
        <DisplayMap  lat={lat} lng={lng}/>
        </Box>
        
        <Button w={"10rem"} alignSelf={"start"} backgroundColor={"#CAA892"} onClick={()=>{
          if(localStorage.getItem('loggedIn')){
            onOpen()
          }else{
          onClose()
          navigate("/login")
          }
          }} textColor={"white"} variant='solid' >
         طلب حجز
        </Button>


      </VStack>
    
    </Stack>
  

    <Modal  isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
      <ModalHeader textAlign={"center"}>طلب حجز</ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={5}> 
      <VStack spacing={"2rem"}>

      <Calendar
       value={selectedDay}
       onChange={(date) => setSelectedDay(date)}
       disabledDays={disabledDays} 
       minimumDate={utils().getToday()}
       colorPrimary="#CAA892"
       />

       <Input type="text" variant={"flushed"} placeholder="الملاحظات" color={"gray.800"} textAlign={"right"} value={note} onChange={(e)=>setNote(e.target.value)}/>

       <RadioGroup onChange={setValue} alignSelf={"end"}>
       <HStack spacing={5}>
       <Radio colorScheme='gray' value='1'>
        هاتف
       </Radio>
       <Radio colorScheme='gray' value='2'>
        زيارة القاعة
       </Radio>
       <Text  color={"gray.600"} fontWeight={"bold"}> : طريقة التواصل المفضلة</Text>
       </HStack>
       </RadioGroup>

       
       </VStack>
       </ModalBody>

        <ModalFooter alignItems={"center"}>
        <Button onClick={onClose} mr={3}>الغاء</Button>
          <Button onClick={sendRequest} backgroundColor={"#CAA892"} textColor={"white"}>
            ارسال طلب حجز
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal> 
    

  </>
 }
  <Footer/>
  </VStack>
  

);
}
export default PlaceDetails;

  