import {Box , HStack, Text, VStack , Heading , Button , Spinner , Input,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure, Flex } from "@chakra-ui/react";
import Navbar from "../component/Navbar";
import Title from "../component/Title";
import ImagesGallery from "../component/ImagesGallery";
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from "react-modern-calendar-datepicker";



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
    const id = params.id;
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
    const [selectedDay, setSelectedDay] = useState(null);
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



    // Get Product Data
    useEffect(()=>{
        const fetchProductDetails = async () => {
            const request = await fetch("/api/v1/product/byProductId/"+id);
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
            const request = await fetch("/api/v1/place/getPlaceByProductId/"+id);
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
            const request= await fetch("/api/v1/picture/byProduct/"+id);
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
  

    const sendRequest=()=>{
      console.log(selectedDay)
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
          <Button backgroundColor={"#CAA892"} onClick={onOpen} textColor={"white"} variant='solid' >
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
          <ModalBody pb={6}>
          <VStack>

<Flex>
<Calendar
      value={selectedDay}
      onChange={(date) => setSelectedDay(date)}
      disabledDays={disabledDays} 
      colorPrimary="#CAA892"
    />
    </Flex>

            <Input type="text" variant={"flushed"} placeholder="الملاحظات" textAlign={"right"} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={sendRequest} colorScheme='blue' mr={3}>
              ارسال طلب حجز
            </Button>
            <Button onClick={onClose}>الغاء</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
}
    </VStack>
    

);
}
export default PlaceDetails;


