import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2024 Bookstore. Всі права захищені.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;