import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
	palette: {
	  secondary: {
		main: "#ff6200",
	  },
	},
  })

type Message = { name2: string };

function ButtonInverted({name2}:Message) {
	return (
		<ThemeProvider theme = {theme}>
			<div>
				<Button variant = 'outlined' color = 'secondary' style = {{fontWeight: '600'}}
				onClick = {() => {
					alert('Clicked');
				}}
				>{name2} </Button> 
			</div>
		</ThemeProvider>
	)
}

export default ButtonInverted;