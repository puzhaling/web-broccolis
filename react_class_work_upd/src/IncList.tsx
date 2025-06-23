import { useState, FC } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

type IncListProps = {
	data: string[],
	n: number,
};

const IncList: FC<IncListProps> = (props: IncListProps) => {
	const [buttonClicks, setButtonClicks] = useState<number>(0);

	const handleClick = (): void => {
		setButtonClicks(prev => prev + 1);
	};

	const visibleCount = buttonClicks === 0
		? props.n : (buttonClicks + 1) * props.n;

	const showButton = (buttonClicks + 1) * props.n < props.data.length;

	return (
	<Box>
		<List>
		{props.data.map((item, i) => (
			<ListItem
				key={i}
				sx={{ display: i < visibleCount ? "" : "none" }}
			>
				<ListItemText primary={item} />
			</ListItem>
		))}
		</List>

		{showButton && (
		<Button
			variant="contained"
			onClick={handleClick}
		>
			Show more
		</Button>
		)}
	</Box>
	);
};

export default IncList;
