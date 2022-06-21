import Card from "@mui/material/Card";
import { Stack, Tabs, Tab } from "@mui/material";
import React from "react";

/*
Type of the ButtonViewProps that contains a string of text as title
*/
type ButtonViewProps = {
  title: string;
  tabstring: string[];
};

/*
Function that displays a pagecard component consisting of title with buttons stacked horizontally
*/
export default function ButtonView({ title, tabstring }: ButtonViewProps) {
  const [value, setValue] = React.useState(tabstring[0]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card
      sx={{
        backgroundColor: "white",
        width: "20vw",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        {title}
        <Tabs value={value} onChange={handleChange} textColor="primary">
          <Tab value={tabstring[0]} label={tabstring[0]} />
          <Tab value={tabstring[1]} label={tabstring[1]} />
        </Tabs>
      </Stack>
    </Card>
  );
}
