import { useState } from 'react';
import './ExampleButton.css';

type Message = { name: string };

function ExampleButton({ name }: Message) {
  const [text, setText] = useState(name);

  const handleClick = () => {
    setText(`Hello ${name}`);
  };

  return (
    <button
      type="button"
      data-testid="Button"
      className="Button-style"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default ExampleButton;
