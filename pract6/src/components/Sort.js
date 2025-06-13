import { useState, useEffect } from 'react';

const Sort = (props) => {
    const options = [
        { value: '1', text: 'No' },
        { value: '2', text: 'Name' },
        { value: '3', text: 'Type' },
        { value: '4', text: 'Year' },
        { value: '5', text: 'Position' },
        { value: '6', text: 'Persantage' },
    ];

    const [selectedValues, setSelectedValues] = useState({
        first: '1',
        second: '1',
        third: '1',
    });

    const [flags, setFlags] = useState({
        first: false,
        second: false,
        third: false,
    });

    useEffect(() => {
        if (props.filterDropStatus) {
            setSelectedValues({ first: '1', second: '1', third: '1' });
            setFlags({ first: false, second: false, third: false });
            props.setDisplayData([...props.filteredData]);
            props.setFilterDropStatus(false); // Сбрасываем флаг
        }
    }, [props.filterDropStatus, props.filteredData]);

    const handleClear = () => {
        setSelectedValues({ first: '1', second: '1', third: '1' });
        setFlags({ first: false, second: false, third: false });
        props.setDisplayData([...props.filteredData]);
    };

    // Функция для получения доступных опций для select'а
    const getAvailableOptions = (level) => {
        const selected = [];

        // Собираем уже выбранные значения из предыдущих уровней
        if (level === 'second' && selectedValues.first !== '1') {
            selected.push(selectedValues.first);
        } else if (level === 'third') {
            if (selectedValues.first !== '1') selected.push(selectedValues.first);
            if (selectedValues.second !== '1') selected.push(selectedValues.second);
        }

        // Фильтруем опции, оставляя только "No" и невыбранные варианты
        return options.filter(opt =>
        opt.value === '1' || !selected.includes(opt.value)
        );
    };

    // Функция для определения disabled состояния select'а
    const isSelectDisabled = (level) => {
        if (level === 'first') return false;
        if (level === 'second') return selectedValues.first === '1';
        if (level === 'third') return selectedValues.second === '1';
        return true;
    };

    const handleSelectChange = (event, level) => {
        const newValue = event.target.value;

        setSelectedValues(prev => {
            const newValues = {...prev};
            newValues[level] = newValue;

            if (newValue === '1') {
                if (level === 'first') {
                    newValues.second = '1';
                    newValues.third = '1';
                } else if (level === 'second') {
                    newValues.third = '1';
                }
            }

            return newValues;
        });

        if (newValue === '1') {
            setFlags(prev => {
                const newFlags = {...prev};
                if (level === 'first') {
                    newFlags.second = false;
                    newFlags.third = false;
                } else if (level === 'second') {
                    newFlags.third = false;
                }
                return newFlags;
            });
        }
    };

    const handleFlagChange = (event, level) => {
        const isChecked = event.target.checked;
        const newValues = {...flags};
        newValues[level] = isChecked;
        setFlags(newValues);
    };

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
        <form onSubmit={handleSubmit}>
            <p>
                <label>First Level: </label>
                <select
                    value={selectedValues.first}
                    onChange={e => handleSelectChange(e, 'first')}
                >
                    {options.map(opt => (
                        <option value={opt.value} key={opt.value}>{opt.text}</option>
                    ))}
                </select>
                <label> ascending order? </label>
                <input
                    type="checkbox"
                    checked={flags.first}
                    onChange={e => handleFlagChange(e, 'first')}
                    disabled={selectedValues.first === '1'}
                />
            </p>

            <p>
                <label>Second Level: </label>
                <select
                    value={selectedValues.second}
                    onChange={e => handleSelectChange(e, 'second')}
                    disabled={isSelectDisabled('second')}
                >
                    {getAvailableOptions('second').map(opt => (
                        <option value={opt.value} key={opt.value}>{opt.text}</option>
                    ))}
                </select>
                <label> ascending order? </label>
                <input
                    type="checkbox"
                    checked={flags.second}
                    onChange={e => handleFlagChange(e, 'second')}
                    disabled={selectedValues.second === '1' || isSelectDisabled('second')}
                />
            </p>

            <p>
                <label>Third Level: </label>
                <select
                    value={selectedValues.third}
                    onChange={e => handleSelectChange(e, 'third')}
                    disabled={isSelectDisabled('third')}
                >
                    {getAvailableOptions('third').map(opt => (
                        <option value={opt.value} key={opt.value}>{opt.text}</option>
                    ))}
                </select>
                <label> ascending order? </label>
                <input
                    type="checkbox"
                    checked={flags.third}
                    onChange={e => handleFlagChange(e, 'third')}
                    disabled={selectedValues.third === '1' || isSelectDisabled('third')}
                />
            </p>

            <p>
                <input type="submit" value="Apply"/>
                <input type="button" value="Clear" onClick={ handleClear }/>
            </p>
        </form>
    );
};

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
