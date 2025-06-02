import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
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
            <h4> Filter </h4>
            <Filter
                filtering={ handleFilter }
                fullData={ props.data  }

                setFilterDropStatus={ setFilterDropStatus }
            />

            <h4> Sort </h4>
            <Sort
                filteredData={ filteredData }
                currData={ displayData }
                setDisplayData={ setDisplayData }

                filterDropStatus={ filterDropStatus }
                setFilterDropStatus={ setFilterDropStatus }
            />

            <table>
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
