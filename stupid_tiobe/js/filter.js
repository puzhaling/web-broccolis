applyFilterBtn.addEventListener('click', function() {
    filterTable(data, filterForm);
});

clearFilterBtn.addEventListener('click', function() {
    Array.from(filterForm.getElementsByTagName('input'))
        .filter(field => { return field.type != 'button'; })
        .forEach(field => { return field.value = ''; });
    
    clearTable();
    fillTable(data);
    initSelects();
});

const formToDict = (form) => {
    const formFields = Array.from(form.elements).filter(input => 
        input.type !== 'button' && input.name
    );

    return formFields.reduce((dict, field) => {
        if (field.type === 'text') {
            return { ...dict, [field.name]: field.value.toLowerCase() };
        }
        else if (field.type === 'number') {
            const isFromField = field.id.endsWith('From');
            const value = field.value === '' ? 
                (isFromField ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) :
                +field.value;
            
            return { ...dict, [field.name]: value };
        }
        return dict;
    }, {});
};


const filterTable = (data, dataForm) => {
    const datafilter = formToDict(dataForm);
    console.log('Filter values:', datafilter);

    const tableFilteredData = data.filter(rowData => {
        // Filter by name (contains)
        if (datafilter.langName && 
            rowData.name.toLowerCase().indexOf(datafilter.langName) === -1) {
            return false;
        }

        // Filter by type (contains)
        if (datafilter.type && 
            rowData.type.toLowerCase().indexOf(datafilter.type) === -1) {
            return false;
        }

        // Filter by year range
        if (datafilter.yearFrom !== Number.NEGATIVE_INFINITY && 
            rowData.year < datafilter.yearFrom) {
            return false;
        }
        if (datafilter.yearTo !== Number.POSITIVE_INFINITY && 
            rowData.year > datafilter.yearTo) {
            return false;
        }

        // Filter by position range
        if (datafilter.positionFrom !== Number.NEGATIVE_INFINITY && 
            rowData.position < datafilter.positionFrom) {
            return false;
        }
        if (datafilter.positionTo !== Number.POSITIVE_INFINITY && 
            rowData.position > datafilter.positionTo) {
            return false;
        }

        if (datafilter.persantageFrom !== Number.NEGATIVE_INFINITY && 
            rowData.persantage < datafilter.persantageFrom) {
            return false;
        }
        if (datafilter.persantageTo !== Number.POSITIVE_INFINITY && 
            rowData.persantage > datafilter.persantageTo) {
            return false;
        }

        return true;
    });
    
    console.log('Filtered data:', tableFilteredData);
    clearTable();
    fillTable(tableFilteredData);
};