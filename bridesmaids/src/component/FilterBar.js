import { Button, Stack } from '@chakra-ui/react';
import React from 'react';

const FilterBar = ({buttonList , selected}) => {


  function styler(title){
          if(selected === title){
            return({color: "#C08D5D"})
        }
     }

  return (
    <Stack spacing={4} direction="row-reverse" align="end">
      {buttonList.map((i, index) => (
        <Button style={styler(i.title)} value={i.title} key={index} colorScheme="black" variant="link" onClick={i.fun}>
          {i.title}
        </Button>
      ))}
    </Stack>
  );
};

export default FilterBar;
