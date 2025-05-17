import { useState } from 'react';

const Sort = (props) => {

    const options = [
        { value: '1', text: 'No' },
        { value: '2', text: 'Name' },
        { value: '3', text: 'Type' },
        { value: '4', text: 'Year' },
        { value: '5', text: 'Position' },
        { value: '6', text: 'Percentage' },
    ];

    const [selectedValues, setSelectedValues] = useState({
        first: '1',
        second: '1',
        third: '1',
    });

    const [flags, setFlags] = useState({
        first: false,
        second: false,
        third: false
    });

    const handleSelectChange = (event, level) => {
        let changedSelect = selectedValues;
        changedSelect[level] = event.target.value;
        setSelectedValues(changedSelect);
    }

    const handleFlagChange = (event, level) => {
        let newFlags = flags;
        newFlags[level] = !newFlags[level];
        setFlags(newFlags);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let sortArr = [];

        if (selectedValues.first !== '1') {
            sortArr.push({
                column: parseInt(selectedValues.first) - 2,
                order: flags.first ? 1 : -1
            });
        }

        if (selectedValues.second !== '1') {
            sortArr.push({
                column: parseInt(selectedValues.second) - 2,
                order: flags.second ? 1 : -1
            });
        }

        if (selectedValues.third !== '1') {
            sortArr.push({
                column: parseInt(selectedValues.third) - 2,
                order: flags.third ? 1 : -1
            });
        }

        const dataToSort = sortArr.length === 0 ? props.filteredData : props.displayData;
        sort(sortArr, dataToSort, props.filteredData, props.setDisplayData);
    };

    return (
        <form onSubmit={ handleSubmit }>
            <p>
                <label> First Level: </label>
                <select onChange={ e => handleSelectChange(e, 'first') }>
                    {options.map(opt => (
                        <option value={ opt.value } key={ opt.value }> { opt.text } </option>
                    ))}
                </select>
                <label> ascending order? </label>
                <input type="checkbox" onChange={ e => handleFlagChange(e, 'first') }/>
            </p>
            <p>
                <label> Second Level: </label>
                <select onChange={ e => handleSelectChange(e, 'second') }>
                    {options.map(opt => (
                        <option value={opt.value} key={ opt.value }> { opt.text } </option>
                    ))}
                </select>
                <label> ascending order? </label>
                <input type="checkbox" onChange={ e => handleFlagChange(e, 'second')} />
            </p>
            <p>
                <label> Third Level: </label>
                <select onChange={ e => handleSelectChange(e, 'third') }>
                    {options.map(opt => (
                        <option value={ opt.value } key={ opt.value }> { opt.text } </option>
                    ))}
                </select>
                <label> ascending order? </label>
                <input type="checkbox" onChange={ e => handleFlagChange(e, 'third') }/>
            </p>
            <p>
                <input type="submit" value="Apply"/>
            </p>
        </form>
    );
}


const sort = (sortArr, dataToSort, filteredData, setDisplayData) => {
    if (sortArr.length === 0) {
        setDisplayData([...filteredData]);
        return;
    }

    const sortedData = [...filteredData].sort((a, b) => {
        for (const sortCondition of sortArr) {
            const { column, order } = sortCondition;
            const keys = Object.keys(filteredData[0]);
            const key = keys[column];

            if (['year', 'position', 'persantage'].includes(key)) {
                if (a[key] !== b[key]) {
                    return order === 1 ? a[key] - b[key] : b[key] - a[key];
                }
            } else {
                const valueA = String(a[key]).toLowerCase();
                const valueB = String(b[key]).toLowerCase();

                if (valueA < valueB) return order === 1 ? -1 : 1;
                if (valueA > valueB) return order === 1 ? 1 : -1;
            }
        }
        return 0;
    });

    setDisplayData(sortedData);
};

export default Sort;
