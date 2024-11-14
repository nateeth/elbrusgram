import { Box, Typography, Container } from '@mui/material';

function HomePage(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
        <img
          src="/Subject.png"
          alt="ЭльбрусГрам Logo"
          style={{ width: '150px', height: 'auto', marginBottom: '20px' }}
        />
        <Typography variant="h3" component="h1" sx={{ color:'rgb(77, 77, 77)',
          marginBottom: '10px', fontWeight: '400', fontFamily: '"Lucida Grande", Arial, sans-serif' }}>
          Elbrusgram
        </Typography>
        <Typography variant="h5" component="h2" sx={{ color: 'gray' }}>
          новая эра в общении
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
