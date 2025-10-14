import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Профіль
      </Typography>
      <Typography>
        Тут буде інформація про користувача та історія замовлень. Сторінка в розробці.
      </Typography>
    </Container>
  );
};

export default Profile;