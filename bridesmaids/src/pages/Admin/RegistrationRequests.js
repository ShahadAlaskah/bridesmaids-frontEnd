import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';

import Navbar from '../../component/Navbar';
import Title from '../../component/Title';

const RegistrationRequests = () => {
  const [details, setDetails] = useState([]);
  const detailsMap = [];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const requestR = await fetch('/api/v1/user/notApproved');
  //     const dataR = await requestR.json();
  //     console.log('hhhhhhh' + dataR);
  //     for (let index = 0; index < dataR.length; index++) {
  //       // const requestP = await fetch(
  //       //   '/api/v1/product/byProductId/' + dataR[index].productId
  //       // );
  //       // const dataP = await requestP.json();
  //       detailsMap.push({
  //         title: 'dataP.name',
  //         body: [
  //           {
  //             titleTd: 'التاريخ',
  //             bodyTd: 'dataR[index].bookDate',
  //           },
  //           {
  //             titleTd: 'طريقه التواصل',
  //             bodyTd: 'dataR[index].wayToCommunicate',
  //           },
  //           {
  //             titleTd: 'ملاحضات',
  //             bodyTd: 'dataR[index].note',
  //           },
  //           {
  //             titleTd: 'حاله الحجز',
  //             bodyTd: 'مؤكدة',
  //           },
  //         ],
  //         listButton: '',
  //       });
  //     }

  //     setDetails(detailsMap);
  //   };

  //   fetchData();
  // }, []);

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
      label: 'الطلبات',
      path: '/allRequest',
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

        <Title title={'طلبات تزويد الخدمة'} />

        <Flex p={5} width={'70%'} alignSelf="end">
          <AccordionList details={details} />
        </Flex>
      </VStack>

      <Decoration />
    </>
  );
};

export default RegistrationRequests;
