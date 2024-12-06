import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Chip, CircularProgress, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getMovieById } from '../services/api';
import { useFavorites } from '../contexts/FavoritesContext';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!movie) return null;

  const handleFavoriteClick = () => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <IconButton 
        onClick={() => navigate(-1)}
        sx={{ 
          mb: 2,
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'background.hover'
          }
        }}
        aria-label="go back"
      >
        <ArrowBackIcon />
      </IconButton>
      
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          sx={{ 
            width: { xs: '100%', md: '300px' },
            height: { xs: '400px', md: 'auto' },
            objectFit: 'cover'
          }}
          image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={movie.Title}
        />
        
        <CardContent sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Typography variant="h4" component="h1">
              {movie.Title}
            </Typography>
            <IconButton 
              onClick={handleFavoriteClick}
              aria-label={isFavorite(movie.imdbID) ? "remove from favorites" : "add to favorites"}
            >
              {isFavorite(movie.imdbID) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {movie.Year}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            {movie.Genre.split(', ').map((genre) => (
              <Chip 
                key={genre} 
                label={genre} 
                sx={{ mr: 1, mb: 1 }} 
              />
            ))}
          </Box>
          
          <Typography variant="body1" paragraph>
            <strong>Plot:</strong> {movie.Plot}
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Director:</strong> {movie.Director}
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Actors:</strong> {movie.Actors}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Ratings:</Typography>
            {movie.Ratings.map((rating) => (
              <Typography key={rating.Source} variant="body2">
                {rating.Source}: {rating.Value}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MovieDetails;