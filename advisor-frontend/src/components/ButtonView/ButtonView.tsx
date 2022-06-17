import Card from "@mui/material/Card";
import { Button, Stack } from "@mui/material";

/*
Type of the ButtonViewProps that contains a string of text as title
*/
type ButtonViewProps = {
  title: string;
};

/*
Function that displays a pagecard component consisting of title with buttons stacked horizontally
*/
export default function ButtonView({ title }: ButtonViewProps) {
  let choice = true;

  function doSomething() {
    choice = !choice;
  }
  return (
    <Card
      sx={{
        backgroundColor: "white",
        width: "15vw",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Button color="secondary" disabled style={{ fontWeight: "600" }}>
          {title}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            doSomething();
          }}
          style={{ fontWeight: "600" }}
        >
          Text1
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            doSomething();
          }}
          style={{ fontWeight: "600" }}
        >
          Text2
        </Button>
      </Stack>
    </Card>
  );
}
