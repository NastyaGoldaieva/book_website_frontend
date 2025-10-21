import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Профіль користувача
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Вітаємо, {user?.username}!
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Chip label={`Ім'я користувача: ${user?.username}`} variant="outlined" sx={{ mr: 1, mb: 1 }} />
              <Chip label={`Email: ${user?.email}`} variant="outlined" sx={{ mr: 1, mb: 1 }} />
              {user?.first_name && (
                <Chip label={`Ім'я: ${user.first_name}`} variant="outlined" sx={{ mr: 1, mb: 1 }} />
              )}
              {user?.last_name && (
                <Chip label={`Прізвище: ${user.last_name}`} variant="outlined" sx={{ mr: 1, mb: 1 }} />
              )}
            </Box>

            <Typography variant="body1" sx={{ mt: 3 }}>
              Це захищена сторінка, доступна тільки авторизованим користувачам.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;