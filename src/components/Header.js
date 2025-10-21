import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Книжковий магазин
          </Button>
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
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

          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                {user?.username}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Вийти
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Увійти
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Реєстрація
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;