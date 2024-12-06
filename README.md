# Movie Dashboard

An interactive movie dashboard built with React that allows users to search for movies, view details, and manage their favorites.

## Features

### Movie Search
- Real-time search with 500ms debouncing (using lodash.debounce)
- Loading states with skeleton UI (MovieSkeleton.jsx)
- Error handling for failed requests
- Responsive grid layout for results

### Movie Details
- Comprehensive movie information display:
  ```jsx
  <Typography variant="body1" paragraph>
    <strong>Plot:</strong> {movie.Plot}
  </Typography>
  <Typography variant="body1" paragraph>
    <strong>Director:</strong> {movie.Director}
  </Typography>
  <Typography variant="body1" paragraph>
    <strong>Actors:</strong> {movie.Actors}
  </Typography>
  ```

### Favorites Management
```jsx
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  // ... implementation
}
```

### Theme System
```jsx
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  // ... implementation
}
```

## Tech Stack

- **React 18.3.1** - UI library
- **React Router 7.0.2** - Navigation
- **Material-UI 6.1.10** - Component library and theming
- **Axios 1.7.9** - API requests
- **Lodash.debounce 4.0.8** - Search optimization
- **React Query 3.39.3** - Data fetching
- **Local Storage** - Data persistence

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── layout/         # Layout components
│   │   ├── Header.jsx  # App header with navigation
│   │   └── Layout.jsx  # Main layout wrapper
│   ├── movie/          # Movie-related components
│   │   ├── MovieList.jsx    # Grid of movie cards
│   │   ├── MovieSearch.jsx  # Search functionality
│   │   └── MovieSkeleton.jsx # Loading placeholder
│   └── ErrorBoundary.jsx    # Error handling wrapper
├── contexts/           # React contexts
│   ├── FavoritesContext.jsx # Favorites management
│   └── ThemeContext.jsx     # Theme management
├── pages/              # Page components
│   ├── Home.jsx       # Search page
│   ├── MovieDetails.jsx # Single movie view
│   └── Favorites.jsx  # Saved movies
├── services/          # External services
│   └── api.js        # OMDB API integration
└── App.jsx           # Root component
```

## API Integration and logic

```javascript

// 1. Imports
import axios from 'axios';

// constants
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

// configurations
const api = axios.create({
  baseURL: BASE_URL,
});

export const searchMovies = async (query, page = 1) => {
  // Implementation
};

export const getMovieById = async (id) => {
  // Implementation
};
```

## Component Usage

### Layout Component
```jsx
function Layout({ children }) {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <Container component="main" maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}
```

### MovieSkeleton Component
```jsx
// Imitates loading state with the actual UI
function MovieSkeleton() {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card>
            <Skeleton variant="rectangular" height={400} />
            {/* ... */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
```

## Available Scripts

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Error Handling

The application implements comprehensive error handling:

```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  // ... implementation
}
```

## Theme Configuration

The application uses Material-UI's theming system with  my pre custom configurations:

```javascript
const tokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  // ... other theme tokens
};
```

## Getting Started

1. Clone and install dependencies:
```bash
git clone [repository-url]
cd movie-dashboard
npm install
```

2. Create `.env` file:
```env
VITE_OMDB_API_KEY=your_api_key_here
```

3. Start development server:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
