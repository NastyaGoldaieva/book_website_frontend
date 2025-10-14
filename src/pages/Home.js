import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(45deg, #4A6572 30%, #344955 90%)',
          color: 'white',
          borderRadius: 2,
          mb: 4
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Ласкаво просимо до Bookstore
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Відкрийте для себе світ книг з нашою унікальною колекцією
        </Typography>
        <Button
          component={Link}
          to="/books"
          variant="contained"
          size="large"
          sx={{ mt: 2, bgcolor: 'white', color: 'primary.main' }}
        >
          Переглянути книги
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Чому обирають нас?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
          <Box sx={{ maxWidth: 300 }}>
            <Typography variant="h6" gutterBottom>📚 Широкий вибір</Typography>
            <Typography>Понад 1000 книг різних жанрів</Typography>
          </Box>
          <Box sx={{ maxWidth: 300 }}>
            <Typography variant="h6" gutterBottom>🚀 Швидка доставка</Typography>
            <Typography>Доставка по всій Україні за 1-3 дні</Typography>
          </Box>
          <Box sx={{ maxWidth: 300 }}>
            <Typography variant="h6" gutterBottom>⭐ Якісний сервіс</Typography>
            <Typography>Професійне обслуговування клієнтів</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;