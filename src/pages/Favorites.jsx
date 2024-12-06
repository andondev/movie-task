import { Container, Typography, Box } from '@mui/material';
import { useFavorites } from '../contexts/FavoritesContext';
import MovieList from '../components/movie/MovieList';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <Container>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          mt: 2,
          color: 'text.primary'
        }}
      >
        My Favorite Movies
      </Typography>
      
      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography color="text.secondary">
            You have not added any movies to your favorites yet.
          </Typography>
        </Box>
      ) : (
        <MovieList movies={favorites} />
      )}
    </Container>
  );
}

export default Favorites;