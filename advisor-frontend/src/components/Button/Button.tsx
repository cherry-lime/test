import './Button.css';

type Message = {
	name: string;
};

export const Button = ({ 
	name
}: Message) => {
	
	const handleClick = () => {
		console.log(`Hello ${name}`);
	};
	
	return (
		<button data-testid = "Button" className = "Button-style" onClick={handleClick}>
			{name}
		</button>
		);
	};
	