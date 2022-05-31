import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
	palette: {
	  secondary: {
		main: "#ff6200",
	  },
	},
  })

type Message = { name: string };

function ButtonRegular({name}:Message) {
	return (
		<ThemeProvider theme = {theme}>
			<div>
				<Button variant = 'contained' color = 'secondary' style = {{fontWeight: '600'}}
				onClick = {() => {
					alert('Clicked');
				}}
				>{name}</Button> 
			</div>
		</ThemeProvider>
	)
}

export default ButtonRegular;