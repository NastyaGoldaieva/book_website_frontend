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
import { publisherAPI, bookAPI } from '../services/api';

const PublisherDetail = () => {
  const { id } = useParams();
  const [publisher, setPublisher] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPublisherData();
  }, [id]);

  const loadPublisherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [publisherResponse, booksResponse] = await Promise.all([
        publisherAPI.getById(id),
        bookAPI.getAll({ publisher: id })
      ]);

      setPublisher(publisherResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Помилка завантаження даних видавництва:', error);
      setError('Не вдалося завантажити дані видавництва.');
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
        <Button component={Link} to="/publishers" variant="contained">
          Назад до списку видавництв
        </Button>
      </Container>
    );
  }

  if (!publisher) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Видавництво не знайдене</Typography>
        <Button component={Link} to="/publishers" variant="contained" sx={{ mt: 2 }}>
          Назад до списку видавництв
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button component={Link} to="/publishers" variant="outlined" sx={{ mb: 3 }}>
        ← Назад до списку видавництв
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {publisher.name}
              </Typography>

              {publisher.description && (
                <Typography variant="body1" paragraph>
                  {publisher.description}
                </Typography>
              )}

              <Box sx={{ mt: 2 }}>
                {publisher.founded_year && (
                  <Typography variant="body2" paragraph>
                    <strong>Рік заснування:</strong> {publisher.founded_year}
                  </Typography>
                )}

                {publisher.country && (
                  <Typography variant="body2" paragraph>
                    <strong>Країна:</strong> {publisher.country}
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  <strong>Кількість книг:</strong> {books.length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Книги видавництва
          </Typography>

          {books.length === 0 ? (
            <Typography>Це видавництво ще не має книг в каталозі.</Typography>
          ) : (
            <Grid container spacing={2}>
              {books.map((book) => (
                <Grid item xs={12} sm={6} key={book.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {book.title}
                      </Typography>
                      {book.author && (
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Автор: {book.author.name}
                        </Typography>
                      )}
                      {book.genre && (
                        <Chip
                          label={book.genre}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      )}
                      <Button
                        component={Link}
                        to={`/books/${book.id}`}
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Детальніше
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PublisherDetail;