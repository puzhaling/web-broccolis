import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexShrink: 0,
		borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
		border: '1px solid',
		borderColor: theme.palette.divider,
		padding: '8px 12px',	
}));

interface ComponentProps {
	active: string;
}

function Navbar({ active } : ComponentProps) {
	
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const textItem = ['Clicky', 'Clicker', 'Clickoo'];

	return (
		<AppBar
			position="static"
			sx={{
				boxShadow: 0,
				bgcolor: 'transparent',
				mt: '28px',
			}}
		>
			<Container maxWidth="xl">
				<StyledToolbar>

					<Typography variant="h6" sx={{ color: '#5d8aa8' }}>
						Programming languages
					</Typography>
					
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{textItem.map((item, i) => (
							<Button variant={ String(i+1) == active ? "contained" : "text" } 
								key={item}
								color="info"
								size="medium"
							>
								{ item }
							</Button>
						))}
					</Box>

					<Box sx={{ display: { xs: 'flex', md: 'none' }}}>
						<IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
							<MenuIcon />
						</IconButton>

					  <Drawer
						  anchor="top"
						  open={ open }
							onClose={toggleDrawer(false)}
					  >
							<Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'flex-end',
									}}
								>
									<IconButton onClick={toggleDrawer(false)}>
										<CloseRoundedIcon />
									</IconButton>
								</Box>
								{textItem.map((item, i) => (
									<MenuItem 
										selected={ String(i+1) == active ? true : false } 
										key={item}
										sx={{
											'&:hover': {
												backgroundColor: '#fafcff',
											},
										}}
									>
										{ item }
									</MenuItem>
								))}
						  </Box>
					  </Drawer>

				  </Box>
				
				</StyledToolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
