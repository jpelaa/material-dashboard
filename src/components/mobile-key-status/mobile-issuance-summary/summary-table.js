import styled from "@emotion/styled";
import { CheckCircle } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, FormControlLabel, IconButton, Link, Paper, Popover, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography, useRadioGroup } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER, REQUESTED_STATUS_COLORS_BY_KEY, STATUS_TEXT, TRANSITION_LIST_BY_KEY } from "src/static/constants";
import { formatYYYYMMDDWith12hoursAMPM } from "src/utils/date";
import { useTheme } from '@mui/material/styles';


const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
};


const SummaryTable = ({ rows = [] }) => {

    const [selectedId, setSelectedId] = useState('');
    const [shouldShowChange, setShowChange] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [display, setDisplay] = useState(false);

    const [transitionList, setTransitionList] = useState([])

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();


    const open = Boolean(anchorEl);

    const handleReset = () => {

    };

    const handleSubmitStatus = () => {

    }

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );



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
                                    {!row.requestStatus ?
                                        <Stack direction="row" justifyContent="center" spacing={1}
                                            alignItems="center">
                                            <Button variant="contained" color="success" size='small' onClick={() => { }} >Approve</Button>
                                            <Button variant="contained" color="error" size='small' onClick={() => { }} >Reject</Button>
                                        </Stack>
                                        : <> <Typography variant="body2" sx={{ fontFamily: 'Gilroy' }}>{row.requestStatus}
                                            <Link sx={{
                                                cursor: "pointer"
                                            }} onClick={(event) => {
                                                setShowChange(true);
                                                setSelectedId(row.id);
                                                setTransitionList(TRANSITION_LIST_BY_KEY[row.requestStatus.toLowerCase()])
                                                setAnchorEl(event.currentTarget);
                                            }}>(change)</Link>
                                        </Typography>
                                            <Popover
                                                id={row.id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <Box sx={{ minWidth: 275, p: 1, backgroundColor: 'neutral.100' }}>
                                                    <Typography variant="h5" component="div">
                                                        Change Status
                                                    </Typography>
                                                    <Card sx={{ mx: 1 }}>
                                                        <CardContent>
                                                            <Typography sx={{ fontSize: '1rem' }} color="text.secondary" gutterBottom>
                                                                Current Status
                                                            </Typography>
                                                            <Box sx={{ textAlign: 'center' }}>
                                                                <Typography sx={{
                                                                    width: '50%',
                                                                    px: 0.75,
                                                                    py: 0.5,
                                                                    color: `${REQUESTED_STATUS_COLORS_BY_KEY[row.requestStatus.toLowerCase()]}.main`,
                                                                    backgroundColor: `${REQUESTED_STATUS_COLORS_BY_KEY[row.requestStatus.toLowerCase()]}.light`
                                                                }} >
                                                                    {row.requestStatus}
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                    {transitionList.map((data) => {
                                                        return <Box
                                                            onMouseLeave={() => { setDisplay(false) }} onMouseEnter={() => { setDisplay(true) }}
                                                            key={data} sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-around',
                                                                cursor: 'pointer',
                                                                alignItems: 'center',
                                                                px: 0.5,
                                                                py: 1,
                                                                m: 1,
                                                                '&:hover': {
                                                                    color: `${REQUESTED_STATUS_COLORS_BY_KEY[data]}.main`,
                                                                    backgroundColor: `${REQUESTED_STATUS_COLORS_BY_KEY[data]}.light`,
                                                                }
                                                            }}>
                                                            <Box>
                                                                {STATUS_TEXT[data]}
                                                            </Box>
                                                            <IconButton sx={{ border: `1px solid ${theme.palette.neutral[500]}`, padding: 0 }} size="small">
                                                                <CheckCircle sx={{ visibility: display ? 'inherit' : 'hidden', color: `${REQUESTED_STATUS_COLORS_BY_KEY[data]}.main` }} />
                                                            </IconButton>
                                                        </Box>
                                                    })}
                                                    <Box sx={{ width: "100%", px: 0.5 }}>
                                                        <Button sx={{ width: "50%" }} onClick={handleReset}>Cancel</Button>
                                                        <Button sx={{ width: "50%" }} onClick={handleSubmitStatus} variant="contained">Done</Button>
                                                    </Box>
                                                </Box>
                                            </Popover>
                                        </>}
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
