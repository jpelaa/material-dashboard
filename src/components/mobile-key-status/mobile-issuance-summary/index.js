import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MobileKeyDetails from "./mobile-key-details";
import SummaryTable from "./summary-table";

const MobileIssuanceSummary = ({ }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Mobile Key Issuance Summary( Room Number : { }) </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <MobileKeyDetails />
                <SummaryTable rows={[]} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MobileIssuanceSummary;
