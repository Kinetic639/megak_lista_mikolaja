import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';


export const InformationView = () => {
   
    return <Box>       
        <Typography paragraph>
           For more information please visit this project's github: <Link href="https://bit.ly/3MoI8L4" underline="hover">
  {'megak_lista_mikołaja'}
</Link>
        </Typography>
        <Typography paragraph>
           My github page: <Link href="https://bit.ly/3FpbAxS" underline="hover">
  {'https://github.com/Kinetic639'}
</Link>
        </Typography>
        <Typography paragraph>
           My portfolio website: <Link href="https://bit.ly/3KOPTsg" underline="hover">
  {'www.michal-stepien.com'}
</Link>
        </Typography>
    </Box>
}
