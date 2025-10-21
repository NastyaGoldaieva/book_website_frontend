import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  CardActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ShoppingCart, Favorite } from '@mui/icons-material';

const BookCard = ({ book }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Додано до кошика:', book.title);
  };

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Додано до обраного:', book.title);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      {book.image_url ? (
        <CardMedia
          component="img"
          height="200"
          image={book.image_url}
          alt={book.title}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <CardMedia
          component="div"
          height="200"
          sx={{
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'grey.400'
          }}
        >
          <Typography variant="body2">Немає зображення</Typography>
        </CardMedia>
      )}

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            height: '64px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {book.title}
        </Typography>

        <Typography
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          {book.author_name || book.author?.name || 'Невідомий автор'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={book.rating || 0}
            size="small"
            readOnly
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({book.review_count || 0})
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          {book.genre_name && (
            <Chip
              label={book.genre_name}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          )}
          {book.is_available === false && (
            <Chip
              label="Немає в наявності"
              size="small"
              color="error"
              sx={{ mb: 0.5 }}
            />
          )}
        </Box>

        {book.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              height: '40px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {book.description}
          </Typography>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              {book.price ? `${book.price} грн` : 'Ціна не вказана'}
            </Typography>
            {book.discount_price && (
              <Typography variant="body2" color="error" sx={{ textDecoration: 'line-through' }}>
                {book.discount_price} грн
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/books/${book.id}`}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mr: 1 }}
        >
          Детальніше
        </Button>

        <Box sx={{ display: 'flex' }}>
          <Button
            size="small"
            onClick={handleAddToCart}
            disabled={book.is_available === false}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <ShoppingCart fontSize="small" />
          </Button>
          <Button
            size="small"
            onClick={handleAddToFavorite}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <Favorite fontSize="small" />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BookCard;