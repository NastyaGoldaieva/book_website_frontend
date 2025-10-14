import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Про нас
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Контактна інформація:
        </Typography>
        <Typography>
          📧 Email: contact@bookstore.com<br/>
          📞 Телефон: +380 44 123 4567<br/>
          📍 Адреса: м. Київ, вул. Хрещатик, 1
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Інформація про доставку:
        </Typography>
        <Typography>
          Доставляємо по всій Україні протягом 1-3 робочих днів.
          Безкоштовна доставка при замовленні від 500 грн.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Повернення:
        </Typography>
        <Typography>
          Ви можете повернути книгу протягом 14 днів з моменту покупки,
          якщо вона не була в користуванні та зберегла товарний вигляд.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;