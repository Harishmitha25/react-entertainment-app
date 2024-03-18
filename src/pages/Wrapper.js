import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { useSearch } from '../utils/SearchContext';

function Wrapper({children}) {

    const { setSearchText } = useSearch();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          H Entertainment
        </Typography>
        <SearchIcon></SearchIcon>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleSearchChange}
        />
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/favourites" color="inherit">Fav</Button>
        {/* <Button component={Link} to="/contact" color="inherit">Contact</Button> */}
      </Toolbar>
      <div>
        { children }
      </div>
    </AppBar>
  );
}

export default Wrapper;
