import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";

const Header = ({ children }) => {
    return <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} component="div" >
        {children}
    </Typography>;
}

const Content = ({ children }) => {
    return <Typography variant="body2" component="div">
        {children}
    </Typography>;
}

const MobileKeyDetails = ({ details }) => {
    return (
        <Box sx={{
            width: "100%",
            mb: 0.5,
            px: 3
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
                <Grid item xs><Content>{details.externalBookingRefId}</Content></Grid>
                <Grid item xs><Content>{details.reservationId}</Content></Grid>
                <Grid item xs><Content>{format(details.checkInDate, "dd/MM/yyyy")}</Content></Grid>
                <Grid item xs><Content>{format(details.checkOutDate, "dd/MM/yyyy")}</Content></Grid>
                <Grid item xs><Content>{details.noOfNights}</Content></Grid>
                <Grid item xs><Content>{`${details.salutation}.${details.firstName} ${details.lastName}`}</Content></Grid>
                <Grid item xs><Content>{details.roomNo}</Content></Grid>
            </Grid>
        </Box>
    );
}

export default MobileKeyDetails;
