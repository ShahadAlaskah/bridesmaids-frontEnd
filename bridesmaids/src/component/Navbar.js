import { useState } from 'react';
import { Flex, Button, IconButton, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import {useNavigate } from 'react-router-dom';


const Navbar = ({ navbarItems, navbarItems2 }) => {
  const [display, changeDisplay] = useState('none');
  const navigate = useNavigate();


  const navItemMap = navbarItems.map((item, index) => (
    <Link to={item.path} index={index}>
      <Button
        as="a"
        variant="ghost"
        aria-label="Home"
        w="100%"
        _hover={{ backgroundColor: 'white' }}
        ml="0.5rem"
        textColor={item.color}
      >
        {item.label}
      </Button>
    </Link>
  ));

  const navItemMap2 = navbarItems2.map((item, index, onClick) => (
    <Link to={item.path} index={index}>
      <Button
        onClick={onClick}
        as="a"
        variant="ghost"
        aria-label="Home"
        w="100%"
        _hover={{ backgroundColor: 'white' }}
        ml="0.5rem"
        textColor={item.color}
      >
        {item.label}
      </Button>
    </Link>
  ));

  return (
    <Flex w={"100%"}>
      <Flex
        top="1rem"
        w={"100%"}
      >
        {/* Desktop */}
        <Flex
          display={['none', 'none', 'flex', 'flex']}
          top="1rem"
          right="1rem"
          align="center"
          justify={'center'}
          w="100%"
          mt={"1rem"}
        >
          <Flex w={"40%"} alignItems={"end"} justifyContent={"end"}>
          {navItemMap2}
          </Flex>
          <Flex w={"10%"} alignItems={"center"} justifyContent={"center"}>
          <Image
            src={logo}
            alt="Dan Abramov"
            w="4rem"
            h="4rem"
            mr="2rem"
            ml="2rem"
            // onClick={()=> navigate('/')}
          />
          </Flex>
          <Flex w={"40%"}>
          {navItemMap}
          </Flex>
        </Flex>

        {/* Mobile */}
        <Flex alignItems={"end"} justifyContent={"end"} mt={"0.2rem"} ml={"0.2rem"}>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          bgColor="#CAA892"
          onClick={() => changeDisplay('flex')}
          display={['flex', 'flex', 'none', 'none']}
          _hover={{ backgroundColor: '#CAA892' }}
        />
        </Flex>
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bgColor="#FFFAF3"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          {navItemMap}
          {navItemMap2}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Navbar;
