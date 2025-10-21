import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Ласкаво просимо до Книжкового магазину
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mt: 3 }}>
          {isAuthenticated ? (
            <>
              <Typography variant="h5" gutterBottom>
                Вітаємо, {user?.username}!
              </Typography>
              <Typography variant="body1" paragraph>
                Ви увійшли в систему і можете отримати доступ до всіх функцій нашого книжкового магазину.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" component={Link} to="/books" sx={{ mr: 2 }}>
                  Переглянути книги
                </Button>
                <Button variant="outlined" component={Link} to="/profile">
                  Переглянути профіль
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                Відкрийте для себе чудові книги
              </Typography>
              <Typography variant="body1" paragraph>
                Будь ласка, увійдіть або зареєструйтеся, щоб отримати доступ до всіх функцій.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" component={Link} to="/login" sx={{ mr: 2 }}>
                  Увійти
                </Button>
                <Button variant="outlined" component={Link} to="/register">
                  Зареєструватися
                </Button>
              </Box>
            </>
          )}
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Публічний контент
          </Typography>
          <Typography variant="body1">
            Кожен може переглядати нашу колекцію книг, авторів та видавництв.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button component={Link} to="/books" sx={{ mr: 1 }}>
              Книги
            </Button>
            <Button component={Link} to="/authors" sx={{ mr: 1 }}>
              Автори
            </Button>
            <Button component={Link} to="/publishers">
              Видавництва
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;