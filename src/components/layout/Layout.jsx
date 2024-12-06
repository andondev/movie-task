import { Box, Container } from '@mui/material';
import Header from './Header';

function Layout({ children }) {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Header />
      <Container 
        component="main" 
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ 
          width: '100%',
          maxWidth: { md: '900px', lg: '1100px' },
          mx: 'auto'
        }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}

export default Layout;