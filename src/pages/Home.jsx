import MovieSearch from '../components/movie/MovieSearch';
import { Typography, Container } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

function Home() {
  const { darkMode } = useTheme();

  return (
    <Container>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          mt: 2,
          color: darkMode ? 'white' : 'black'
        }}
      >
        Search Movies
      </Typography>
      <MovieSearch />
    </Container>
  );
}

export default Home;