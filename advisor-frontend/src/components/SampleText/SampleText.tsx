type Message = { name: string };

function Greetings({ name }: Message) {
  return (
    <div>
      <p>
        Hello
        {name}!
      </p>
    </div>
  );
}

export default Greetings;
