import { Image, Text, VStack } from "@chakra-ui/react";

const Title=({title})=>{
    return(
     <VStack spacing={0}>
    <Text
     fontSize="2rem"
     fontWeight="bold"
     mt={"2rem"}
     >
        {title}
    </Text>
    <Image src='./line.png' alt='...' w={'15rem'} h={"1.4rem"}/>
    </VStack>
    )
}
export default Title;