import { Button, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";
import { MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER } from "src/static/constants";
import { formatYYYYMMDDWith12hoursAMPM } from "src/utils/date";

const SummaryTable = ({ rows = [] }) => {

    const [selectedId, setSelectedId] = useState('');
    const [shouldShowChange, setShowChange] = useState(false);

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
                                <TableCell
                                    sx={{
                                        width: "4%"
                                    }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        width: "16%"
                                    }}>
                                    {row.email}
                                </TableCell>
                                <TableCell sx={{
                                    width: "7%"
                                }}>{row.guestType}</TableCell>
                                <TableCell sx={{
                                    width: "14%"
                                }}>{formatYYYYMMDDWith12hoursAMPM(row.requestedOn)}</TableCell>
                                <TableCell sx={{
                                    width: "12%"
                                }}>
                                    {shouldShowChange && row.id === selectedId ?
                                        <Stack direction="row" justifyContent="center" spacing={1}
                                            alignItems="center">
                                            <Button variant="contained" color="success" size='small' onClick={() => { }} >Approve</Button>
                                            <Button variant="contained" color="error" size='small' onClick={() => { }} >Reject</Button>
                                        </Stack>
                                        : <Typography variant="body2" sx={{ fontFamily: 'Gilroy' }}>{row.requestStatus}
                                            <Link sx={{
                                                cursor: "pointer"
                                            }} onClick={() => {
                                                setShowChange(true);
                                                setSelectedId(row.id)
                                            }}>(change)</Link>
                                        </Typography>}
                                </TableCell>
                                <TableCell sx={{
                                    width: "14%"
                                }}>{formatYYYYMMDDWith12hoursAMPM(row.responseDateTime)}</TableCell>
                                <TableCell sx={{
                                    width: "9%"
                                }}>{row.responseBy}</TableCell>
                                <TableCell sx={{
                                    width: "24%"
                                }}>
                                    <TextareaAutosize
                                        aria-label="comment"
                                        placeholder="comments..."
                                        value={row.comment}
                                        style={{ width: 200 }}
                                        onBlur={() => {
                                            console.log("Out focus save comments ")
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default SummaryTable;
