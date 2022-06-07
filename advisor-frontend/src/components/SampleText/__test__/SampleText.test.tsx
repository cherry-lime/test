import { render, screen } from "@testing-library/react";
import Greetings from "../SampleText";

describe("when rendered with a message as a prop", () => {
  it("should paste into the message text", () => {
    render(<Greetings name="Test Name" />);
    expect(
      screen.getByText("Hello", { exact: false })
      // screen.getByText(/Hello Test Name!/),
    ).toBeInTheDocument();
  });
});
