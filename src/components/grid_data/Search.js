import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack
} from '@mui/material';
import { FilterList, Refresh, SearchRounded } from '@mui/icons-material';
import debouce from 'lodash.debounce';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

const sorts = [
  { id: 'expire', name: 'Expire' },
  { id: 'used-traffic-percent', name: 'Used traffic%' },
  { id: 'created', name: 'Created' },
  { id: 'modified', name: 'Modified' },
  { id: 'used-traffic', name: 'Used traffic' },
  { id: 'data-limit', name: 'Data limit' }
];

const Search = (props) => {
  const { setSearch, refresh, showFilter, search, sortItem } = props;
  const [sort, setSort] = useState(true);

  const handleChange = useCallback(
    (name, e) => {
      setSearch((prev) => ({ ...prev, [name]: e.target.value }));
    },
    [setSearch]
  );

  const handleSort = () => {
    setSort((res) => {
      setSearch((prev) => ({ ...prev, ASC: !res }));
      return !res;
    });
  };

  const debouncedResults = useMemo(() => debouce(handleChange, 300), [handleChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Box display={'flex'} alignItems="center">
        <FormControl variant="outlined" sx={{ m: 0.5 }}>
          <OutlinedInput
            type="text"
            name="q"
            size="small"
            fullWidth
            color="primary"
            placeholder="Search..."
            onChange={(e) => debouncedResults('q', e)}
            id="search"
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <InputLabel id="sort">Sort</InputLabel>
          <Select
            fullWidth
            labelId="sort"
            id="sort"
            label="Sort"
            size="small"
            value={search.sort}
            onChange={(e) => debouncedResults('sort', e)}
          >
            {sortItem.map(({ id, name }, idx) => (
              <MenuItem key={idx} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={handleSort}>
          <SortByAlphaIcon color={sort ? 'primary' : 'inherit'} />
        </IconButton>
      </Box>
      <Box display={'flex'}>
        <IconButton onClick={refresh}>
          <Refresh />
        </IconButton>
        {showFilter && (
          <IconButton onClick={showFilter}>
            <FilterList />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

Search.defaultProps = {
  sortItem: sorts
};
export default memo(Search);
