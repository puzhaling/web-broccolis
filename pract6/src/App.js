import logo from './images/logo.svg';
import './CSS/App.css';
import Filter from './components/Filter.js';
import Table from './components/Table.js';
import progLangsInfo from './data.js';

function App() {
  return (
    <div className="App">
      <Table data={ progLangsInfo } enablePagination={ true } />
    </div>
  );
}

export default App;
