import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, Grid, FormGroup, FormControlLabel, Switch, IconButton
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { Close, FilterList, Search } from '@mui/icons-material';
import { MOBILE_KEY_STATUS_TABLE_HEADER } from 'src/static/constants';

const FilterGrid = () => {
  return <Grid container spacing={2} alignItems="center">
    {MOBILE_KEY_STATUS_TABLE_HEADER.filter(data => data.filterEnabled).map((data) => {
      return <Grid key={data.id} item xs={3}>
        <TextField
          placeholder={`search ${data.label}`}
          id="filled-start-adornment"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <IconButton
                size='small'
                aria-label={`search ${data.id}`}
                onClick={() => { }}
              >
                <FilterList sx={{ fontSize: "1.15rem" }} />
              </IconButton>
            </InputAdornment>,
            endAdornment: <InputAdornment position="start">
              <IconButton
                size='small'
                aria-label={`search ${data.id}`}
                onClick={() => { }}
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
  const { enableFilter, handleFilterChange } = props;

  return <>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Typography
          sx={{ m: 1 }}
          variant="h5"
        >
          Mobile Key Status List
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}>
        <FormGroup>
          <FormControlLabel control={<Switch size='small' inputProps={{ 'aria-label': 'controlled' }} value={enableFilter} onChange={handleFilterChange} />} label="Enable Filter" />
        </FormGroup>
      </Grid>
    </Grid>
    {enableFilter ? <FilterGrid /> : null}
  </>
};
