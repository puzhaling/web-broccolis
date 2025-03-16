let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
};

let dataFilter = (dataForm) => {
    let dictFilter = {};
    for (let j = 0; j < dataForm.elements.length; j++) {
        let item = dataForm.elements[j];
        let valInput = item.value;

        // Если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text")
            valInput = valInput.toLowerCase();
        // Если поле типа number
        else if (item.type == "number") {
            // Если поле пустое, заменяем на бесконечность
            if (valInput === "") {
                if (item.id.endsWith("From")) {
                    valInput = Number.NEGATIVE_INFINITY;
                } else if (item.id.endsWith("To")) {
                    valInput = Number.POSITIVE_INFINITY;
                }
            } else {
                // Если поле не пустое, преобразуем в число
                valInput = +valInput;
            }
        }

        // Сохраняем значение в объект фильтра
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

let filterTable = (data, idTable, dataForm) =>{

    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);
    console.log('datafilter:', datafilter);

    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
        for(let key in item) {
            
            let val = item[key];

            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                val = item[key].toLowerCase()
                let filterValue = datafilter[correspond[key]];
                result &&= (val.indexOf(datafilter[correspond[key]]) !== -1);
            } 
            // САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу
            else if (typeof val == 'number') {
                let rangeKeys = correspond[key];
                if (rangeKeys) {
                    let from = datafilter[correspond[key][0]];
                    let to = datafilter[correspond[key][1]];
                    result &&= (val >= from && val <= to); 
                }
            } else {
                console.log('wtf');
            }
        }
        return result;
    });     

    // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
    clearTable(idTable);

    // показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);  
}

let clearFilter = (tableId, data, dataForm) => {
    dataForm.reset();
    clearTable(tableId);
    createTable(data, tableId);  
};