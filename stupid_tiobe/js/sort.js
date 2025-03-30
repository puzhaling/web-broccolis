const options = [
    { value: '1', text: 'No' },
    { value: '2', text: 'Name' },
    { value: '3', text: 'Type' },
    { value: '4', text: 'Year' },
    { value: '5', text: 'Position' },
    { value: '6', text: 'Persantage' },
];

// Store selected values for each 'select'
const selectedValues = {
    first: '1',
    second: '1',
    third: '1'
};

document.addEventListener('DOMContentLoaded', initSelects);

function initSelects() {
    fillSelect(sortFstLevel, options);
    fillSelect(sortSndLevel, options);
    fillSelect(sortThrdLevel, options);
    
    sortFstLevel.value = '1';
    sortSndLevel.value = '1';
    sortThrdLevel.value = '1';
    
    sortFstLevelAscFlag.checked = false;
    
    // Block dependant selects
    sortSndLevel.disabled = true;
    sortSndLevelAscFlag.checked = false;
    sortSndLevelAscFlag.disabled = true;
    sortThrdLevel.disabled = true;
    sortThrdLevelAscFlag.checked = false;
    sortThrdLevelAscFlag.disabled = true;
}

const fillSelect = (select, options) => {
    clearSelect(select);

    options.forEach(opt => {
        const newOpt = document.createElement('option');
        newOpt.value = opt.value;
        newOpt.text = opt.text;

        // disable already used options
        if (isOptionBusy(opt.text) && opt.text !== 'No') {
            newOpt.disabled = true;
        }

        select.appendChild(newOpt);
    });
}

const clearSelect = (select) => {
    while (select.firstChild)
        select.removeChild(select.firstChild);
}

const isOptionBusy = (optionText) => {
    // Check whether option with 'optionText' is selected anywhere else
    return (selectedValues.first !== '1' && getOptionText(sortFstLevel, selectedValues.first) === optionText) ||
           (selectedValues.second !== '1' && getOptionText(sortSndLevel, selectedValues.second) === optionText) ||
           (selectedValues.third !== '1' && getOptionText(sortThrdLevel, selectedValues.third) === optionText);
}

const getOptionText = (select, value) => {
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === value) {
            return select.options[i].text;
        }
    }
    return null;
}

const updateSelects = () => {
    const firstText = getOptionText(sortFstLevel, selectedValues.first);
    const secondText = getOptionText(sortSndLevel, selectedValues.second);

    fillSelect(sortFstLevel, options);
    fillSelect(sortSndLevel, options);
    fillSelect(sortThrdLevel, options);
    
    restoreSelectValue(sortFstLevel, selectedValues.first);
    restoreSelectValue(sortSndLevel, selectedValues.second);
    restoreSelectValue(sortThrdLevel, selectedValues.third);
    
    updateDependentSelects(firstText, secondText);
}

const restoreSelectValue = (select, value) => {
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === value && !select.options[i].disabled) {
            select.value = value;
            return;
        }
    }

    select.value = '1';
}

const updateDependentSelects = (firstText, secondText) => {
    if (firstText === 'No') {
        sortSndLevel.disabled = true;
        sortSndLevelAscFlag.disabled = true;
        sortThrdLevel.disabled = true;
        sortThrdLevelAscFlag.disabled = true;
        selectedValues.second = '1';
        selectedValues.third = '1';
    } else {
        sortSndLevel.disabled = false;
        sortSndLevelAscFlag.disabled = false;
    }
    
    if (secondText === 'No') {
        sortThrdLevel.disabled = true;
        sortThrdLevelAscFlag.disabled = true;
        selectedValues.third = '1';
    } else if (firstText !== 'No') {
        sortThrdLevel.disabled = false;
        sortThrdLevelAscFlag.disabled = false;
    }
}

sortFstLevel.addEventListener('change', function() {
    selectedValues.first = this.value;
    selectedValues.second = '1';
    selectedValues.third = '1';
    updateSelects();
});

sortSndLevel.addEventListener('change', function() {
    selectedValues.second = this.value;
    selectedValues.third = '1';
    updateSelects();
});

sortThrdLevel.addEventListener('change', function() {
    selectedValues.third = this.value;
    updateSelects();
});

const createSortArr = (data) => {
    const sortArr = [];
    
    const sortSelects = data.getElementsByTagName('select');
    const sortFlags = data.getElementsByTagName('input');

    for (let i = 0; i < sortSelects.length; i++) {
        const keySort = sortSelects[i].value;

        if (keySort === '1') // No
            continue;

        const desc = !sortFlags[i].checked; // page has an "ascending order" flag

        sortArr.push({
            column: keySort - 2, // No=1, Name=2, Type=3...
            order: desc ? -1 : 1
        });
    }

    console.log('sortArr', sortArr);
    return sortArr;
}

const isNumber = n => {
    return (isNaN(parseFloat(n)) || !isFinite(n)) === false;
}

const strcmp = (a, b) => {
    return (a < b ? -1 : (a > b ? 1 : 0));
}

const sortTable = () => {
    const sortArr = createSortArr(sortForm);
    
    console.log('sortArr', sortArr);

    console.log('sortTable: sortArr = ', sortArr);
    if (sortArr.length === 0) {
        clearTable();
        fillTable(data);
        return;
    }

    const rows = Array.from(table.rows);

    // exclude header row from sorting procedure
    const headerRow = rows.shift();

    rows.sort((rowA, rowB) => {
        for (const sort of sortArr) {
            const cellA = rowA.cells[sort.column].textContent;
            const cellB = rowB.cells[sort.column].textContent;

            // console.log('cellA', cellA);
            // console.log('cellB', cellB);

            let comparsion = 0;
            
            if (isNumber(cellA) && isNumber(cellB)) {
                comparsion = +cellA - +cellB;
            } else {
                comparsion = strcmp(cellA, cellB);
            }
            
            if (comparsion !== 0) {
                return sort.order * comparsion;
            }
        }
        return 0;
    });

    clearTable();
    
    table.appendChild(headerRow);
    
    rows.forEach(row => table.appendChild(row));
}

applySortBtn.addEventListener('click', sortTable);