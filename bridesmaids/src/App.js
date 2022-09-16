
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
import HomePage from './pages/HomePage';
import About from './pages/About'
import Contact from './pages/Contact';
import Login from './pages/Login';
import Role from './pages/Role';
import Places from './pages/Places'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/role' element={<Role/>}/>
        <Route path='/places' element={<Places/>}/>
      </Routes>
      </BrowserRouter>        
    </ChakraProvider>
  );
}

export default App;
