import * as React from 'react';
import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import CardList from "./components/CardList";
import { CardContent } from "./components/CardList";
import Footer from "./components/Footer";

const Main: React.FC = () => {

    const brainfckCard: CardContent = {
        cardImgPath: "https://static-00.iconduck.com/assets.00/brainfuck-icon-512x512-mhpf1b41.png",
        cardText: "Brainfck is an extremely minimalist language (only 8 commands), hard to read but Turing-complete.",
    };
    const whitespaceCard: CardContent = {
        cardImgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLx2_cZ1Ne78hZRbujoXTVHke8KIJzgde5gg&s",
        cardText: "Whitespace ignores all non-whitespace characters, using only spaces, tabs, and line breaks to write programs, creating invisible code that's both puzzling and amusing",
    };
    const pietCard: CardContent = {
        cardImgPath: "https://forum.level1techs.com/uploads/default/34413/212d1df1272dba17.png",
        cardText: "Piet uses colored pixels in abstract art to represent commands, making programs look like modernist paintings",
    };
    const malbolgeCard: CardContent = {
        cardImgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa6UYdsxX5fhgA-cKP8sQfzLZoNHq1-yKJng&s",
        cardText: "Malbolge was designed to be nearly impossible to write, with self-modifying code and chaotic operations, earning its name from Dante’s Inferno",
    };

    return (
        <div>
            <Navbar active="1"/>
            <Gallery/>
            <CardList content={[brainfckCard, whitespaceCard, pietCard, malbolgeCard]}/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default Main;
