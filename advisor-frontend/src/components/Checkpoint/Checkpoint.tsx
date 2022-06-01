import React, { useState } from 'react'
import { createTheme, ThemeProvider, Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import {grey} from '@mui/material/colors'

const theme = createTheme({
	palette: {
		primary: {
		main: grey[900],
		},
	  	secondary: {
		main: "#ff6200",
	  },
	},
  })

type Message = { description: string };

function Checkpoint({description}:Message) {
	const [value, setValue] = useState('') 
	console.log({value})
	const doSomething = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}
	return (
		<ThemeProvider theme = {theme}>
			<Box color = 'primary'>
			<FormControl>
				<FormLabel id = 'checkpointnamelabel' color = 'primary'>
					<p>
					{description}
					</p>
				</FormLabel>
				<RadioGroup name = 'checkpointname' aria-labelledby='checkpointnamelabel' value = {value} onChange = {doSomething} row>
					<FormControlLabel control = {<Radio color = 'secondary' />} label = 'Yes' value = 'Yes' /> 
					<FormControlLabel control = {<Radio color = 'secondary' />} label = 'No' value = 'No' />
					<FormControlLabel control = {<Radio color = 'secondary' />} label = 'N/A' value = 'N/A' />
				</RadioGroup>
			</FormControl>
			</Box>
		</ThemeProvider>
	)
}

export default Checkpoint; 