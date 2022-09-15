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
import { BrowserRouter , Routes , Route } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Routes>
        
      </Routes>
      </BrowserRouter>        
    </ChakraProvider>
  );
}

export default App;
