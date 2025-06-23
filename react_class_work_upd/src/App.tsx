import IncList from './IncList';

function App() {

  	const data: string[] = [
		"1", "2", "3", "4", "5", "6", "7",
		"8", "9", "10", "11", "12", "13", "14",
		"15",
	];

	const n: number = 7;

  return (
    <IncList data={data} n={n}/>
  );
}

export default App;
