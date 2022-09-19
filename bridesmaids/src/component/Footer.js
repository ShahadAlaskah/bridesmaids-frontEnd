import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { ReactNode } from 'react';

const SocialButton = (children, label, href) => {
  return (
    <chakra.button
      // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      // rounded={'full'}
      // w={8}
      // h={8}
      // cursor={'pointer'}
      // as={'a'}
      // href={href}
      // display={'inline-flex'}
      // alignItems={'center'}
      // justifyContent={'center'}
      // transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box>
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('white.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>Â© 2022 BRIDESMAIDS. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>

            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>

            <SocialButton label={'phone'} href={'#'}>
              <AiFillPhone />
            </SocialButton>

            <SocialButton label={'phone'} href={'#'}>
              <AiOutlineMail />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
