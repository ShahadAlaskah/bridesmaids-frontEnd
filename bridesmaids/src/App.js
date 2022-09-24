import './App.css';

import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import VenderRequests from './pages/Vender/VenderRequests';
import AddProduct from './pages/Vender/AddProduct';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Role from './pages/Role';
import Places from './pages/Places';
import PlaceDetails from './pages/PlaceDetails';
import ProductCard from './component/ProductCard';
import Products from './pages/Vender/Products';
import CustomerRegister from './pages/Customer/CustomerRegister';
import VendorRegister from './pages/Vender/VendorRegister';
import VendorReservations from './pages/Vender/VenderReservations';
import AddProductDetails from './component/Vender/AddProduct/AddProductDetails';
import Map from './component/Map';
import CustomerRequests from './pages/Customer/CustomerRequests';
import CustomerReservations from './pages/Customer/CustomerReservations';
import AllUsers from './pages/Admin/AllUsers';
import AllRequest from './pages/Admin/AllRequest';
import RegistrationRequests from './pages/Admin/RegistrationRequests';
import AuthRoute from './component/AuthRoute'
import VendorDetails from './pages/VendorDetails';


import VendorSetting from './pages/Vender/VendorSetting';
import CustomerSetting from './pages/Customer/CustomerSetting';

import EditProduct from './pages/Vender/EditProduct';

import "@fontsource/tajawal";
import Theme from './component/Theme';



function App() {
  const [user,setUser]=useState(null);
  return (
    <ChakraProvider theme={Theme}>
      <BrowserRouter>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Routes>

        <Route element={<AuthRoute setUser={setUser} />}>

          {/* Vender */}
          <Route path="/venderRequests" element={<VenderRequests user={user}/>} />
          <Route path="/VenderReservations" element={<VendorReservations user={user} />} />
          <Route path="/products" element={<Products user={user}/>}/>
          <Route path="/addProductDetails/:categoryId" element={<AddProductDetails user={user} />} />
          <Route path="/vendor-setting" element={<VendorSetting user={user} />} />
          <Route path="/editProduct/:productId/:categoryId" element={<EditProduct user={user} />} />
          <Route path="/addProduct" element={<AddProduct user={user} />} />


          {/* Admin */}
          <Route path="/allRequest" element={<AllRequest user={user} />} />
          <Route path="/registrationRequests" element={<RegistrationRequests user={user} />} />
         
         
          {/* Customer */}
          <Route path="/customerRequests" element={<CustomerRequests user={user}/>} />
          <Route path="/customerReservations" element={<CustomerReservations user={user}/>}/>
          <Route path="/customer-setting" element={<CustomerSetting user={user} />} />

          </Route>
        

          {/* All */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/vendorRegiter" element={<VendorRegister />} />
          <Route path="/customerRegister" element={<CustomerRegister />} />
          <Route path="/role" element={<Role />} />
          <Route path="/places" element={<Places />} />
          <Route path='/place-details/:id' element={<PlaceDetails/>}/>
          <Route path='/vendordetails/:id'element={<VendorDetails/>}/>

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
