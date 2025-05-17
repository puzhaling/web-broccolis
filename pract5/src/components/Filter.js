const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            name: event.target.name.value.toLowerCase(),
            type: event.target.type.value.toLowerCase(),
            year: [event.target.yearFrom.value, event.target.yearTo.value],
            position: [event.target.positionFrom.value, event.target.positionTo.value],
            persantage: [event.target.persantageFrom.value, event.target.persantageTo.value],
        };

        if (!filterField.year[0])
            filterField.year[0] = -Infinity;
        if (!filterField.year[1])
            filterField.year[1] = +Infinity;

        if (!filterField.position[0])
            filterField.position[0] = -Infinity;
        if (!filterField.position[1])
            filterField.position[1] = +Infinity;

        if (!filterField.persantage[0])
            filterField.persantage[0] = -Infinity;
        if (!filterField.persantage[1])
            filterField.persantage[1] = +Infinity;

        const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

        let filteredData = props.fullData;

        for (const key in filterField) {
            filteredData = filteredData.filter(item => {
                const strKey = key.toString();
                if (strKey === "name" || strKey === "type") {
                    return filterField[key] ?
                    item[key].toLowerCase().includes(filterField[key]) :
                    true;
                }
                else if (strKey === "year" || strKey === "position" || strKey === "persantage") {
                    const min = parseFloat(filterField[key][0]);
                    const max = parseFloat(filterField[key][1]);
                    const value = Number(item[key]);

                    if (!isNumber(value))
                        return false;

                    return value >= min && value <= max;
                }
                return true;
            });
        }

        props.filtering(filteredData);
    };

    const handleReset = (event) => props.filtering(props.fullData);

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <span className="formFieldName"> Name: </span>
                <input name="name" type="text" />
            </p>
            <p>
                <span className="formFieldName"> Type: </span>
                <input name="type" type="text" />
            </p>
            <p>
                <span className="formFieldName"> Year from: </span>
                <input name="yearFrom" type="text" />
            </p>
            <p>
                <span className="formFieldName"> Year to: </span>
                <input name="yearTo" type="text" />
            </p>
            <p>
                <span className="formFieldName"> Position from: </span>
                <input name="positionFrom" type="text" />
            </p>
            <p>
                <span className="formFieldName"> Position to: </span>
                <input name="positionTo" type="text" />
            </p>
            <p>
                <span className="formFieldName"> Persantage from: </span>
                <input name="persantageFrom" type="text" />
            </p>
            <p>
                <span className="formFieldName"> Persantage to: </span>
                <input name="persantageTo" type="text" />
            </p>
            <p>
                <input type="submit" value="Apply"/>
                <input type="reset" value="Clear"/>
            </p>
        </form>
    );
}

export default Filter;
