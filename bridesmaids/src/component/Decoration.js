import { Box } from '@chakra-ui/react';
import React from 'react';

const Decoration = () => {
  return (
    <>
      <Box
        position={'absolute'}
        backgroundColor={'#FFFAF3'}
        width={["42px","92px",'192px']}
        height={'365px'}
        left={['15px','15px','48px']}
        top={'200px'}
        borderRadius={'94px 94px 0px 0px'}
      ></Box>
      <Box
        position={'absolute'}
        backgroundColor={'#CAA892'}
        width={["42px","92px",'192px']}
        height={'365px'}
        left={['30px','148px','148px']}
        top={'250px'}
        borderRadius={'94px 94px 0px 0px'}
        opacity={'0.5'}
      ></Box>
    </>
  );
};

export default Decoration;
