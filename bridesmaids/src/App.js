import './App.css';

import React from 'react';
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
import VenderReservations from './pages/Vender/VenderReservations';
import AddProductDetails from './component/Vender/AddProduct/AddProductDetails';
import Map from './component/Map';
import CustomerRequests from './pages/Customer/CustomerRequests';
import CustomerReservations from './pages/Customer/CustomerReservations';
import AllUsers from './pages/Admin/AllUsers';
import AllRequest from './pages/Admin/AllRequest';
import RegistrationRequests from './pages/Admin/RegistrationRequests';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Routes>
          {/* Vender */}
          <Route path="/venderRequests" element={<VenderRequests />} />
          <Route path="/VenderReservations" element={<VenderReservations />} />
          <Route
            path="/addProductDetails/:categoryId"
            element={<AddProductDetails />}
          />
          <Route path="/addProduct" element={<AddProduct />} />
          {/* Admin */}
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/allRequest" element={<AllRequest />} />
          <Route
            path="/registrationRequests"
            element={<RegistrationRequests />}
          />
          {/* Customer */}
          <Route path="/customerRequests" element={<CustomerRequests />} />
          <Route
            path="/customerReservations"
            element={<CustomerReservations />}
          />
          {/* All */}
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<Role />} />
          <Route path="/places" element={<Places />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
