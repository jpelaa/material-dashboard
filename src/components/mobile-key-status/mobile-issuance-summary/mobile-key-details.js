import { Grid } from "@mui/material";

const MobileKeyDetails = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid>External Booking Ref</Grid>
                <Grid>Booking ID</Grid>
                <Grid>Check-In Date</Grid>
                <Grid>Check-Out Date</Grid>
                <Grid># of Nights</Grid>
                <Grid>Guest Name</Grid>
                <Grid>Room Number</Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid></Grid>
                <Grid></Grid>
                <Grid></Grid>
                <Grid></Grid>
                <Grid></Grid>
                <Grid></Grid>
                <Grid></Grid>

            </Grid>
        </Grid>
    );
}

export default MobileKeyDetails;
