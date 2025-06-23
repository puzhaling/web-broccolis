import { useState } from "react";

const List = (props) => {

	const [buttonClicks, setButtonClicks] = useState(0);

	const handleClick = _ => {
		const newButtonClicks = buttonClicks + 1;
		setButtonClicks(newButtonClicks);
	};

	return (
		<div>
			<ul>
				{
					props.data.map((item, i) => 
					<li key={ i } 
						className={ 
							i < (buttonClicks === 0 ? props.n : (buttonClicks+1)*props.n )
							? "show" : "hide" 
						}> 
						<p> { item } </p> 
					</li>
				)} 
			</ul>
			
			<input type="button" 
				className={ (buttonClicks+1)*props.n >= props.data.length ? "hide" : "show" }
				onClick={ handleClick } 
				value="Показать еще"
			></input>
		</div>
	);
}

export default List;
