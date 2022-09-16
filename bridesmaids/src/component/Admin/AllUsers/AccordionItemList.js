import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Spacer,
  Flex,
  VStack,
} from '@chakra-ui/react';
const AccordionItemList = ({ title, body, listButton }) => {
  return (
    <AccordionItem color={'black'}>
      <h2>
        <AccordionButton >
          <Box flex="1" textAlign="right">
            <Text>{title}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel pb={4}>
        <Box textAlign="right">
          <VStack>
            {body}
            {listButton}
          </VStack>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionItemList;
