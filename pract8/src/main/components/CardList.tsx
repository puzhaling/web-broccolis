import * as React from 'react';
import {
  Container,
  Paper,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

type CardListProps = {
    content: CardContent[];
};

export type CardContent = {
    cardImgPath: string;
    cardText: string;
};

const CardList: React.FC<CardListProps> = ({ content }: CardListProps) => {
    return (
        <Container maxWidth="md" sx={{ py: 2 }}>
            <Grid container spacing={2}>
            {content.map((value, index) => (
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 3}} sx={{ display: 'flex' }}>
                    <Card
                        variant="outlined"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        height: '100%',
                    }}>
                    <Box
                        sx={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '16px auto',
                        border: '2px solid black',
                    }}>
                        <CardMedia
                            component="img"
                            image={value.cardImgPath}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" align="justify" sx={{ fontWeight: "bold" }}>
                        {value.cardText}
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </Container>
    );
};

export default CardList;
