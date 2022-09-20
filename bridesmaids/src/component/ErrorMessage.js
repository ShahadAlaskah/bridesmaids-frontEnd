import React from 'react'
import { Alert,AlertIcon,AlertTitle } from '@chakra-ui/react';

const ErrorMessage = ({ children }) => {
    return (
      <>
      <Alert status='error' width={"90%"} height={'30%'}> 
      <AlertTitle ml={"10rem"}>{children}</AlertTitle>
      <AlertIcon />
    </Alert>
      </>
    );
  };
  
  export default ErrorMessage;
  