type Message = {
	name: string;
};

export const Greetings = ({ 
	name
}: Message) => {
	return (
		<div>
			<p>Hello {name}!</p>
		</div>
		);
	};