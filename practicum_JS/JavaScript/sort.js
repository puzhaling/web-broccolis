/*формируем массив для сортировки по уровням вида 
  (в нашем случае в форме два уровня сортировки):
   [
    {column: номер столбца, по которому осуществляется сортировка, 
     order: порядок сортировки (true по убыванию, false по возрастанию)
    },
    {column: номер столбца, 
     order: порядок сортировки
    }
   ]
*/
let createSortArr = (data) => {
    let sortArr = [];
    
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
       // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};

let sortTable = (idTable, data) => {
    
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);
    
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
    let headerRow = rowData.shift();
    
    //сортируем данные по возрастанию по всем уровням сортировки
    // используется массив sortArr
    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column; // Номер столбца
            let order = sortArr[i].order ? -1 : 1; // Порядок сортировки

            let firstValue = first.cells[key].innerHTML;
            let secondValue = second.cells[key].innerHTML;

            // Сравниваем значения
            if (firstValue > secondValue) {
                return order; // Возвращаем порядок (1 или -1)
            } else if (firstValue < secondValue) {
                return -order; // Возвращаем обратный порядок
            }
        }
        return 0;
    });
    
    clearTable(idTable);
    // обновить таблицу на страницу

    table.appendChild(headerRow);

    rowData.forEach(row => table.appendChild(row));
}

let resetSort = (idTable, data, sortFormId) => {
    // Сбрасываем значения формы сортировки
    let sortForm = document.getElementById(sortFormId);

    // Сбрасываем выпадающие списки
    let selects = sortForm.getElementsByTagName('select');
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0; // Устанавливаем значение "Нет"
    }

    // Сбрасываем флажки
    for (let i = 0; i < selects.length; i++) {
        let checkbox = document.getElementById(selects[i].id + 'Desc');
        if (checkbox) {
            checkbox.checked = false; // Отключаем сортировку по убыванию
        }
    }

    // Восстанавливаем таблицу
    clearTable(idTable); // Очищаем таблицу
    createTable(data, idTable); // Заново создаем таблицу с исходными данными
};