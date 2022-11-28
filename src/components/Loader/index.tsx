import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Loader() {
  return (
    <Box sx={{ 
      display: 'flex', 
      position: 'absolute',
      top: '50%',
      left: '50%',
    }}>
      <CircularProgress />
    </Box>
  );
}