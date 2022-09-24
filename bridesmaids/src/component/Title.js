import { Image, Text, VStack } from "@chakra-ui/react";
import line from "../Images/line.png"

const Title=({title})=>{
    return(
     <VStack spacing={0}>
    <Text
     fontSize="1.8rem"
     fontWeight="bold"
     mt={"0.2rem"}
     >
        {title}
    </Text>
    <Image src={line} alt='...' w={'15rem'} h={"1.4rem"}/>
    </VStack>
    )
}
export default Title;