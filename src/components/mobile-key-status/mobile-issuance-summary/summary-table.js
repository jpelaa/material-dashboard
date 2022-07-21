import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "date-fns";
import { MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER } from "src/static/constants";
import { formatDDMMMYYYY } from "src/utils/date";

const SummaryTable = ({ rows = [] }) => {
    return (
        <Paper elevation={12} variant="outlined">
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.values(MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER).map((data) => {
                                return <TableCell key={data}>{data}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    {row.email}
                                </TableCell>
                                <TableCell >{row.guestType}</TableCell>
                                <TableCell >{formatDDMMMYYYY(row.requestedOn)}</TableCell>
                                <TableCell >{row.requestStatus}</TableCell>
                                <TableCell >{formatDDMMMYYYY(row.responseDateTime)}</TableCell>
                                <TableCell >{row.responseBy}</TableCell>
                                <TableCell >{row.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default SummaryTable;
