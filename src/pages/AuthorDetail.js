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
  Chip
} from '@mui/material';
import { authorAPI, bookAPI } from '../services/api';

const AuthorDetail = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAuthorData();
  }, [id]);

  const loadAuthorData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [authorResponse, booksResponse] = await Promise.all([
        authorAPI.getById(id),
        bookAPI.getAll({ author: id })
      ]);

      setAuthor(authorResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Помилка завантаження даних автора:', error);
      setError('Не вдалося завантажити дані автора.');
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
        <Button component={Link} to="/authors" variant="contained">
          Назад до списку авторів
        </Button>
      </Container>
    );
  }

  if (!author) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Автор не знайдений</Typography>
        <Button component={Link} to="/authors" variant="contained" sx={{ mt: 2 }}>
          Назад до списку авторів
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button component={Link} to="/authors" variant="outlined" sx={{ mb: 3 }}>
        ← Назад до списку авторів
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {author.name}
              </Typography>

              {author.biography && (
                <Typography variant="body1" paragraph>
                  {author.biography}
                </Typography>
              )}

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Кількість книг:</strong> {books.length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Книги автора
          </Typography>

          {books.length === 0 ? (
            <Typography>Цей автор ще не має книг в каталозі.</Typography>
          ) : (
            <Grid container spacing={2}>
              {books.map((book) => (
                <Grid item xs={12} sm={6} key={book.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {book.title}
                      </Typography>
                      {book.genre && (
                        <Chip
                          label={book.genre}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        ISBN: {book.isbn}
                      </Typography>
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

export default AuthorDetail;