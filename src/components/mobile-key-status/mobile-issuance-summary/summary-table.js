import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "date-fns";
import { MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER } from "src/static/constants";
import { formatYYYYMMDDHHMM } from "src/utils/date";

const SummaryTable = ({ rows = [] }) => {
    return (
        <Paper elevation={12} variant="outlined">
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER.map(({ label, id }) => {
                                return <TableCell key={id}>{label}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell sx={{
                                    width: "5%"
                                }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={{
                                    width: "16%"
                                }}>
                                    {row.email}
                                </TableCell>
                                <TableCell sx={{
                                    width: "10%"
                                }}>{row.guestType}</TableCell>
                                <TableCell sx={{
                                    width: "14%"
                                }}>{formatYYYYMMDDHHMM(row.requestedOn)}</TableCell>
                                <TableCell sx={{
                                    width: "10%"
                                }}>{row.requestStatus}</TableCell>
                                <TableCell sx={{
                                    width: "14%"
                                }}>{formatYYYYMMDDHHMM(row.responseDateTime)}</TableCell>
                                <TableCell sx={{
                                    width: "10%"
                                }}>{row.responseBy}</TableCell>
                                <TableCell sx={{
                                    width: "21%"
                                }}>{row.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default SummaryTable;
