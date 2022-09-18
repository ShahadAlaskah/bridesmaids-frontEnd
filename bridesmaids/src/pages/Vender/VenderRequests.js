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
import React, { useState } from 'react';
import { useEffect } from 'react';
import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import FilterBar from '../../component/FilterBar';
import Navbar from '../../component/Navbar';
import Title from '../../component/Title';

const VenderRequests = () => {
  const [details, setDetails] = useState([]);
  const [renderFetchDataAll, setRenderFetchDataAll] = useState(false);
  const detailsMap = [];

  useEffect(() => {
    const fetchData = async () => {
      const requestR = await fetch(
        '/api/v1/request/getAllByVendorIdAndStatusIsNotLike'
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
      return '....في انتظار قبول العميل';
    } else if (status === 'rejected') {
      return 'مرفوضه';
    }
  };
  const listButtonValue = (status, id) => {
    //new-underNegotiation-confirmedByVendor-confirmedByCustomer-rejected
    if (status === 'new') {
      return (
        <>
          <HStack>
            <Button
              id={id}
              onClick={e => changeStatus('underNegotiation', e.target.id)}
            >
              تفاوض
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
    } else if (status === 'underNegotiation') {
      return (
        <>
          <HStack>
            <Button
              id={id}
              onClick={e => changeStatus('confirmedByVendor', e.target.id)}
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

  const fetchDataByStatus = async status => {
    const requestR = await fetch(
      '/api/v1/request/getAllByVendorIdAndAndStatus/' + status
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
      title: 'مؤكدة',
      fun: () => {
        setDetails([]);
        fetchDataByStatus('confirmedByVendor');
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
      label: 'منتجات',
      path: '/addProduct',
    },
    {
      label: 'طلبات',
      path: '/venderRequests',
    },
  ];

  const navbarItems2 = [
    {
      label: 'حجوزات',
      path: '/VenderReservations',
    },
    {
      label: 'اعدادات',
      path: '/about',
    },
  ];
  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <Title title={'طلبات'} />
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

export default VenderRequests;
