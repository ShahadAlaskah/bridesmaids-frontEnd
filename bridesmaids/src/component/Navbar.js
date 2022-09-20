import { useState } from 'react';
import { Flex, Button, IconButton, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';

const Navbar = ({ navbarItems, navbarItems2 }) => {
  const [display, changeDisplay] = useState('none');

  const navItemMap = navbarItems.map((item, index) => (
    <Link to={item.path} index={index}>
      <Button
        as="a"
        variant="ghost"
        aria-label="Home"
        w="100%"
        _hover={{ backgroundColor: 'white' }}
        ml="0.5rem"
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
      >
        {item.label}
      </Button>
    </Link>
  ));

  return (
    <Flex>
      <Flex
        //position="fixed"
        top="1rem"
        // right="1rem"
        align="center"
        justify={'center'}
      >
        {/* Desktop */}
        <Flex
          display={['none', 'none', 'flex', 'flex']}
          //position="fixed"
          top="1rem"
          right="1rem"
          align="center"
          justify={'center'}
          w="100%"
        >
          {navItemMap2}
          <Image
            src={logo}
            alt="Dan Abramov"
            w="4rem"
            h="4rem"
            mr="2rem"
            ml="2rem"
          />
          {navItemMap}
        </Flex>

        {/* Mobile */}
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
