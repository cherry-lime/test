import { createTheme } from "@mui/material";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Checkpoint from "../Checkpoint";

//  cleanup after each testcase
afterEach(cleanup);

//  coloring theme aligned with UI design
//  ING orange is ff6200
//  darkgray is 5a534f
//  the labels are darkgrey according style
//  the radio buttons are ING orange according style
const theme = createTheme({
  palette: {
    primary: {
      light: "#FFD6B1", // Light Orange
      main: "#FF6200", // Orange
      dark: "#AA3909", // Dark Orange
    },
    secondary: {
      light: "#EDE6E2", // Light Grey
      main: "#8B817C", // Grey
      dark: "#5A534F", // Dark Grey
    },
    text: {
      secondary: "#5A534F", // Dark Grey
    },
    info: {
      light: "#FAF6F3", // Lightest Grey
      main: "#ffffff", // White color for icons.
    },
    background: {
      default: "#ffffff", // Used to define the custom sidebar text color.
    },
  },
});

//  a checkpoint consists of three radio buttons
//  checking rendering of the radio-buttons
//  checking clicking of the radio button in all possible sequences
//  initially no buttons are active
//  only one button can be clicked at the same time
it("The checkpoint renders and buttons are checked in sequences 123 132 213 231 321 and 312 with 1=Yes, 2=No and 3=N/A", () => {
  const { getByText } = render(
    <Checkpoint
      feedback={false}
      description="Checkpoint Description"
      number={1}
      theme={theme}
      checkpointlabels={["Yes", "No", "N/A"]}
      checkpointvalues={[0, 1, 2]}
      topics={["Ready Work"]}
    />
  );
  expect(getByText("Checkpoint Description")).toBeInTheDocument();

  //  define three radio-buttons with labels Yes, No and N/A
  const radio1 = screen.getByLabelText("Yes");
  const radio2 = screen.getByLabelText("No");
  const radio3 = screen.getByLabelText("N/A");

  //  all buttons are off (initial state)
  function alloff() {
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
  }

  //  click on Yes
  //  result : only radio1 button is checked
  function clickradio1() {
    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
  }

  //  click on No
  //  result : only radio2 button is checked
  function clickradio2() {
    fireEvent.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio2).toBeChecked();
  }

  //  click on N/A
  //  result : only radio3 button is checked
  function clickradio3() {
    fireEvent.click(radio3);
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
  }
  //  all sequences are tested starting with the initial state
  fireEvent.click(radio1);
  alloff();
  clickradio2();
  clickradio3();
  clickradio1();
  clickradio3();
  clickradio2();
  clickradio1();
  clickradio3();
  clickradio2();
  clickradio3();
  clickradio1();
  clickradio3();
  clickradio2();
  clickradio1();
  clickradio3();
  clickradio1();
  clickradio2();
});
