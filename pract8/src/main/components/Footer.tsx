import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
        sx={{
            backgroundColor: '#1976d2',
            padding: '10px 0',
            mt: '50px',
            width: '100%',
            textAlign: 'center',
        }}>
            <Typography variant="body1" color="white">
                { new Date().getFullYear() } My App
            </Typography>
        </Box>
    );
};

export default Footer;
