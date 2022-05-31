import Sidebar from '../Sidebar';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';

afterEach(cleanup);

it("rendering without crash", () => {
	render(<Sidebar/>)
	expect(screen.getByTestId('Sidebar')).toHaveTextContent("Home")
	expect(screen.getByTestId('Sidebar')).toHaveTextContent("Evaluations")
	expect(screen.getByTestId('Sidebar')).toHaveTextContent("Teams")
	expect(screen.getByTestId('Sidebar')).toHaveTextContent("Settings")
	expect(screen.getByTestId('Sidebar')).toHaveTextContent("Sign Out") // the correct one
	//expect(screen.getByTestId('Sidebar')).toHaveTextContent("ClickButton2") // on purpose created an error
})