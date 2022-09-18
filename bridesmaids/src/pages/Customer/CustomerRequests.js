import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import FilterBar from '../../component/FilterBar';
import Navbar from '../../component/Navbar';
import Title from '../../component/Title';

const CustomerRequests = () => {
  const [details, setDetails] = useState([]);
  const [renderFetchDataAll, setRenderFetchDataAll] = useState(false);
  const detailsMap = [];

  useEffect(() => {
    const fetchData = async () => {
      const requestR = await fetch(
        '/api/v1/request/getAllByUserIdAndStatusNotLike'
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
              bodyTd: requestStatus(dataR[index].status),
            },
          ],
          listButton: listButtonValue(dataR[index].status, dataR[index].id),
        });
      }

      setDetails(detailsMap);
    };

    fetchData();
  }, [renderFetchDataAll]);

  const requestStatus = status => {
    if (status === 'new') {
      return 'جديد';
    } else if (status === 'underNegotiation') {
      return 'قيد المفاوضه';
    } else if (status === 'confirmedByVendor') {
      return '...مؤكدة من قبل مزود الخدمة في انتظار تأكيدك';
    } else if (status === 'rejected') {
      return 'مرفوضه';
    }
  };
  const listButtonValue = (status, id) => {
    //new-underNegotiation-confirmedByVendor-confirmedByCustomer-rejected
    if (status === 'confirmedByVendor') {
      return (
        <>
          <HStack>
            <Button
              id={id}
              onClick={e => changeStatus('confirmedByCustomer', e.target.id)}
            >
              قبول
            </Button>
            <Button
              id={id}
              onClick={e => changeStatus('rejected', e.target.id)}
            >
              رفض
            </Button>
          </HStack>
        </>
      );
    }
  };
  const changeStatus = async (status, requestId) => {
    console.log(status, requestId);
    const requestR = await fetch(
      `/api/v1/request/changeRequestStatus/${requestId}/${status}`,
      { method: 'PUT', headers: { 'Content-Type': 'application/json' } }
    );
    const dataR = await requestR.json();
    console.log(dataR);
    setRenderFetchDataAll(!renderFetchDataAll);
  };

  const fetchDataByStatus = async status => {
    const requestR = await fetch(
      '/api/v1/request/getAllByUserIdAndStatus/' + status
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
            bodyTd: requestStatus(dataR[index].status),
          },
        ],
        listButton: listButtonValue(dataR[index].status, dataR[index].id),
      });
    }

    setDetails(detailsMap);
  };

  //------------------------------------------------

  const filterBarDetails = [
    {
      title: 'الكل',
      fun: () => {
        setDetails([]);
        setRenderFetchDataAll(!renderFetchDataAll);
      },
    },
    {
      title: 'جديدة',
      fun: () => {
        setDetails([]);
        fetchDataByStatus('new');
      },
    },
    {
      title: 'قيد المفاوضه ',
      fun: () => {
        setDetails([]);
        fetchDataByStatus('underNegotiation');
      },
    },
    {
      title: 'مرفوضة',
      fun: () => {
        setDetails([]);
        fetchDataByStatus('rejected');
      },
    },
  ];

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

        <Title title={'طلباتي'} />
        <Flex p={5} alignSelf="end">
          <FilterBar buttonList={filterBarDetails} />
        </Flex>

        <Flex p={5} width={'70%'} alignSelf="end">
          <AccordionList details={details} />
        </Flex>
      </VStack>

      <Decoration />
    </>
  );
};

export default CustomerRequests;
