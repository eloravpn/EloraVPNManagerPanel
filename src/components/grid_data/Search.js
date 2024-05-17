import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import {
  ArrowDownward,
  ArrowUpward,
  FilterList,
  Refresh,
  SearchRounded
} from '@mui/icons-material';
import debouce from 'lodash.debounce';
import Tabs from 'components/tabs';

const sorts = [
  { id: 'expire', name: 'Expire' },
  { id: 'used-traffic-percent', name: 'Used traffic%' },
  { id: 'created', name: 'Created' },
  { id: 'modified', name: 'Modified' },
  { id: 'used-traffic', name: 'Used traffic' },
  { id: 'data-limit', name: 'Data limit' }
];

const Search = (props) => {
  const {
    setSearch,
    refresh,
    showFilter,
    search,
    sortItem = sorts,
    tabs,
    tabsName,
    filters,
    setFilters
  } = props;

  const handleChange = useCallback(
    (name, e) => {
      setSearch((prev) => ({ ...prev, [name]: e.target.value }));
    },
    [setSearch]
  );

  const handleSort = () => {
    setSearch((prev) => ({ ...prev, ASC: !prev?.ASC }));
  };

  const debouncedResults = useMemo(() => debouce(handleChange, 300), [handleChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  const handleChangeTabs = (e, value) => {
    setFilters((res) => ({ ...res, [e.target.name]: value }));
  };

  return (
    <Grid container spacing={0}>
      {tabs && (
        <Grid item xs={12}>
          <Box my={1} width={'100%'}>
            <Tabs
              name={tabsName}
              tabs={tabs}
              onChange={handleChangeTabs}
              value={filters[tabsName]}
            />
            <Divider />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={9}>
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
            {search.ASC ? <ArrowUpward color="primary" /> : <ArrowDownward color="primary" />}
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
          <IconButton onClick={refresh}>
            <Refresh />
          </IconButton>
          {showFilter && (
            <IconButton onClick={showFilter}>
              <FilterList />
            </IconButton>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(Search);
