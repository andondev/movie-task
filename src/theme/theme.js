import { createTheme } from '@mui/material';

// Design tokens
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
  transitions: {
    duration: {
      short: '0.2s',
      medium: '0.3s',
      long: '0.4s',
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// theme settings
const commonSettings = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: tokens.borderRadius.md,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: tokens.borderRadius.md,
          transition: `transform ${tokens.transitions.duration.short} ${tokens.transitions.easing}`,
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.borderRadius.sm,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: tokens.borderRadius.sm,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.borderRadius.sm,
        },
      },
    },
  },
};

// theme function
export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' 
        ? {
            // Light mode - original colors
            primary: {
              main: '#646cff',
              hover: '#535bf2',
            },
            text: {
              primary: '#213547',
              secondary: '#888',
            },
            background: {
              default: '#ffffff',
              paper: '#f9f9f9',
              hover: 'rgba(100, 108, 255, 0.08)',
            },
          }
        : {
            // Dark mode - original colors
            primary: {
              main: '#646cff',
              hover: '#535bf2',
            },
            text: {
              primary: 'rgba(255, 255, 255, 0.87)',
              secondary: '#888',
            },
            background: {
              default: '#242424',
              paper: '#1a1a1a',
              hover: 'rgba(100, 108, 255, 0.15)',
            },
          }),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: tokens.borderRadius.md,
            transition: `all ${tokens.transitions.duration.medium} ${tokens.transitions.easing}`,
            '&:hover': {
              transform: 'translateY(-4px)',
              backgroundColor: theme.palette.background.hover,
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: tokens.borderRadius.sm,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: theme.palette.primary.hover,
            },
          }),
        },
      },
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              color: theme.palette.primary.hover,
              textDecoration: 'underline',
            },
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&:hover': {
              backgroundColor: theme.palette.background.hover,
            },
          }),
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&:hover': {
              backgroundColor: theme.palette.background.hover,
            },
          }),
        },
      },
    },
  });
}; 