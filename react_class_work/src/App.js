import './App.css';
import List from './List.js';

function App() {

	const list = [
		"1", "2", "3", "4", "5", "6", "7",
		"8", "9", "10", "11", "12", "13", "14",
		"15",
	];

	const n = 7;

	return (
		<div className="App">
			<List data={ list } n={ n }/>
		</div>
	);
}

export default App;
