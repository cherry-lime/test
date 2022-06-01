import { TextField, createTheme, ThemeProvider, makeStyles  } from '@mui/material'
import { useState } from 'react'

type Message = { message: string };

const theme = createTheme({
	palette: {
	  secondary: {
		main: "#ff6200",
	  },
	},
  })

function TextfieldEdit({message}:Message){
	const [value, setValue] = useState('') 
	console.log({value})
	const doSomething = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}
	return (
		<ThemeProvider theme = {theme}>
			<TextField 
			sx = {{
				backgroundColor: 'white'
			}}
			label = {message} variant = 'filled' size = 'small' color = 'secondary' value = {value} onChange = {doSomething}/>
		</ThemeProvider>
	)
}

export default TextfieldEdit;