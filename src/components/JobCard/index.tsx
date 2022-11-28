import { Typography, Card, CardContent, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { cardStyle } from './styles';

export function JobCard({...props}) {
  const { companyName, jobTitle, description, index } = props;
  const [open, setOpen] = useState(false)
  
  return (
    <Card sx={ cardStyle }>
      <CardContent sx={{ heigth: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Typography variant='h1' sx={{ fontSize: '24px', textOverflow: 'ellipsis' }}>
          {jobTitle} 
        </Typography >
        
        <Typography variant='h2' sx={{ fontSize: '16px', color: '#777' }}>
          {companyName} 
        </Typography>

        <Typography>
          
        </Typography>
        
        <div 
          style={{ 
            whiteSpace: 'pre-wrap', 
            overflow: 'hidden', 
            fontSize: '16px',  
            marginTop: '24px', 
            fontFamily: ' "Roboto","Helvetica","Arial",sans-serif ', 
            height: !open ? '200px' : '100%',
            transition: 'height 1s ease' 
          }} 
          dangerouslySetInnerHTML={{ __html: description }}
        >
            
          </div>

        <Button onClick={() => setOpen(!open)}>
          {!open ? "Show more" : "Show less"}
          <ExpandMore sx={{ transform: !open ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.3s ease-in' }} fontSize='medium' />
        </Button>
      </CardContent>
    </Card>
  )
}