import { Container, chakra, shouldForwardProp, Image } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import logo from '../Images/logo.png';
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function Spinner() {
  return (
    <Container
      h="100vh"
      display="flex"
      // alignItems="center"
      justifyContent="center"
    >
      <ChakraBox
        animate={{
          rotate: [0, 0, 270, 270, 0],
        }}
        transition={{
          duration: 3,

          repeat: Infinity,
          repeatType: 'loop',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100"
        height="100"
      >
        <Image src={logo} width="50" height="50" />
      </ChakraBox>
    </Container>
  );
}
