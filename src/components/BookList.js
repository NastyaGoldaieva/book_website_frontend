import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { bookAPI } from '../services/api';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    genre: '',
    sort: 'title'
  });

  useEffect(() => {
    loadBooks();
  }, [filters]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      // Формуємо параметри для запиту, виключаючи пусті значення
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );

      const response = await bookAPI.getAll(params);
      setBooks(response.data);
    } catch (error) {
      console.error('Помилка завантаження книг:', error);
      setError('Не вдалося завантажити книги. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading && books.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Книги
      </Typography>

      <Box sx={{ mb: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Пошук по назві"
              name="title"
              value={filters.title}
              onChange={handleFilterChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Пошук по автору"
              name="author"
              value={filters.author}
              onChange={handleFilterChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Пошук по жанру"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Сортувати</InputLabel>
              <Select
                name="sort"
                value={filters.sort}
                label="Сортувати"
                onChange={handleFilterChange}
              >
                <MenuItem value="title">За назвою</MenuItem>
                <MenuItem value="author">За автором</MenuItem>
                <MenuItem value="publication_date">За датою публікації</MenuItem>
                <MenuItem value="price">За ціною</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      {books.length === 0 && !loading && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
          Книги не знайдено
        </Typography>
      )}

      {loading && books.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default BookList;