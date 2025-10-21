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
import { authorAPI } from '../services/api';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadAuthors();
  }, [search]);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = search ? { search } : {};
      const response = await authorAPI.getAll(params);
      setAuthors(response.data);
    } catch (error) {
      console.error('Помилка завантаження авторів:', error);
      setError('Не вдалося завантажити авторів. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && authors.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Автори
      </Typography>

      {/* Поле пошуку */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Пошук авторів"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          placeholder="Введіть ім'я автора для пошуку..."
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {authors.map((author) => (
          <Grid item key={author.id} xs={12} sm={6} md={4}>
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
                  {author.name}
                </Typography>

                {author.biography && (
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
                    {author.biography}
                  </Typography>
                )}

                {author.books_count !== undefined && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Кількість книг:</strong> {author.books_count}
                  </Typography>
                )}

                <Button
                  component={Link}
                  to={`/authors/${author.id}`}
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  Детальніше про автора
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {authors.length === 0 && !loading && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
          {search ? 'Авторів за вашим запитом не знайдено' : 'Авторів ще не додано'}
        </Typography>
      )}

      {loading && authors.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Authors;