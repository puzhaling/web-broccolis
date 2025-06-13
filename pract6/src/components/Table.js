import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import Visualizer from './Visualizer.js';
import { useState } from 'react';

// добавить кнопку очистки сортировки (возврат к отфильтрованным данным) (+)
// при сбросе фильтров очищать поля сортировки (+)

const Table = (props) => {
    const [filteredData, setFilteredData] = useState(props.data);
    const [displayData, setDisplayData] = useState(props.data);
    const [activePage, setActivePage] = useState("1");
    const [filterDropStatus, setFilterDropStatus] = useState(false);

    const handleFilter = (filteredValues) => {
        setFilteredData(filteredValues);
        setDisplayData(filteredValues);
        setActivePage("1");
    };

    const amountRows = props.enablePagination == true
        ? 15 : displayData.length;

    const totalPages = Math.ceil(displayData.length / amountRows);
    const pageNumbers = Array.from({ length: totalPages }, (v, i) => i + 1);

    return (
        <>
            <h1> Visualization </h1>
            <Visualizer displayData={ displayData }/>

            <h1> Filter </h1>
            <Filter
                filtering={ handleFilter }
                fullData={ props.data  }

                setFilterDropStatus={ setFilterDropStatus }
            />

            <h1> Sort </h1>
            <Sort
                filteredData={ filteredData }
                currData={ displayData }
                setDisplayData={ setDisplayData }

                filterDropStatus={ filterDropStatus }
                setFilterDropStatus={ setFilterDropStatus }
            />

            <table id="table">
                <TableHead head={ Object.keys(props.data[0]) } />
                <TableBody
                    body={ displayData }
                    amountRows={ amountRows }
                    numPage={ activePage }
                />
            </table>

            {props.enablePagination && displayData.length > amountRows && (
                <div className="pagesNumContainer">
                    {pageNumbers.map((pageNum) => (
                        <span
                            key={ pageNum }
                            className={ `pageNum ${activePage == pageNum ? 'active' : ''}` }
                            onClick={ () => setActivePage(pageNum) }
                        >
                                { pageNum }
                        </span>
                    ))}
                </div>
            )}
        </>
    );
}

export default Table;
