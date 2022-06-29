/*
This is an example file that prints hello followed with name
This is a file that should be deleted in the end together with the SampleText folder,
similar to ExampleButton folder
*/
type Message = { name: string };

function Greetings({ name }: Message) {
  return (
    <div>
      <p>
        {"Hello "}
        {name}!
      </p>
    </div>
  );
}

export default Greetings;
