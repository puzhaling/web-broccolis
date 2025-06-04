import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import languages from "../data";
import BuildCard from "./BuildCard";

const cardData = [languages[0], languages[1], languages[2]];

function Content() {
	return (
		<Container maxWidth="xl">
			<Grid container spacing={{ xs: 3, md: 6 }}>
				{cardData.map((item, index) => (
					<Grid key={index} size={{ xs: 12, md: 6 }} >
						<BuildCard language={ item } cardNumber={ index + 1 } />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default Content;
