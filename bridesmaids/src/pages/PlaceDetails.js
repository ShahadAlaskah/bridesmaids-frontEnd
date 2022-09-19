import  {HStack, Text, VStack , Heading , Button , Spinner , Input,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure, Radio , RadioGroup } from "@chakra-ui/react";
import Navbar from "../component/Navbar";
import Title from "../component/Title";
import ImagesGallery from "../component/ImagesGallery";
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar, utils } from "react-modern-calendar-datepicker";
import {useNavigate } from 'react-router-dom';




const PlaceDetails=()=>{
    const navbarItems=[
        {
            label:"تسجيل الدخول",
            path:"/login"
        },{
            label:"تسجيل",
            path:"/role"
        }
    ]
    const navbarItems2=[
        {
            label:"تواصل معنا",
            path:"/contact"
        },{
            label:"عن وصيفة",
            path:"/about"
        },{
            label:"اماكن الزفاف",
            path:"/places"
        }
    ]
    const params = useParams();
    const productId = params.id;
    const[name,setName]=useState('');
    const[vendorName,setVendorName]=useState('');
    const[vendorId,setVendorId]=useState()
    const[description,setDescription]=useState('');
    const[price,setPrice]=useState();
    const[capacity,setCapacity]=useState();
    const[pictures,setPictures]=useState([]);
    const[country,setCountry]=useState('');
    const[city,setCity]=useState('')
    const[lan,setLan]=useState('')
    const[lng,setLng]=useState('')
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const disabledDays = [
      {
        year: 2022,
        month: 9,
        day: 20,
      },
      {
        year: 2022,
        month: 9,
        day: 21,
      },
      {
        year: 2022,
        month: 9,
        day: 22,
      }
    ];

    // Radio button
    const[selectedDay, setSelectedDay] = useState(null);
    const[note,setNote] = useState("")
    const[value, setValue] = useState()





    // Get Product Data
    useEffect(()=>{
        const fetchProductDetails = async () => {
            const request = await fetch("/api/v1/product/byProductId/"+productId);
            const data = await request.json();
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setVendorId(data.vendorId)
          };
          fetchProductDetails();
    },[]);


    // Get Place Data
     useEffect(()=>{
        const fetchPlaceDetails = async () => {
            const request = await fetch("/api/v1/place/getPlaceByProductId/"+productId);
            const data = await request.json();
            setCapacity(data.capacity)
            setCountry(data.country)
            setCity(data.city)
            setLan(data.lan)
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
        setLoading(false);
    },[]);


    // // Get Vendor Name
    // useEffect(()=>{
    //     const fetchVendorName= async()=>{
    //         const request= await fetch("/api/v1/user/byVendor/"+vendorId);
    //         const data = await request.json();
    //         console.log(data)
    //         setVendorName(data)
    //     };
    //     fetchVendorName();
    // },[]);
  

    const sendRequest= async ()=>{
      console.log(selectedDay)
      let way=''
      if(value===("هاتف")){
        way="هاتف"+"0567445859"
      }
      const bodyValue = {
        vendorId,
        productId,
        dateReceived:"2022/08/8",
        bookDate:selectedDay.year+"/"+selectedDay.month+"/"+selectedDay.day,
        wayToCommunicate:"way",
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
        //   <Alert
        //   status='success'
        //   variant='subtle'
        //   flexDirection='column'
        //   alignItems='center'
        //   justifyContent='center'
        //   textAlign='center'
        //   height='200px'
        // >
        //   <AlertIcon boxSize='40px' mr={0} />
        //   <AlertTitle mt={4} mb={1} fontSize='lg'>
        //     تم التسجيل بنجاح
        //   </AlertTitle>
        //   <AlertDescription maxWidth='sm'>
        //    سنقوم بتفعيل حسابك بعد التحقق منه
        //   </AlertDescription>
        // </Alert>
        console.log("ok")
        } else {
          console.log("erroe")
        }
      } catch (e) {
        alert('Server error');
        console.log(e);
      }
    };


    const check=()=>{
      if (!localStorage.getItem('loggedIn')) {
        navigate('/login');
      }
    }
  

return(
    
    <VStack> 
{ loading ? <Spinner/> :
<>
    <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>

    <Title title={name}/>

    <HStack w={"100%"} spacing={0} px={"5rem"}>

        <VStack w={"60%"} padding={"5rem"}>
        <ImagesGallery pictures={pictures} /> 
        {/* <ImagesGallery/> */}
        </VStack>


        <VStack w={"40%"} flex={1}
          flexDirection="column"
          justifyContent="start"
          alignItems="end"
          p={1}
          pt={2}
          px={1}>
          <Heading fontSize={'1rem'} fontFamily={'body'}>
            {name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
           {vendorName} 
          </Text>
          <Text fontWeight={400} color={'gray.500'} size="sm" mb={4}>
           {country} - {city} 
          </Text>
          <Text
            textAlign={'end'}
            color={'gray.700'}
            >
            {description}
          </Text>

          <HStack spacing={"10rem"}>

          <VStack>
          <Button backgroundColor={"#CAA892"} onClick={()=>{localStorage.getItem('loggedIn')?onOpen():onClose()}} textColor={"white"} variant='solid' >
           طلب حجز
          </Button>
          </VStack>

          <VStack spacing={2} mt={2}>
          <Text fontWeight={600} color={'gray.500'} size="sm">
          تبدأ الاسعار من : {price}ريال  
          </Text>
          <Text fontWeight={600} color={'gray.500'} size="sm">
            السعة : {capacity} شخص
          </Text>
          </VStack>

          </HStack>

        </VStack>
      
    </HStack>
    
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader textAlign={"center"}>طلب حجز</ModalHeader>
       <ModalCloseButton />

         <ModalBody pb={10}> 
         <VStack spacing={"2rem"}>

         <Calendar
         value={selectedDay}
         onChange={(date) => setSelectedDay(date)}
         disabledDays={disabledDays} 
         //minimumDate={new Date()}
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
    </VStack>
    

);
}
export default PlaceDetails;


