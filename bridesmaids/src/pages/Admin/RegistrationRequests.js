import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';

import Navbar from '../../component/Navbar';
import Title from '../../component/Title';

const RegistrationRequests = ({user}) => {

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      if(user && user.role ==='VENDOR')
      navigate('/products');
      else{
        navigate('/')
      }
    }
  }, [user]);

  const navbarItems = [
    {
      label: ' طلبات تزويد الخدمة',
      path: '/registrationRequests',
    }
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


  const [details, setDetails] = useState([]);
  const [renderFetchDataAll, setRenderFetchDataAll] = useState(false);
  const detailsMap = [];
  const navigate = useNavigate();
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
  const logout = async () => {
    const request = await fetch('/api/v1/auth/logout');
    if (request.status === 204) {
      localStorage.removeItem('loggedIn');
      navigate('/login');
    }
  };
  

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
