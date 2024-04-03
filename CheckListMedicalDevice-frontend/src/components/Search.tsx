import { Box, Input } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  value?: string;
  onChange: (text: string) => void;
}

const Search = ({ value = '', onChange }: Props) => {
  return (
    <Box
      style={{
        marginTop: 10,
        marginBottom: 5,
      }}>
      <Input
        placeholder="ค้นหา ชื่อร้าน"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Box>
  );
};

export default Search;
