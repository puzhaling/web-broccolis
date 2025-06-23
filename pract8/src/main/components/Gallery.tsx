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
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  boxSizing: 'border-box'
}));

export type programmingLanguage = {
	id: string;
	name: string;
	description: string;
	exampleCode: string;
	logo: string;
};

const programmingLanguages: programmingLanguage[] = [
	{
		id: 'assembler',
		name: 'Assembler',
		description: 'Low level language, that is close to machine codes',
		exampleCode: 'MOV AX, 0x1234\nADD AX, BX',
		logo: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43b43c71-0863-4dd9-9360-1b702a886075_1088x880.png'
	},
	{
		id: 'lisp',
		name: 'Lisp',
		description: 'Functional programming language with an unique syntax',
		exampleCode: '(defun factorial (n)\n  (if (<= n 1)\n    1\n    (* n (factorial (- n 1)))))',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lisp_logo.svg/2048px-Lisp_logo.svg.png'
	},
	{
		id: 'haskell',
		name: 'Haskell',
		description: 'Clearly functional programming language with strong static type system',
		exampleCode: 'fibonacci :: Int -> Int\nfibonacci 0 = 0\nfibonacci 1 = 1\nfibonacci n = fibonacci (n-1) + fibonacci (n-2)',
		logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRami_6HZTnAXIJjtjC7tsLnPb0QomAEIzwCQ&s'
	},
	{
		id: 'lua',
		name: 'Lua',
		description: 'Lightweight script programming language, often used in gamedev',
		exampleCode: 'function factorial(n)\n if n == 0 then\n    return 1\n  else\n    return n * factorial(n-1)\n  end\nend',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lua-Logo.svg/947px-Lua-Logo.svg.png'
	}
];

function Gallery() {
	return (
		<Container maxWidth="lg" sx={{ mt: "50px" }}>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12 }}>
				<Item>
					<Link to={`/language/${programmingLanguages[0].id}`} style={{ textDecoration: 'none' }}>
						<img
							src={programmingLanguages[0].logo}
							style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
							alt={`${programmingLanguages[0].name} logo`}
						/>
					</Link>
				</Item>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<Stack direction={{ sm: 'column', md: 'row' }} spacing={2}>
						{programmingLanguages.slice(1).map((lang) => (
						<Item key={lang.id} sx={{ flexGrow: 1 }}>
							<Link to={`/language/${lang.id}`}>
								<img
									src={lang.logo}
									style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
									alt={`${lang.name} logo`}
								/>
							</Link>
						</Item>
						))}
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Gallery;
