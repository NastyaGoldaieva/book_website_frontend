import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { bookAPI } from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookAPI.getById(id);
      setBook(response.data);
    } catch (error) {
      console.error('Помилка завантаження книги:', error);
      setError('Не вдалося завантажити дані книги.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button component={Link} to="/books" variant="contained">
          Назад до списку книг
        </Button>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Книга не знайдена</Typography>
        <Button component={Link} to="/books" variant="contained" sx={{ mt: 2 }}>
          Назад до списку книг
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button component={Link} to="/books" variant="outlined" sx={{ mb: 3 }}>
        ← Назад до списку книг
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h3" component="h1" gutterBottom>
                {book.title}
              </Typography>

              {book.author && (
                <Typography variant="h6" color="primary" gutterBottom>
                  Автор: {book.author.name}
                </Typography>
              )}

              <Box sx={{ my: 2 }}>
                {book.genre && (
                  <Chip
                    label={book.genre}
                    color="primary"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                )}
                {book.publication_year && (
                  <Chip
                    label={`Рік: ${book.publication_year}`}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {book.description && (
                <Typography variant="body1" paragraph>
                  {book.description}
                </Typography>
              )}

              {book.isbn && (
                <Typography variant="body2" color="text.secondary">
                  <strong>ISBN:</strong> {book.isbn}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Додаткова інформація
              </Typography>

              {book.publisher && (
                <Typography variant="body2" paragraph>
                  <strong>Видавництво:</strong> {book.publisher.name}
                </Typography>
              )}

              {book.page_count && (
                <Typography variant="body2" paragraph>
                  <strong>Кількість сторінок:</strong> {book.page_count}
                </Typography>
              )}

              {book.price && (
                <Typography variant="h6" color="secondary" paragraph>
                  <strong>Ціна:</strong> {book.price} грн
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Додати до кошика
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;