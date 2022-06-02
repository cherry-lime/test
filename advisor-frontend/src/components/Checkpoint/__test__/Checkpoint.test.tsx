import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Checkpoint from "../Checkpoint";

afterEach(cleanup);

it('The checkpoint renders and buttons are checked in sequences 123 132 213 231 321 and 312 with 1=Yes, 2=No and 3=N/A', () => {

const {getByText} = render(<Checkpoint description="testcheckpointtitle"/>);
expect(getByText("testcheckpointtitle")).toBeInTheDocument();

const radio1 = screen.getByLabelText('Yes'); 
const radio2 = screen.getByLabelText('No');
const radio3 = screen.getByLabelText('N/A'); 

function alloff(){
	expect(radio1).not.toBeChecked();
	expect(radio2).not.toBeChecked();
	expect(radio3).not.toBeChecked();
}

function clickradio1(){
	fireEvent.click(radio1);
	expect(radio1).toBeChecked();
	expect(radio2).not.toBeChecked();
	expect(radio3).not.toBeChecked();
}

function clickradio2(){
	fireEvent.click(radio2);
	expect(radio1).not.toBeChecked();
	expect(radio2).toBeChecked();
	expect(radio3).not.toBeChecked();
}

function clickradio3(){
	fireEvent.click(radio3);
	expect(radio1).not.toBeChecked();
	expect(radio2).not.toBeChecked();
	expect(radio3).toBeChecked();
}
	alloff(); 
	clickradio1(); clickradio2(); clickradio3(); 
	clickradio1(); clickradio3(); clickradio2();
	clickradio2(); clickradio1(); clickradio3();
	clickradio2(); clickradio3(); clickradio1();
	clickradio3(); clickradio2(); clickradio1();
	clickradio3(); clickradio1(); clickradio2();

});