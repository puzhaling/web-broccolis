import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {

  const [filteredData, setFilteredData] = useState(buildings);

  // console.log(filteredData);

  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={ filteredData }/>
      <Table
        fullData={ buildings }
        filteredData={ filteredData }
        setFilteredData={ setFilteredData }
        amountRows={ 10 }
        enablePagination={ true }
      />
    </div>
  );
}

export default App;
