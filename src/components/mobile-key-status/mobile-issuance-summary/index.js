import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { mobileKeyIssuanceSummary } from "src/__mocks__/mobile_key_issuance_summary";
import MobileKeyDetails from "./mobile-key-details";
import SummaryTable from "./summary-table";

const MobileIssuanceSummary = ({ roomNo, details, open, handleClose, scroll = "paper" }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="md"
        >
            <DialogTitle id="scroll-dialog-title">Mobile Key Issuance Summary( Room Number : {roomNo}) </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <MobileKeyDetails details={details} />
                <SummaryTable rows={mobileKeyIssuanceSummary} />
            </DialogContent>
        </Dialog>
    );
}

export default MobileIssuanceSummary;
