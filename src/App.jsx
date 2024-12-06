import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Layout>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;