import {render, cleanup} from '@testing-library/react';
import PageCard from '../PageCard';

afterEach(cleanup);

it("Rendering without crash and check title and text on card", () => {
  const {getByText} = render(<PageCard bodytext3="lorem ipsum"/>);
  expect(getByText("lorem ipsum")).toBeInTheDocument();
  expect(getByText("Individual Evaluation")).toBeInTheDocument();
});