import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { programmingLanguage } from "./Gallery";
import Navbar from '../../components/Navbar';
import Container from "@mui/material/Container";

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

const LanguagePage = () => {
    const { id } = useParams();
    const language = programmingLanguages.find(lang => lang.id === id);

    if (!language) {
            return <>Language is not found</>;
    }

    return (
        <>
        <Navbar active="1"/>
        <Container maxWidth="xl">
            <Box sx={{ p: 4 }}>
                <Link to="/" style={{ display: "inline-block", textDecoration: "none", margin: "10px" }}>
                    <Typography variant="h6">Главная</Typography>
                </Link>
                <Box sx={{ display: "inline-block" }}>
                    <Typography variant="h6">{language.name}</Typography>
                </Box>
                <Paper sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <img
                            src={language.logo}
                            alt={`${language.name} logo`}
                            style={{ width: '100px', height: '100px', marginRight: '20px' }}
                        />
                        <Typography variant="h3">{language.name}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1">
                        {language.description}
                    </Typography>

                    <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                        Code example:
                    </Typography>

                    <Typography>
                        {language.exampleCode}
                    </Typography>
                </Paper>
            </Box>
        </Container>
        </>
    );
};

export default LanguagePage;
