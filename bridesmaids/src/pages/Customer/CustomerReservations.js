import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  Spacer,
  Image,
  Stack,
  Divider,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import FilterBar from '../../component/FilterBar';
import Navbar from '../../component/Navbar';
import Title from '../../component/Title';
const CustomerReservations = () => {
  const [details, setDetails] = useState([]);
  const detailsMap = [];
  useEffect(() => {
    const fetchData = async () => {
      const requestR = await fetch(
        '/api/v1/request/getAllByUserIdAndStatus/confirmedByCustomer'
      );
      const dataR = await requestR.json();

      for (let index = 0; index < dataR.length; index++) {
        const requestP = await fetch(
          '/api/v1/product/byProductId/' + dataR[index].productId
        );
        const dataP = await requestP.json();
        detailsMap.push({
          title: dataP.name,
          body: [
            {
              titleTd: 'التاريخ',
              bodyTd: dataR[index].bookDate,
            },
            {
              titleTd: 'طريقه التواصل',
              bodyTd: dataR[index].wayToCommunicate,
            },
            {
              titleTd: 'ملاحضات',
              bodyTd: dataR[index].note,
            },
            {
              titleTd: 'حاله الحجز',
              bodyTd: 'مؤكدة',
            },
          ],
          listButton: '',
        });
      }

      setDetails(detailsMap);
    };

    fetchData();
  }, []);

  //------------------------------------------------

  const navbarItems = [
    {
      label: 'طلباتي',
      path: '/customerRequests',
    },
    {
      label: 'حجوزاتي',
      path: '/customerReservations',
    },
  ];

  const navbarItems2 = [
    {
      label: 'اماكن زفاف',
      path: '/non',
    },
    {
      label: 'اعدادات',
      path: '/non',
    },
  ];
  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <Title title={'حجوزاتي'} />

        <Flex p={5} width={'70%'} alignSelf="end">
          <AccordionList details={details} />
        </Flex>
      </VStack>

      <Decoration />
    </>
  );
};

export default CustomerReservations;
