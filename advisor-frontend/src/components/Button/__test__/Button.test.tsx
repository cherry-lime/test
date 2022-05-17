import React from 'react';
import {Button} from '../Button';
import { render, cleanup } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import {act} from 'react-dom/test-utils';

afterEach(cleanup);

it("rendering without crash", () => {
	const div = document.createElement("div");
	act(() => {
		const root = createRoot(div!);
		root.render(<Button name = "ClickButton"></Button>);
	});
	const {getByTestId} = render(<Button name = "ClickButton"></Button>)
	expect(getByTestId('Button')).toHaveTextContent("ClickButton") // the correct one
	//expect(getByTestId('Button')).toHaveTextContent("ClickButton2") // on purpose created an error
})