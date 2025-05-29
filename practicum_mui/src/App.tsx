import React from 'react';
import logo from './images/logo.svg';
import './styles/App.css';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
			<Navbar active="2"/>
			<Gallery/>
			<Content/>
			<Footer/>
    </div>
  );
}

export default App;
