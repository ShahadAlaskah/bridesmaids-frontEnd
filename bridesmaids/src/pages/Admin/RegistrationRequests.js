import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import AccordionList from '../../component/Admin/AllUsers/AccordionList';
import Decoration from '../../component/Decoration';
import emailjs from 'emailjs-com';
import Navbar from '../../component/Navbar';
import Spinner from '../../component/Spinner';
import Title from '../../component/Title';
import Footer from '../../component/Footer';

const RegistrationRequests = ({ user }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      if (user && user.role === 'VENDOR') navigate('/products');
      else {
        navigate('/');
      }
    }
  }, [user]);

  const logout = async () => {
    const request = await fetch('/api/v1/auth/logout');
    if (request.status === 204) {
      localStorage.removeItem('loggedIn');
      navigate('/login');
    }
  };

  const navbarItems = [
    {
      label: ' طلبات تزويد الخدمة',
      path: '/registrationRequests',
      color: '#C08D5D'
    },
  ];

  const navbarItems2 = [
    {
      label: 'تسجيل الخروج',
      path: '/allRequest',
      //onClick: logout(),
      color: 'black'
    },
    {
      label: 'الطلبات',
      path: '/allRequest',
      color: 'black'
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
                  onClick={() => {
                    sendEmail(dataR[index].name, dataR[index].email);
                    vendorApproved(dataR[index].id);
                  }}
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
      setLoading(false);
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

  const sendEmail = (vendorName, email) => {
    let templateParams = {
      vendor_name: vendorName,
      email: email,
    };

    emailjs
      .send(
        'service_05xv9lh',
        'template_pu1ja3e',
        templateParams,
        'OlZqYySu9TtUdJuUg'
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  };

  return (
    <>
      <VStack>
        <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

        <Title title={'طلبات تزويد الخدمة'} />

        <Flex p={5} width={['99%', '99%', '70%']} alignSelf="end">
          {loading ? <Spinner /> : <AccordionList details={details} />}
        </Flex>
        <Footer />
      </VStack>

      <Decoration />
    </>
  );
};

export default RegistrationRequests;
