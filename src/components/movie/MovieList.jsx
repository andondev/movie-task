import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MovieList({ movies }) {
  const navigate = useNavigate();

  if (!movies?.length) {
    return null;
  }

  return (
    <Grid 
      container 
      spacing={3} 
      sx={{ mt: 2 }}
      component="div"
    >
      {movies.map((movie) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          key={movie.imdbID}
          component="div"
        >
          <Card>
            <CardActionArea onClick={() => navigate(`/movie/${movie.imdbID}`)}>
              <CardMedia
                component="img"
                height="400"
                image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                alt={movie.Title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.Year}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;