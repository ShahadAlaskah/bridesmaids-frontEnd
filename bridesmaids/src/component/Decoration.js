import { Box, Hide } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};
const Decoration = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [noDecoration, setNoDecoration] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  useEffect(() => {
    if (windowSize.innerWidth <= 400) {
      setNoDecoration(true);
    }
  }, [window]);

  return (
    <>

      <Hide breakpoint="(max-width: 400px)">
        <Box
          position={'absolute'}
          backgroundColor={'#FFFAF3'}
          width={'192px'}
          height={'480px'}
          left={'48px'}
          top={'200px'}
          borderRadius={'94px 94px 0px 0px'}
        ></Box>
        <Box
          position={'absolute'}
          backgroundColor={'#CAA892'}
          width={'192px'}
          height={'440px'}
          left={'148px'}
          top={'250px'}
          borderRadius={'94px 94px 0px 0px'}
          opacity={'0.5'}
        ></Box>
      </Hide>

    </>
  );
};

export default Decoration;
