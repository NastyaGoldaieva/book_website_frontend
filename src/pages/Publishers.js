import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { publisherAPI } from '../services/api';

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadPublishers();
  }, [search]);

  const loadPublishers = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = search ? { search } : {};
      const response = await publisherAPI.getAll(params);
      setPublishers(response.data);
    } catch (error) {
      console.error('Помилка завантаження видавництв:', error);
      setError('Не вдалося завантажити видавництва. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && publishers.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Видавництва
      </Typography>

      {/* Поле пошуку */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Пошук видавництв"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          placeholder="Введіть назву видавництва для пошуку..."
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Список видавництв */}
      <Grid container spacing={3}>
        {publishers.map((publisher) => (
          <Grid item key={publisher.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {publisher.name}
                </Typography>

                {publisher.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {publisher.description}
                  </Typography>
                )}

                {publisher.books_count !== undefined && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Кількість книг:</strong> {publisher.books_count}
                  </Typography>
                )}

                {publisher.founded_year && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Рік заснування:</strong> {publisher.founded_year}
                  </Typography>
                )}

                <Button
                  component={Link}
                  to={`/publishers/${publisher.id}`}
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  Детальніше про видавництво
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {publishers.length === 0 && !loading && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
          {search ? 'Видавництв за вашим запитом не знайдено' : 'Видавництв ще не додано'}
        </Typography>
      )}

      {loading && publishers.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Publishers;