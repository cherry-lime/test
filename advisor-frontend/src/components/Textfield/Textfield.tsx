import { TextField, createTheme, ThemeProvider } from '@mui/material';

type Message = {bodytext2: string};

const theme = createTheme({
	palette: {
	  secondary: {
		main: "#ff6200",
	  },
	},
  })

function TextfieldRead({bodytext2}:Message){
	return (
		<ThemeProvider theme = {theme}>
			<TextField
			sx = {{
				backgroundColor: 'white',
				width: '50ch'
			}}
			variant = 'outlined'
			color='secondary'
			placeholder={bodytext2}
			multiline
			rows={5}
			maxRows={10}
			InputProps = {{readOnly:true}}/>
		</ThemeProvider>

	)
}

export default TextfieldRead;