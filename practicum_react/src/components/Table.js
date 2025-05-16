import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';

const Table = (props) => {
    const [dataTable, setDataTable] = useState(props.data);
    const [activePage, setActivePage] = useState("1");

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage("1");
    };

    const amountRows = props.enablePagination === "true"
        ? parseInt(props.amountRows)
        : dataTable.length;

    const totalPages = Math.ceil(dataTable.length / amountRows);

    const pageNumbers = Array.from({ length: totalPages }, (v, i) => i + 1);

    return (
        <>
        <h4>Фильтры</h4>
        <Filter
            filtering={ updateDataTable }
            data={ dataTable }
            fullData={ props.data }
        />

        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody
                body={ dataTable }
                amountRows={ amountRows }
                numPage={ activePage }
            />
        </table>

        {props.enablePagination === "true" && (
            <div className="pagesNumContainer">
            {pageNumbers.map((pageNum) => (
                <span
                    key={ pageNum }
                    className={ `pageNum ${activePage === pageNum ? 'active' : ''}` }
                    onClick={ () => setActivePage(pageNum) }
                >
                {pageNum}
                </span>
            ))}
            </div>
        )}
        </>
    );
}

export default Table;
