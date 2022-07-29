import {
	AppBar,
	Dialog,
	DialogContent,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import MobileKeyDetails from './mobile-key-details';
import SummaryTable from './summary-table';

const MobileIssuanceSummary = ({
	roomNumber,
	details,
	userDetails,
	open,
	handleClose,
	scroll = 'paper',
}) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll={scroll}
			aria-labelledby='scroll-dialog-title'
			aria-describedby='scroll-dialog-description'
			maxWidth='lg'
		>
			<AppBar sx={{ position: 'relative', backgroundColor: 'secondary.main' }}>
				<Toolbar>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Mobile Key Issuance Summary (Room Number : {roomNumber})
					</Typography>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleClose}
						aria-label='close'
					>
						<Close />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogContent dividers={scroll === 'paper'}>
				<MobileKeyDetails details={details} />
				<SummaryTable rows={userDetails} />
			</DialogContent>
		</Dialog>
	);
};

export default MobileIssuanceSummary;
