import { Flex, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';

import Navbar from '../../component/Navbar';
import Title from '../../component/Title';
const AllRequest = () => {
  const [details, setDetails] = useState([]);
  const detailsMap = [];

  useEffect(() => {
    const fetchData = async () => {
      const requestR = await fetch('/api/v1/request/get');
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
              bodyTd: requestStatus(dataR[index].status),
            },
          ],
          listButton: '',
        });
      }
      setDetails([]);
      setDetails(detailsMap);
    };

    fetchData();
  }, []);
  const requestStatus = status => {
    if (status === 'new') {
      return 'جديد';
    } else if (status === 'underNegotiation') {
      return 'قيد المفاوضه';
    } else if (status === 'confirmedByVendor') {
      return 'مؤكدة من قبل مزود الخدمة ';
    } else if (status === 'confirmedByCustomer') {
      return 'مؤكدة من قبل العميل';
    } else if (status === 'rejected') {
      return 'مرفوضه';
    }
  };
  const navbarItems = [
    {
      label: 'مستخدمين',
      path: '/allUsers',
    },
    {
      label: ' طلبات تزويد الخدمة',
      path: '/registrationRequests',
    },
  ];

  const navbarItems2 = [
    {
      label: 'تسجيل الخروج',
      path: '/non',
    },
    {
      label: 'الطلبات',
      path: '/allRequest',
    },
  ];
  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <Title title={'الطلبات'} />

        <Flex p={5} width={'70%'} alignSelf="end">
          <AccordionList details={details} />
        </Flex>
      </VStack>

      <Decoration />
    </>
  );
};

export default AllRequest;
