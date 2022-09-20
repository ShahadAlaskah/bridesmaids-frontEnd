import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Button
} from '@chakra-ui/react';
import Decoration from '../../component/Decoration';
import Navbar from '../../component/Navbar';
import Title from '../../component/Title';
//import Footer from '../../component/Footer';
const VendorSetting=()=> {
    const navbarItems=[
        {
            label:"طلبات",
            path:"/products"
        },{
            label:"منتجات",
            path:"/venderRequests"
        }
    ]
    // change this
    const navbarItems2=[
        {
            label:"اعدادات",
            path:"/contact" , 
            color:"#CAA892"
        },{
            label:"حجوزات",
            path:"/about"
        }
    ]
      
    return (
        <>
        <VStack spacing={50}>
        
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2}/>
     
        
         <Title title={"اعدادات"}/>
        
         <HStack spacing={150} px={10} alignSelf="end" width={'70%'} >
          <HStack alignSelf={"end"} spacing={4}>
         <VStack align='end' spacing={"3rem"} >
     
     <Box p={5} width={'50%'} alignSelf="end">
     
       <Input variant='flushed' placeholder='رقم الهاتف'  textAlign={'right'}  mb={"1rem"}/>
       
     
       <Input variant='flushed' placeholder='العمر'textAlign={'right'}  mb={"1rem"} />
     
     
       <Input variant='flushed' placeholder='الجنس' textAlign={'right'}  mb={"1rem"} />
       
       </Box>
      
     </VStack>
             <VStack align='end' spacing={"3rem"} >
     
     
     
             <Box p={5} width={'50%'} alignSelf="end" >
       
     
       <Input variant='flushed' placeholder='اسم المستخدم' textAlign={'right'} mb={"1rem"}/>
       
     
       <Input variant='flushed' placeholder='كلمة المرور' textAlign={'right'}  mb={"1rem"} />
       
       <Input variant='flushed' placeholder='البريد الالكتروني ' textAlign={'right'}  mb={"1rem"} />
     
     </Box>
             </VStack>
             </HStack>
         </HStack>
         <HStack spacing={100} >
         <Button   >تسجيل خروج</Button>
             <Button  >تعديل</Button>
            
             </HStack>
           
        </VStack>
        
        <Box  mt={"50px"}>
        {/* <Footer /> */}
        </Box>
        <Decoration />
        </>
       );
}

export default VendorSetting;