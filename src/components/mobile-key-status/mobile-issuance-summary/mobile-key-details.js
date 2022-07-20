import { Box, Grid } from "@mui/material";
import { format } from "date-fns";

const MobileKeyDetails = ({ details }) => {
    return (
        <Box sx={{
            width: "100%"
        }}
        >
            <Grid container spacing={2}>
                <Grid item xs>External Booking Ref</Grid>
                <Grid item xs>Booking ID</Grid>
                <Grid item xs>Check-In Date</Grid>
                <Grid item xs>Check-Out Date</Grid>
                <Grid item xs># of Nights</Grid>
                <Grid item xs>Guest Name</Grid>
                <Grid item xs>Room Number</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>{details.externalBookingRefId}</Grid>
                <Grid item xs>{details.reservationId}</Grid>
                <Grid item xs>{format(details.checkInDate, "dd/MM/yyyy")}</Grid>
                <Grid item xs>{format(details.checkOutDate, "dd/MM/yyyy")}</Grid>
                <Grid item xs>{details.noOfNights}</Grid>
                <Grid item xs>{`${details.salutation}.${details.firstName} ${details.lastName}`}</Grid>
                <Grid item xs>{details.roomNo}</Grid>

            </Grid>
        </Box>
    );
}

export default MobileKeyDetails;
