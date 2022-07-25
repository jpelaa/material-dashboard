import {
  Button,
  TextField,
  InputAdornment,
  SvgIcon, Typography, Grid, FormGroup, FormControlLabel, Switch, IconButton, Stack
} from '@mui/material';
import { Close, FilterList, Search } from '@mui/icons-material';
import { MOBILE_KEY_STATUS_TABLE_HEADER } from 'src/static/constants';

const FilterGrid = ({ filters, handleIndividualFilterChange }) => {
  return <Grid container sx={{ mt: 1 }} spacing={2} alignItems="center">
    {MOBILE_KEY_STATUS_TABLE_HEADER.filter(data => data.filterEnabled).map((data) => {
      return <Grid key={data.id} item xs={3}>
        <TextField
          placeholder={`search ${data.label}`}
          id="filled-start-adornment"
          size="small"
          value={filters[data.id] || ''}
          onChange={(event) => handleIndividualFilterChange({ id: data.id, value: event.target.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <IconButton
                size='small'
                aria-label={`search ${data.id}`}
              >
                <FilterList sx={{ fontSize: "1.15rem" }} />
              </IconButton>
            </InputAdornment>,
            endAdornment: <InputAdornment position="start">
              <IconButton
                size='small'
                aria-label={`search ${data.id}`}
                onClick={() => handleIndividualFilterChange({ id: data.id, value: undefined })}
              >
                <Close sx={{ fontSize: "1rem" }} />
              </IconButton>
            </InputAdornment>
          }}
          variant="standard"
        />
      </Grid>
    })}
  </Grid>
}

export const CustomerListToolbar = (props) => {
  const { enableFilter, handleFilterChange, commonFilterValue, handleCommonFilterValueChange, handleReset, filters, handleIndividualFilterChange } = props;


  return <>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <Typography
          sx={{ m: 1 }}
          variant="h5"
        >
          Mobile Key Status List
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          sx={{
            fontFamily: 'Gilroy',
          }}
          fullWidth
          size='small'
          disabled={enableFilter}
          value={commonFilterValue}
          onChange={handleCommonFilterValueChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <Search />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <Stack direction="row" justifyContent="center"
          alignItems="center" >
          <FormGroup >
            <FormControlLabel control={<Switch size='small' inputProps={{ 'aria-label': 'controlled' }} value={enableFilter} onChange={handleFilterChange} />} label="Enable Filter" />
          </FormGroup>
          <Button sx={{
            fontFamily: 'Gilroy',
          }} variant="contained" size='small' onClick={handleReset} >reset</Button>
        </Stack>

      </Grid>
    </Grid>
    {/* {enableFilter ? <FilterGrid filters={filters} handleIndividualFilterChange={handleIndividualFilterChange} /> : null} */}
  </>
};
