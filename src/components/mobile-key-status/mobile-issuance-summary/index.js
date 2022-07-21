import { AppBar, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from "@mui/material";
import { Close } from "@mui/icons-material"
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
            <AppBar sx={{ position: 'relative', backgroundColor: "secondary.main" }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Mobile Key Issuance Summary (Room Number : {roomNo})
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent dividers={scroll === 'paper'}>
                <MobileKeyDetails details={details} />
                <SummaryTable rows={mobileKeyIssuanceSummary} />
            </DialogContent>
        </Dialog>
    );
}

export default MobileIssuanceSummary;
