import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState, useEffect } from "react";
import Filter from './Filter.js';

const Table = (props) => {
    const [activePage, setActivePage] = useState("1");

    // console.log('Table: filteredData', props.data);

    useEffect(() => {
        setActivePage("1");
    }, [props.filteredData]);

    const amountRows = props.enablePagination
        ? props.amountRows
        : props.filteredData.length;

    const totalPages = Math.ceil(props.filteredData.length / amountRows);
    const pageNumbers = Array.from({ length: totalPages }, (v, i) => i + 1);

    return (
        <>
        <h4>Фильтры</h4>
        <Filter
            filtering={ props.setFilteredData }
            data={ props.filteredData }
            fullData={ props.fullData }
        />

        <table>
        <TableHead head={ Object.keys(props.fullData[0]) } />
        <TableBody
            body={ props.filteredData }
            amountRows={ amountRows }
            numPage={ activePage }
        />
        </table>

        {props.enablePagination && totalPages > 1 && (
            <div className="pagesNumContainer">
            {pageNumbers.map((pageNum) => (
                <span
                    key={pageNum}
                    className={`pageNum ${activePage === pageNum ? 'active' : ''}`}
                    onClick={() => setActivePage(pageNum)}
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
