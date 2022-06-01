import { TextField, createTheme, ThemeProvider, makeStyles  } from '@mui/material'

type Message = { message2: string };

const theme = createTheme({
	palette: {
	  secondary: {
		main: "#ff6200",
	  },
	},
  })

function TextfieldRead({message2}:Message){
	return (
		<ThemeProvider theme = {theme}>
			<TextField
			sx = {{
				backgroundColor: 'white'
			}}
			label = {message2} variant = 'filled' size = 'small' color = 'secondary' InputProps = {{readOnly: true}}/>
		</ThemeProvider>
	)
}

export default TextfieldRead;