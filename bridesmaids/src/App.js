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
import ProductDetails from './pages/Vender/ProductDetails';
import VendorDetails from './pages/VendorDetails';


import VendorSetting from './pages/Vender/VendorSetting';
import CustomerSetting from './pages/Customer/CustomerSetting';

import EditProduct from './pages/Vender/EditProduct';


function App() {
  const [user,setUser]=useState(null);
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Routes>
          <Route path="/venderRequests" element={<VenderRequests />} />
          <Route path="/addProduct" element={<AddProduct />} />

          <Route path="/products" element={<Products />} />
          <Route path="/" element={<HomePage />} />

          {/* Vender */}
          <Route path="/venderRequests" element={<VenderRequests />} />
          <Route path="/VenderReservations" element={<VendorReservations />} />
          <Route path="/products" element={<Products/>}/>
          <Route
            path="/addProductDetails/:categoryId"
            element={<AddProductDetails />}
          />

          <Route
            path="/ProductDetails" element={<ProductDetails/>}/>


          <Route path="/vendor-setting" element={<VendorSetting />} />

          <Route path="/editProduct/:productId/:categoryId" element={<EditProduct />} />


          <Route path="/addProduct" element={<AddProduct />} />
          {/* Admin */}
          <Route path="/allRequest" element={<AllRequest />} />
          <Route
            path="/registrationRequests"
            element={<RegistrationRequests />}
          />
          {/* Customer */}
          <Route path="/customerRequests" element={<CustomerRequests />} />

          <Route path="/customerReservations" element={<CustomerReservations />}/>
          <Route path="/customer-setting" element={<CustomerSetting />} />

          <Route
            path="/customerReservations"
            element={<CustomerReservations />}
          />

          {/* All */}
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login/>} />
          <Route element={<AuthRoute/>} />
          <Route path="/vendorRegiter" element={<VendorRegister />} />
          <Route path="/customerRegister" element={<CustomerRegister />} />
          <Route path="/role" element={<Role />} />
          <Route path="/places" element={<Places />} />

          <Route path='/placeDetails/:id' element={<PlaceDetails/>}/>
          <Route path='/vendordetails/:id'element={<VendorDetails/>}/>

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
