// import { Flex, Text, VStack } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';

// import AccordionList from '../../component/Admin/AllUsers/AccordionList';
// import Decoration from '../../component/Decoration';
// import FilterBar from '../../component/FilterBar';
// import Navbar from '../../component/Navbar';
// import Title from '../../component/Title';

// const AllUsers = () => {
//   const [details, setDetails] = useState([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const requestR = await fetch('/api/v1/user/get');
//   //     const dataR = await requestR.json();

//   //     setDetails(
//   //       dataR.map(i => {
//   //         // const requestP = await fetch(
//   //         //   '/api/v1/product/byProductId/' + i.productId
//   //         // );

//   //         // const dataP = await requestP.json();

//   //         return {
//   //           title: 'dataP.name',
//   //           body: (
//   //             <>
//   //               <Text>الوقت :</Text>
//   //               <Text>التاريخ: {i.bookDate}</Text>
//   //               <Text>طريقه التواصل: {i.wayToCommunicate}- 0596159810</Text>
//   //               <Text>ملاحضات :{i.note}</Text>
//   //             </>
//   //           ),
//   //           listButton: '',
//   //         };
//   //       })
//   //     );
//   //     //   dataRMap.then(
//   //     //     result => {
//   //     //       setDetails(result);
//   //     //     },
//   //     //     function (error) {
//   //     //       console.log(error);
//   //     //     }
//   //     //   );
//   //   };

//   //   fetchData();
//   // }, []);
//   // const fetchDataUsers = async users => {
//   //   let requestR;
//   //   let dataR;
//   //   if (users === 'vendor') {
//   //     requestR = await fetch('/api/v1/vendor/get');
//   //     dataR = await requestR.json();
//   //   } else {
//   //     requestR = await fetch('/api/v1/customer/get');
//   //     dataR = await requestR.json();
//   //   }
//   //   setDetails(
//   //     dataR.map(i => {
//   //       // const requestP = await fetch(
//   //       //   '/api/v1/product/byProductId/' + i.productId
//   //       // );

//   //       // const dataP = await requestP.json();

//   //       return {
//   //         title: 'dataP.name',
//   //         body: <></>,
//   //         listButton: '',
//   //       };
//   //     })
//   //   );
//   // };
//   // const filterBarDetails = [
//   //   {
//   //     title: 'مزودين الخدمه',
//   //     fun: () => {
//   //       setDetails([]);
//   //       fetchDataUsers('vendor');
//   //     },
//   //   },
//   //   {
//   //     title: 'عملاء',
//   //     fun: () => {
//   //       setDetails([]);
//   //       fetchDataUsers('customer');
//   //     },
//   //   },
//   // ];

//   const navbarItems = [
//     {
//       label: 'مستخدمين',
//       path: '/allUsers',
//     },
//     {
//       label: ' طلبات تزويد الخدمة',
//       path: '/registrationRequests',
//     },
//   ];

//   const navbarItems2 = [
//     {
//       label: 'الطلبات',
//       path: '/allRequest',
//     },
//     {
//       label: 'اعدادات',
//       path: '/non',
//     },
//   ];
//   return (
//     <>
//       <VStack>
//         <Navbar navbarItems={navbarItems} navbarItems2={navbarItems2} />

//         <Title title={'مستخدمين'} />
//         <Flex p={5} alignSelf="end">
//           {/* <FilterBar buttonList={filterBarDetails} /> */}
//         </Flex>
//         <Flex p={5} width={'70%'} alignSelf="end">
//           <AccordionList details={details} />
//         </Flex>
//       </VStack>

//       <Decoration />
//     </>
//   );
// };

// export default AllUsers;
