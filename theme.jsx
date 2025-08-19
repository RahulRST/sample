import { createTheme, ThemeProvider } from '@mui/material/styles';

// Standard Chartered color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#0072AA', // Honolulu Blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#21AA47', // American Green
      contrastText: '#fff',
    },
    info: {
      main: '#78ADD2', // Iceberg
    },
    success: {
      main: '#A4D0A0', // Eton Blue
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Usage in your App
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components here */}
    </ThemeProvider>
  );
}

export default App;
