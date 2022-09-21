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
import { useEffect, useState } from 'react';
import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import Navbar from '../../component/Navbar';
import Title from '../../component/Title';
import { useNavigate } from 'react-router';
const VenderReservations = ({user}) => {
const navigate=useNavigate('');
  useEffect(() => {
    if (user && user.role !== 'VENDOR') {
      if(user && user.role ==='ADMIN')
      navigate('/registrationRequests');
      else{
        navigate('/')
      }
    }
  }, [user]);

  const [details, setDetails] = useState([]);
  const detailsMap = [];
  useEffect(() => {
    const fetchData = async () => {
      const requestR = await fetch(
        '/api/v1/request/getAllByVendorIdAndAndStatus/confirmedByCustomer'
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
 const navbarItems = [
    {
      label: 'منتجات',
      path: '/products',
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
      path: '/vendor-setting',
    },
  ];

  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <Title title={'حجوزات'} />

        <Flex p={5} width={'70%'} alignSelf="end">
          <AccordionList details={details} />
        </Flex>
      </VStack>

      <Decoration />
    </>
  );
};

export default VenderReservations;
