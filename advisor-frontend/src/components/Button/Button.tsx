import { useState } from "react";
import "./Button.css";

type Message = { name: string };

function Button({ name }: Message) {
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

export default Button;
