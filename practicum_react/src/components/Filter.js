const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [event.target["yearFrom"].value, event.target["yearTo"].value],
            "Высота": [event.target["heightFrom"].value, event.target["heightTo"].value]
        };

        if (!filterField["Год"][0]) filterField["Год"][0] = -Infinity;
        if (!filterField["Год"][1]) filterField["Год"][1] = +Infinity;
        if (!filterField["Высота"][0]) filterField["Высота"][0] = -Infinity;
        if (!filterField["Высота"][1]) filterField["Высота"][1] = +Infinity;

        const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

        let filteredData = props.fullData;

        for (const key in filterField) {
            filteredData = filteredData.filter(item => {
                if (key === "Название" || key === "Тип" || key === "Страна" || key === "Город") {
                    return filterField[key] ?
                    item[key].toLowerCase().includes(filterField[key]) :
                    true;
                }
                else if (key === "Год" || key === "Высота") {
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
                <span className="formField">Название:</span>
                <input name="structure" type="text" />
            </p>
            <p>
                <span className="formField">Тип:</span>
                <input name="type" type="text" />
            </p>
            <p>
                <span className="formField">Страна:</span>
                <input name="country" type="text" />
            </p>
            <p>
                <span className="formField">Город:</span>
                <input name="city" type="text" />
            </p>
            <p>
                <span className="formField">Год от:</span>
                <input name="yearFrom" type="text" />
            </p>
            <p>
                <span className="formField">Год до:</span>
                <input name="yearTo" type="text" />
            </p>
            <p>
                <span className="formField">Высота от:</span>
                <input name="heightFrom" type="text" />
            </p>
            <p>
                <span className="formField">Высота до:</span>
                <input name="heightTo" type="text" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтры</button>
            </p>
        </form>
    )
}

export default Filter;
