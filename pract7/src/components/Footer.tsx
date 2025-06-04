import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
	return (
		<>
			<Container maxWidth={false}
				sx={{backgroundColor: "#0288d1", padding: "20px", textAlign: "left"}}>
				<Typography color="white">
					Welcome to this footer!
				</Typography>
			</Container>
		</>
	);
}

export default Footer;
