import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  useMediaQuery, 
  useTheme, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  ListItemIcon,
  Badge
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme as useAppTheme } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { darkMode, toggleTheme } = useAppTheme();
  const { favorites } = useFavorites();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Search', path: '/', icon: <SearchIcon /> },
    { 
      text: 'Favorites', 
      path: '/favorites', 
      icon: (
        <Badge 
          badgeContent={favorites.length} 
          color="primary"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#646cff',
              color: 'white',
            }
          }}
        >
          <FavoriteIcon />
        </Badge>
      ) 
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          key={item.text} 
          component={RouterLink} 
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'background.hover',
            }
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'background.hover'
                }
              }}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              textDecoration: 'none', 
              color: 'text.primary',
              fontWeight: 700,
              flexGrow: 0
            }}
          >
            Movie Dashboard
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'background.hover'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <IconButton 
          onClick={toggleTheme} 
          sx={{ 
            color: 'text.primary', 
            '&:hover': {
              backgroundColor: 'background.hover'
            }
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: 'background.paper'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;