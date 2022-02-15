import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        찾을수가 없어요.
      </Typography>
      <Typography variant="body2" align="center">
        입력하신 &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>에 대한 <br/>내용이 없어요. 
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2">검색하실 내용과 엔터를 눌러주세요.</Typography>
  );
}
