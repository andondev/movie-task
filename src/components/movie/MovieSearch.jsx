import { useCallback, useState } from 'react';
import { 
  Box, 
  TextField, 
  Alert,
  Typography,
  Pagination,
  Stack 
} from '@mui/material';
import debounce from 'lodash.debounce';
import { searchMovies } from '../../services/api';
import MovieList from './MovieList';
import MovieSkeleton from './MovieSkeleton';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const minimumChars = 3; // Min 3 characters

  // Debounced search function which i make sure  User types: "i" → wait...   User types: "n" → wait...  User types: "c" → wait... User types: "e" → wait 500ms → API call for "ince"
  const debouncedSearch = useCallback(
    debounce(async (searchQuery, pageNum = 1) => {
      if (searchQuery.length < minimumChars) {
        setMovies([]);
        setError(null);
        setTotalResults(0);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(searchQuery, pageNum);
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults) || 0);
      } catch (err) {
        // Only show error if it's not "Movie not found!"
        if (err.message !== "Movie not found!") {
          setError(err.message);
        }
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setPage(1);
    debouncedSearch(newQuery, 1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    debouncedSearch(query, newPage);
  };

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      {query.length > 0 && query.length < minimumChars && (
        <Typography 
          color="text.secondary" 
          sx={{ mb: 2, textAlign: 'center' }}
        >
          Please enter at least {minimumChars} characters to search
        </Typography>
      )}

      {loading && <MovieSkeleton />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && movies.length === 0 && query.length >= minimumChars && (
        <Typography 
          color="text.secondary" 
          sx={{ textAlign: 'center' }}
        >
          No movies found matching "{query}"
        </Typography>
      )}

      {!loading && !error && movies.length > 0 && (
        <Stack spacing={3}>
          <MovieList movies={movies} />
          {totalResults > 10 && (
            <Pagination
              count={Math.ceil(totalResults / 10)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                mt: 3 
              }}
            />
          )}
        </Stack>
      )}
    </Box>
  );
}

export default MovieSearch;