import {
  render, cleanup, screen, fireEvent,
} from '@testing-library/react';
import Button from '../Button';

afterEach(cleanup);

it('rendering without crash', () => {
  render(<Button name="ClickButton" />);
  expect(screen.getByTestId('Button')).toHaveTextContent('ClickButton'); // the correct one
  // expect(getByTestId('Button')).toHaveTextContent("ClickButton2") // on purpose created an error
});

it('Prints the message to console', () => {
  render(<Button name="ClickButton" />);
  const button = screen.getByTestId('Button');
  fireEvent.click(button);
  expect(button).toHaveTextContent('Hello ClickButton');
});
