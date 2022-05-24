import { Button } from '../Button';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';

afterEach(cleanup);

it("rendering without crash", () => {
	render(<Button name = "ClickButton"></Button>)
	expect(screen.getByTestId('Button')).toHaveTextContent("ClickButton") // the correct one
	//expect(getByTestId('Button')).toHaveTextContent("ClickButton2") // on purpose created an error
})

it('Correctly change text on button on click', () => {
	render(<Button name = "ClickButton"></Button>)
	const button = screen.getByTestId('Button');
	fireEvent.click(button)
	expect(button).toHaveTextContent("Hello ClickButton");
})