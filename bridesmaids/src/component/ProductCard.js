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
const ProductCard=({productList})=>{
  console.log("3")
 

return(

    <HStack py={6} spacing={"2rem"}>
      <SimpleGrid columns={{sm:1 , md:2 , lg:2}} spacingX="40px" spacingY="20px">
      { productList.map((product ,index) =>
      <Link to={"/placeDetails/"+product.id}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '35rem' }}
        height={{ sm: '476px', md: '15rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={'white'}
        boxShadow={'md'}
        key={index}
        >

        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={"./place1.jpg"}
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
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            {product.venderName} 
          </Text>
          <Text
            textAlign={'end'}
            color={'gray.700'}
            >
                {product.description}
          </Text>
        </Stack>

      </Stack>
      </Link>
        )}

        </SimpleGrid>
    </HStack>
)
}
export default ProductCard




