import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Spacer,
  HStack,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import AccordionItemList from './AccordionItemList';

const AccordionList = ({ details }) => {
  return (
    <>
      <Accordion w={'100%'} defaultIndex={[0]} allowMultiple >
        {details.map((i, index) => (
          <AccordionItemList
            key={index}
            title={i.title}
            body={i.body}
            listButton={i.listButton}
          />
        ))}
      </Accordion>
    </>
  );
};

export default AccordionList;
