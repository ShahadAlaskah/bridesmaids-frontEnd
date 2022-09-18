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
import PlaceDetails from './pages/PlaceDetails';
import ProductCard from './component/ProductCard';
import Products from './pages/Vender/Products';
import CustomerRegister from './pages/Customer/CustomerRegister';
import VendorRegister from './pages/Vender/VendorRegister';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Routes>
          <Route path="/venderRequests" element={<VenderRequests/>} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/products" element={<Products/>}/>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendorRegiter" element={<VendorRegister />} />
          <Route path="/customerRegister" element={<CustomerRegister />} />
          <Route path="/role" element={<Role />} />
          <Route path="/places" element={<Places />} />
          <Route path='/placeDetails/:id' element={<PlaceDetails/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
