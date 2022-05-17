import React from 'react';
import './Button.css';

type Message = {
	name: string;
  };
  
  export const Button = ({ 
	name
  }: Message) => {
	return (
	  <div data-testid = "Button" className = "Button-style">
		  <p>{name}</p>
	  </div>
	);
  };
