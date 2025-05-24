import { useState } from "react";

const PageNumsRow = (props) => {
    const [n, changeN] = useState(props.N);

    const pages = arr.map((item, index) =>
        <span key={ index } className="pageNum" onClick={ props.pageSwitcher }> { item } </span>
    );
}

import default PagesNumRow;
