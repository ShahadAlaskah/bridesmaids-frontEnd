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
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  HStack,
} from '@chakra-ui/react';
const AccordionItemList = ({ title, body, listButton }) => {
  // body = [
  //   {
  //     titleTd: 'الجمال',
  //     bodyTd: 'العنوات',
  //   },
  // ];
  return (
    <AccordionItem color={'black'}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="right">
            <Text textAlign="right">{title}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel pb={4}>
        <Box alignSelf="end">
          <VStack>
            <TableContainer alignSelf="end" w={['99%', '99%', '80%']}>
              <Table variant="simple">
                <Tbody>
                  {body.map(i => (
                    <Tr>
                      <Td textAlign="right">{i.bodyTd}</Td>
                      <Td textAlign="right">{i.titleTd}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            {listButton}
          </VStack>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionItemList;
