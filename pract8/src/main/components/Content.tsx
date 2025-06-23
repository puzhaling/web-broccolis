import * as React from 'react';
import {
  Container,
  Paper,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const RowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch', // Это ключевое свойство для одинаковой высоты
  minHeight: '300px', // Минимальная высота для всех строк
  marginBottom: theme.spacing(2),
}));

const TextContainer = styled(Box)(({ theme }) => ({
  flex: 3,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export const Content = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: "50px" }}>
      {/* Первая строка - Python */}
      <RowContainer>
        {/* Текст */}
        <Item sx={{ flex: 3 }}>
          <TextContainer>
            <Typography variant="h5" gutterBottom>
              Python
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              sx={{
                flexGrow: 1,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured (particularly procedural), object-oriented and functional programming. It is often described as a "batteries included" language due to its comprehensive standard library. Guido van Rossum began working on Python in the late 1980s as a successor to the ABC programming language and first released it in 1991 as Python 0.9.0. Python 2.0 was released in 2000. Python 3.0, released in 2008, was a major revision not completely backward-compatible with earlier versions. Python 2.7.18, released in 2020, was the last release of Python 2.
            </Typography>
          </TextContainer>
        </Item>

        {/* Картинка */}
        <Item sx={{ flex: 1 }}>
          <ImageContainer>
            <img
              src="https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png"
              alt="Python"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </ImageContainer>
        </Item>
      </RowContainer>

      {/* Вторая строка - C++ */}
      <RowContainer>
        {/* Картинка */}
        <Item sx={{ flex: 1 }}>
          <ImageContainer>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/911px-ISO_C%2B%2B_Logo.svg.png"
              alt="C++"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </ImageContainer>
        </Item>

        {/* Текст */}
        <Item sx={{ flex: 3 }}>
          <TextContainer>
            <Typography variant="h5" gutterBottom>C++</Typography>
            <Typography
              variant="body1"
              align="justify"
              sx={{
                flexGrow: 1,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              C++ (pronounced "C plus plus" and sometimes abbreviated as CPP) is a high-level, general-purpose programming language created by Danish computer scientist Bjarne Stroustrup. First released in 1985 as an extension of the C programming language, it has since expanded significantly over time; as of 1997, C++ has object-oriented, generic, and functional features, in addition to facilities for low-level memory manipulation for systems like microcomputers or to make operating systems like Linux or Windows. It is usually implemented as a compiled language, and many vendors provide C++ compilers, including the Free Software Foundation, LLVM, Microsoft, Intel, Embarcadero, Oracle, and IBM. C++ was designed with systems programming and embedded, resource-constrained software and large systems in mind, with performance, efficiency, and flexibility of use as its design highlights. C++ has also been found useful in many other contexts, with key strengths being software infrastructure and resource-constrained applications, including desktop applications, video games, servers (e.g., e-commerce, web search, or databases), and performance-critical applications (e.g., telephone switches or space probes).
            </Typography>
          </TextContainer>
        </Item>
      </RowContainer>
    </Container>
  );
};

export default Content;
