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
import Spinner from '../../component/Spinner';
import Footer from '../../component/Footer';
import { useNavigate } from 'react-router';
const VenderRequests = ({ user }) => {
  const navigate = useNavigate('');
  useEffect(() => {
    if (user && user.role !== 'VENDOR') {
      if (user && user.role === 'ADMIN') navigate('/registrationRequests');
      else {
        navigate('/');
      }
    }
  }, [user]);

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [renderFetchDataAll, setRenderFetchDataAll] = useState(false);
  const [selected,setSelected]=useState();
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
              titleTd: 'ملاحظات',
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
      setLoading(false);
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
              onClick={e => {
                setLoading(true);
                changeStatus('underNegotiation', e.target.id);
              }}
            >
              تفاوض
            </Button>
            <Button
              id={id}
              onClick={e => {
                setLoading(true);
                changeStatus('rejected', e.target.id);
              }}
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
              onClick={e => {
                setLoading(true);
                changeStatus('confirmedByVendor', e.target.id);
              }}
            >
              قبول
            </Button>
            <Button
              id={id}
              onClick={e => {
                setLoading(true);
                changeStatus('rejected', e.target.id);
              }}
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
            titleTd: 'ملاحظات',
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
    setLoading(false);
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
      fun: (e) => {
        setDetails([]);
        setSelected(e.target.value)
        setRenderFetchDataAll(!renderFetchDataAll);
      },
    },
    {
      title: 'جديدة',
      fun: (e) => {
        setDetails([]);
        setSelected(e.target.value)
        fetchDataByStatus('new');
      },
    },
    {
      title: 'قيد المفاوضه ',
      fun: (e) => {
        setDetails([]);
        setSelected(e.target.value)
        fetchDataByStatus('underNegotiation');
      },
    },
    {
      title: 'مؤكدة',
      fun: (e) => {
        setDetails([]);
        setSelected(e.target.value)
        fetchDataByStatus('confirmedByVendor');
      },
    },
    {
      title: 'مرفوضة',
      fun: (e) => {
        setDetails([]);
        setSelected(e.target.value)
        fetchDataByStatus('rejected');
      },
    },
  ];
  const navbarItems = [
    {
      label: 'خدمات',
      path: '/products',
    },
    {
      label: 'طلبات',
      path: '/venderRequests',
      color: '#C08D5D'
    },
  ];

  const navbarItems2 = [
    {
      label: 'حجوزات',
      path: '/VenderReservations',
    },
    {
      label: 'اعدادات',
      path: '/vendor-setting',
    },
  ];
  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <Title title={'طلبات'} />
        <Flex p={5} alignSelf="end">
          <FilterBar buttonList={filterBarDetails} selected={selected} />
        </Flex>

        <Flex p={5} width={['99%', '99%', '70%']} alignSelf="end">
          {loading ? <Spinner /> : <AccordionList details={details} />}
        </Flex>
        <Footer />
      </VStack>

      <Decoration />
    </>
  );
};

export default VenderRequests;
