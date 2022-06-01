import {Box} from '@mui/material'

export const Textbox = () =>  {
	return (
		<Box
			sx = {{
				backgroundColor: 'white',
				color: 'orange',
				height: '100px',
				width: '100px',
				padding: '16px',
				'&:hover': {
					backgroundColor: 'whitesmoke',
				},
			}}
		>
			Title of Textbox
		</Box>
	)
}

export default Textbox;