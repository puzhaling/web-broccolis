import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import structures from "../data";
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    }),
}));

function Building() {

    const { id } = useParams();

    const content = structures[parseFloat(id == undefined ? "0" : id)];

    return (
        <Container maxWidth="xl">
            <Navbar active="0"/>
            <Container
                sx={{ textAlign: "left", p: 0, paddingTop: "25px", paddingBottom: "20px", m: 0,}}>
                <Typography>
                    <Link to="/">
                        Главная
                    </Link>
                    { " > "+content.title }
                </Typography>
            </Container>

            <Typography align="center" paragraph={true}
                variant="h5" color="textSecondary"
            >
                {content.title}
            </Typography>

            <Container maxWidth="md">
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <img src={content.img}
                        style={{
                            height: "auto",
                            width: "100%",
                        }}
                    ></img>
                </Box>
            </Container>

            <Container maxWidth="md" sx={{display: "flex",}}>
                <Paper sx={{
                    width: "50%",
                    bgcolor: "#f5f5f5",
                    borderRight: "1px solid #ddd",
                    p: 3,
                }}>
                    <Typography align="center" sx={{wordBreak: "break-word"}}>
                        {content.description[0]}
                    </Typography>
                </Paper>

                <Paper sx={{
                    width: "50%",
                    bgcolor: "#e0e0e0",
                    p: 3,
                }}>
                    <Typography align="center" sx={{wordBreak: "break-word"}}>
                        {content.description[1]}
                    </Typography>
                </Paper>
            </Container>
        </Container>
    );
}

export default Building;
