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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Routes>
          <Route path="/venderRequests" element={<VenderRequests />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
