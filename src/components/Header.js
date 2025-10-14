import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            📚 Bookstore
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/books">
            Книги
          </Button>
          <Button color="inherit" component={Link} to="/authors">
            Автори
          </Button>
          <Button color="inherit" component={Link} to="/publishers">
            Видавництва
          </Button>
          <Button color="inherit" component={Link} to="/about">
            Про нас
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Увійти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;