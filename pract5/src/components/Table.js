import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState } from 'react';

const Table = (props) => {
    const fullData = props.data;
    const [filteredData, setFilteredData] = useState(fullData);
    const [displayData, setDisplayData] = useState(fullData);
    const [activePage, setActivePage] = useState("1");

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
            <h4> Filter </h4>
            <Filter
                filtering={ handleFilter }
                fullData={ fullData }
            />

            <h4> Sort </h4>
            <Sort
                filteredData={ filteredData }
                currData={ displayData }
                setDisplayData={ setDisplayData }
            />

            <table>
                <TableHead head={ Object.keys(fullData[0]) } />
                <TableBody
                    body={ displayData }
                    amountRows={ amountRows }
                    numPage={ activePage }
                />
            </table>

            {props.enablePagination && (
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
