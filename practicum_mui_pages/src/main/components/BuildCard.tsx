import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ComponentProps {
	building: {
		img: string,
		title: string,
		description: string[],
	},
	cardNumber: number,
}

const StyledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	textAlign: 'center',
	marginBottom: '30px',
}));

function BuildCard({ building, cardNumber } : ComponentProps) {
	
	const isEvenCard = cardNumber % 2 == 0;

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: isEvenCard ? 'row-reverse' : 'row',
				height: '100%',
		}}> 
			<Box sx={{ 
				width: '50%', 
			}}>
				<CardMedia
					component="img"
					alt={ building.title }
					image={ building.img }
					sx={{ height: '100%', width: '100%' }}
				/>
			</Box>
			<Box sx={{
				width: '50%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<CardContent>
					<Typography gutterBottom variant="h5">
						{ building.title }
					</Typography>
					{ building.description.map((item, ind) => (
						<StyledTypography key={ind} variant="body2">
							{ item }
						</StyledTypography>
					))}
				</CardContent>
				<CardActions 
					sx={{ 
						justifyContent: isEvenCard ? 'flex-start' : 'flex-end'
					}}
				>
					<Button size="small"> Подробнее </Button>
				</CardActions>
			</Box>
		</Card>
	);
}

export default BuildCard;
