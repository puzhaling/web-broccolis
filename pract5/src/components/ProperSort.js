import React, { useState, useEffect } from 'react';

const Sort = ({ onApplySort }) => {
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
        third: '1'
    });

    const [sortFlags, setSortFlags] = useState({
        first: false,
        second: false,
        third: false
    });

    const [disabledSelects, setDisabledSelects] = useState({
        second: true,
        third: true
    });

    const [disabledFlags, setDisabledFlags] = useState({
        second: true,
        third: true
    });

    useEffect(() => {
        updateDependentSelects();
    }, [selectedValues]);

    const isOptionBusy = (optionText, currentSelect) => {
        if (optionText === 'No') return false;

        return (
            (currentSelect !== 'first' && selectedValues.first !== '1' &&
            options.find(opt => opt.value === selectedValues.first)?.text === optionText) ||
            (currentSelect !== 'second' && selectedValues.second !== '1' &&
            options.find(opt => opt.value === selectedValues.second)?.text === optionText) ||
            (currentSelect !== 'third' && selectedValues.third !== '1' &&
            options.find(opt => opt.value === selectedValues.third)?.text === optionText)
        );
    };

    const updateDependentSelects = () => {
        const firstText = options.find(opt => opt.value === selectedValues.first)?.text;
        const secondText = options.find(opt => opt.value === selectedValues.second)?.text;

        if (firstText === 'No') {
            setDisabledSelects({
                second: true,
                third: true
            });
            setDisabledFlags({
                second: true,
                third: true
            });
            setSelectedValues(prev => ({
                ...prev,
                second: '1',
                third: '1'
            }));
        } else {
            setDisabledSelects(prev => ({
                ...prev,
                second: false
            }));
            setDisabledFlags(prev => ({
                ...prev,
                second: false
            }));
        }

        if (secondText === 'No') {
            setDisabledSelects(prev => ({
                ...prev,
                third: true
            }));
            setDisabledFlags(prev => ({
                ...prev,
                third: true
            }));
            setSelectedValues(prev => ({
                ...prev,
                third: '1'
            }));
        } else if (firstText !== 'No') {
            setDisabledSelects(prev => ({
                ...prev,
                third: false
            }));
            setDisabledFlags(prev => ({
                ...prev,
                third: false
            }));
        }
    };

    const handleSelectChange = (e, level) => {
        const value = e.target.value;
        setSelectedValues(prev => {
            const newValues = { ...prev, [level]: value };

            // Reset dependent levels when higher level changes
            if (level === 'first') {
                newValues.second = '1';
                newValues.third = '1';
            } else if (level === 'second') {
                newValues.third = '1';
            }

            return newValues;
        });
    };

    const handleFlagChange = (e, level) => {
        setSortFlags(prev => ({
            ...prev,
            [level]: e.target.checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const sortArr = [];

        // First level
        if (selectedValues.first !== '1') {
            sortArr.push({
                column: parseInt(selectedValues.first) - 2, // No=1, Name=2, Type=3...
                         order: sortFlags.first ? 1 : -1
            });
        }

        // Second level
        if (selectedValues.second !== '1') {
            sortArr.push({
                column: parseInt(selectedValues.second) - 2,
                         order: sortFlags.second ? 1 : -1
            });
        }

        // Third level
        if (selectedValues.third !== '1') {
            sortArr.push({
                column: parseInt(selectedValues.third) - 2,
                         order: sortFlags.third ? 1 : -1
            });
        }

        onApplySort(sortArr);
    };

    return (
        <form onSubmit={handleSubmit}>
        <p>
        <label htmlFor="sortFstLevel">First Level: </label>
        <select
        name="sortFstLevel"
        id="sortFstLevel"
        value={selectedValues.first}
        onChange={(e) => handleSelectChange(e, 'first')}
        >
        {options.map(opt => (
            <option
            key={`first-${opt.value}`}
            value={opt.value}
            disabled={isOptionBusy(opt.text, 'first')}
            >
            {opt.text}
            </option>
        ))}
        </select>
        <label htmlFor="sortFstLevelAscFlag"> ascending order? </label>
        <input
        type="checkbox"
        name="sortFstLevelAscFlag"
        id="sortFstLevelAscFlag"
        checked={sortFlags.first}
        onChange={(e) => handleFlagChange(e, 'first')}
        />
        </p>
        <p>
        <label htmlFor="sortSndLevel">Second Level: </label>
        <select
        name="sortSndLevel"
        id="sortSndLevel"
        value={selectedValues.second}
        onChange={(e) => handleSelectChange(e, 'second')}
        disabled={disabledSelects.second}
        >
        {options.map(opt => (
            <option
            key={`second-${opt.value}`}
            value={opt.value}
            disabled={isOptionBusy(opt.text, 'second')}
            >
            {opt.text}
            </option>
        ))}
        </select>
        <label htmlFor="sortSndLevelAscFlag"> ascending order? </label>
        <input
        type="checkbox"
        name="sortSndLevelAscFlag"
        id="sortSndLevelAscFlag"
        checked={sortFlags.second}
        onChange={(e) => handleFlagChange(e, 'second')}
        disabled={disabledFlags.second}
        />
        </p>
        <p>
        <label htmlFor="sortThrdLevel">Third Level: </label>
        <select
        name="sortThrdLevel"
        id="sortThrdLevel"
        value={selectedValues.third}
        onChange={(e) => handleSelectChange(e, 'third')}
        disabled={disabledSelects.third}
        >
        {options.map(opt => (
            <option
            key={`third-${opt.value}`}
            value={opt.value}
            disabled={isOptionBusy(opt.text, 'third')}
            >
            {opt.text}
            </option>
        ))}
        </select>
        <label htmlFor="sortThrdLevelAscFlag"> ascending order? </label>
        <input
        type="checkbox"
        name="sortThrdLevelAscFlag"
        id="sortThrdLevelAscFlag"
        checked={sortFlags.third}
        onChange={(e) => handleFlagChange(e, 'third')}
        disabled={disabledFlags.third}
        />
        </p>
        <p>
        <button type="submit">Apply</button>
        </p>
        </form>
    );
};

export default Sort;
