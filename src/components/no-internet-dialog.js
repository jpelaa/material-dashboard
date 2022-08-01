import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	DialogContentText,
} from '@mui/material';
import { WifiOff } from '@mui/icons-material';

const NoInternet = ({ isOffline }) => {
	return (
		<Dialog
			open={isOffline}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title' sx={{ textAlign: 'center' }}>
        No Connection
			</DialogTitle>
			<DialogContent sx={{ mx: 2, my: 4, textAlign: 'center' }}>
				<IconButton>
					<WifiOff fontSize='large' />
				</IconButton>
				<DialogContentText sx={{}} id='alert-dialog-description'>
          Please check your internet connection and try again
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default NoInternet;
