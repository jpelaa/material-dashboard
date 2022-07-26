import { Box, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { FONT_FAMILIES } from 'src/static/styles';

const Header = ({ children }) => {
	return (
		<Typography
			variant='subtitle1'
			sx={{
				fontWeight: 'bold',
				fontSize: '0.9rem',
				fontFamily: FONT_FAMILIES.gilroy,
			}}
			component='div'
		>
			{children}
		</Typography>
	);
};

const Content = ({ children }) => {
	return (
		<Typography
			variant='body2'
			component='div'
			sx={{ fontSize: '0.7rem', fontFamily: FONT_FAMILIES.gilroy }}
		>
			{children}
		</Typography>
	);
};

const MobileKeyDetails = ({ details }) => {
	return (
		<Box
			sx={{
				width: '100%',
				mb: 2,
				px: 3,
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs>
					<Header>External Booking Ref</Header>
				</Grid>
				<Grid item xs>
					<Header>Booking ID</Header>
				</Grid>
				<Grid item xs>
					<Header>Check-In Date</Header>
				</Grid>
				<Grid item xs>
					<Header>Check-Out Date</Header>
				</Grid>
				<Grid item xs>
					<Header># of Nights</Header>
				</Grid>
				<Grid item xs>
					<Header>Guest Name</Header>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs>
					<Content>{details.externalBookingRefId}</Content>
				</Grid>
				<Grid item xs>
					<Content>{details.reservationId}</Content>
				</Grid>
				<Grid item xs>
					<Content>{format(details.checkInDate, 'dd/MM/yyyy')}</Content>
				</Grid>
				<Grid item xs>
					<Content>{format(details.checkOutDate, 'dd/MM/yyyy')}</Content>
				</Grid>
				<Grid item xs>
					<Content>{details.noOfNights}</Content>
				</Grid>
				<Grid item xs>
					<Content>{`${details.salutation}.${details.firstName} ${details.lastName}`}</Content>
				</Grid>
			</Grid>
		</Box>
	);
};

export default MobileKeyDetails;
