import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';

import Navbar from '../../component/Navbar';
import Title from '../../component/Title';

const RegistrationRequests = () => {
  const [details, setDetails] = useState([]);
  const [renderFetchDataAll, setRenderFetchDataAll] = useState(false);
  const detailsMap = [];
  useEffect(() => {
    const fetchData = async () => {
      const requestR = await fetch('/api/v1/user/notApproved');
      const dataR = await requestR.json();

      for (let index = 0; index < dataR.length; index++) {
        const requestP = await fetch(
          '/api/v1/vendor/getVendorByUserId/' + dataR[index].id
        );
        const dataP = await requestP.json();
        detailsMap.push({
          title: dataR[index].name,
          body: [
            {
              titleTd: 'الوصف',
              bodyTd: dataP.about,
            },
            {
              titleTd: 'رقم معروف',
              bodyTd: dataP.maeroufNumber,
            },
            {
              titleTd: 'البريد الالكتروني',
              bodyTd: dataR[index].email,
            },
            {
              titleTd: 'رقم الهاتف',
              bodyTd: dataR[index].phoneNumber,
            },
          ],
          listButton: (
            <>
              <HStack>
                <Button
                  //id={id}
                  onClick={() => vendorApproved(dataR[index].id)}
                >
                  قبول
                </Button>
                <Button
                //id={id}
                // onClick={() => vendorApproved(dataR[index].id)}
                >
                  رفض
                </Button>
              </HStack>
            </>
          ),
        });
      }

      setDetails(detailsMap);
    };

    fetchData();
  }, [renderFetchDataAll]);
  const vendorApproved = async userId => {
    console.log(userId);
    const requestR = await fetch(`/api/v1/user/isApproved/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const dataR = await requestR.json();
    console.log(dataR);
    setRenderFetchDataAll(!renderFetchDataAll);
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
