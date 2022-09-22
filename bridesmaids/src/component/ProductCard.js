import {
    Flex,
    Heading,
    HStack,
    Image,
    Link,
    Stack,
    Text,
    SimpleGrid,
  } from '@chakra-ui/react';
  import {useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';

const ProductCard=({productList})=>{ 
  const [path,setPath]=useState('')

  useEffect(()=>{
  const fetchUser = async () => {
  const request = await fetch('/api/v1/user/me');
  const data= await request.json();
  setPath(data.role)
    }
    fetchUser();
  },[])


  const navigate = useNavigate();


return(

    <HStack py={6} spacing={"2rem"}>
      <SimpleGrid columns={{sm:1 , md:2 , lg:2}} spacingX="40px" spacingY="20px">
      { productList.map((product ,index) =>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '35rem' }}
        height={{ sm: '476px', md: '15rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={'white'}
        boxShadow={'md'}
        key={index}
        onClick={()=>{path==='VENDOR'? navigate('/editProduct/'+product.id+'/'+product.categoryId) : navigate('/placeDetails/'+product.id)}}
        >

        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={product.picture}
          />
        </Flex>

        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="start"
          alignItems="end"
          p={1}
          pt={2}
          px={1}>
          <Heading fontSize={'1rem'} fontFamily={'body'}>
            {product.name}
          </Heading>
          <Text fontWeight={300} color={'gray.500'} size="sm" mb={4}>
            {product.vendorName} 
          </Text>
          <Text
            textAlign={'end'}
            color={'gray.700'}
            >
                {product.description}
          </Text>
        </Stack>

      </Stack>
        )}

        </SimpleGrid>
    </HStack>
)
}
export default ProductCard




