import { Grid, Card, Skeleton } from '@mui/material';

function MovieSkeleton() {
    //Imittate the actual UI of the movie card during loading state
  return (
    <Grid 
      container 
      spacing={3} 
      sx={{ mt: 2 }}
      component="div"
    >
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          key={item}
          component="div"
        >
          <Card>
            <Skeleton 
              variant="rectangular" 
              height={400}
              animation="wave"
            />
            <Card sx={{ p: 2 }}>
              <Skeleton 
                variant="text" 
                width="80%" 
                height={32}
                animation="wave"
              />
              <Skeleton 
                variant="text" 
                width="30%" 
                height={24}
                animation="wave"
              />
            </Card>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieSkeleton;