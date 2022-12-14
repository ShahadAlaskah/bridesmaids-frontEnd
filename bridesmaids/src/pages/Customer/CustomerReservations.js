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
import { useNavigate } from 'react-router';
import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import FilterBar from '../../component/FilterBar';
import Footer from '../../component/Footer';
import Navbar from '../../component/Navbar';
import Spinner from '../../component/Spinner';
import Title from '../../component/Title';
const CustomerReservations = ({ user }) => {
  const navigate = useNavigate('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'CUSTOMER') {
      if (user && user.role === 'VENDOR') navigate('/products');
      else {
        navigate('/registrationRequests');
      }
    }
  }, [user]);

  const navbarItems = [
    {
      label: 'اعدادات',
      path: '/customer-setting',
    },
    {
      label: 'طلبات',
      path: '/customerRequests',
    },
    {
      label: 'حجوزات',
      path: '/customerReservations',
      color: '#C08D5D'
    },
  ];

  const navbarItems2 = [
    {
      label: 'تواصل معنا',
      path: '/contact',
    },
    {
      label: 'عن وصيفة',
      path: '/about',
    },
    {
      label: 'اماكن الزفاف',
      path: '/places',
    },
  ];

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
              titleTd: 'ملاحظات',
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
      setLoading(false);
    };

    fetchData();
  }, []);

  //------------------------------------------------

  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <Title title={'حجوزات'} />

        <Flex p={5} width={['99%', '99%', '70%']} alignSelf="end">
          {loading ? <Spinner /> : <AccordionList details={details} />}
        </Flex>
        
        <Footer />

      </VStack>

      <Decoration />
    </>
  );
};

export default CustomerReservations;
