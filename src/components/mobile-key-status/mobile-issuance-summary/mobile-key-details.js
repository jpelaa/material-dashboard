import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";

const Header = ({ children }) => {
    return <Typography variant="h6" component="h6">
        {children}
    </Typography>;
}

const MobileKeyDetails = ({ details }) => {
    return (
        <Box sx={{
            width: "100%"
        }}
        >
            <Grid container spacing={2}>
                <Grid item xs><Header>External Booking Ref</Header></Grid>
                <Grid item xs><Header>Booking ID</Header></Grid>
                <Grid item xs><Header>Check-In Date</Header></Grid>
                <Grid item xs><Header>Check-Out Date</Header></Grid>
                <Grid item xs><Header># of Nights</Header></Grid>
                <Grid item xs><Header>Guest Name</Header></Grid>
                <Grid item xs><Header>Room Number</Header></Grid>
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
