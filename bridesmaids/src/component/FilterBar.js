import { Button, Stack } from '@chakra-ui/react';
import React from 'react';

const FilterBar = ({ buttonList }) => {
  return (
    <Stack spacing={4} direction="row-reverse" align="end">
      {buttonList.map((i, index) => (
        <Button key={index} colorScheme="black" variant="link" onClick={i.fun}>
          {i.title}
        </Button>
      ))}
    </Stack>
  );
};

export default FilterBar;
