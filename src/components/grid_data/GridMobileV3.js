import { forwardRef, useCallback, useImperativeHandle, useState, useRef, useEffect } from 'react';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '../menu';
import useFetch from '../useFetch';
import ListLoading from '../list_loading';
import { Box, Stack } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import {
  AddCard,
  ArrowDropDown,
  ArrowDropUp,
  CardGiftcard,
  CurrencyBitcoin,
  MonetizationOn,
  NotInterested,
  Payment,
  ShoppingCart,
  TaskAlt
} from '@mui/icons-material';
import { convertByteToInt, getDayPersian, separateNum } from 'utils';
import Card from 'components/card';
import SearchT from './Search';
import Chip from 'components/chip';
import Progress from 'components/progress';
import dayjs from 'dayjs';
import Grid from 'components/grid';
import Tabs from 'components/tabs';

const GridMobile = forwardRef((props, ref) => {
  const {
    url,
    paginateServ,
    name,
    columns,
    rowActions = [],
    moreActions = [],
    showFilter,
    sortItem,
    defaultSort,
    propsFilter,
    tabsName,
    tabs,
    searchChildren
  } = props;

  const [filters, setFilters] = useState(propsFilter);
  const [search, setSearch] = useState({
    q: null,
    sort: defaultSort ? defaultSort.value : 'expire',
    ASC: defaultSort.ASC
  });

  useImperativeHandle(ref, () => ({
    editRow(row) {
      editRow(row);
    },
    deleteRow(row) {
      deleteRow(row);
    },
    createRow(row) {
      createRow(row);
    },
    filters(filters) {
      setFilters(filters);
    }
  }));
  const [pageNum, setPageNum] = useState(0);

  const { isLoading, data, total, editRow, deleteRow, createRow, refresh, setData } = useFetch(
    url,
    search,
    pageNum,
    paginateServ,
    name,
    filters
  );

  const observer = useRef();
  const menuRef = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (paginateServ) {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && total > data.length) {
            setPageNum(data.length);
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [paginateServ, isLoading, total, data.length]
  );

  const [row, setRow] = useState(null);

  const handleClick = (event, item) => {
    setRow(item);
    menuRef.current?.changeStatus(event);
  };

  const handlePrice = useCallback(({ row }, field) => {
    return separateNum(row[field]);
  }, []);

  const handleDate = useCallback(({ row }, field) => {
    return getDayPersian(row[field]);
  }, []);

  const handleBadge = useCallback(({ row }, field) => {
    return (
      row[field] &&
      row[field].map((i, idx) => (
        <Chip key={idx} label={i.name || i} size="small" color="primary" />
      ))
    );
  }, []);

  const setFullName = useCallback(({ row }, field) => {
    return row[field[0]][field[1]];
  }, []);

  const handleStatus = useCallback(({ row }, field) => {
    return row[field] ? <TaskAlt color="primary" /> : <NotInterested color="error" />;
  }, []);

  const handleMultiBadge = useCallback(({ row }, field) => {
    return JSON.parse(field).map((item, idx) =>
      row[item.name] ? (
        <Chip
          key={idx}
          label={row[item.name] || row[item]}
          size="small"
          color={item.color}
          variant={'filled'}
        />
      ) : null
    );
  }, []);

  const handleProgress = useCallback(({ row }, field) => {
    const value = JSON.parse(field);

    return (
      <Progress
        secondaryLabel={`${convertByteToInt(row[value[0]]).toFixed(
          2
        )}/${convertByteToInt(row[value[2]]).toFixed(0)} GB (${row[value[1]].toFixed(0)}%)`}
        value={row[value[1]]}
      />
    );
  }, []);

  const handleDataLimit = useCallback(({ row }, field) => {
    return convertByteToInt(row[field]).toFixed(2);
  }, []);

  const handleProgressDay = useCallback(({ row }) => {
    var now = dayjs();
    var start = dayjs(row.modified_at);
    var end = dayjs(row.expired_at);
    const dayRemaining = Math.ceil(end.diff(now) / (1000 * 3600 * 24));
    const totalDays = Math.ceil(end.diff(start) / (1000 * 3600 * 24));
    const t = totalDays - dayRemaining;
    const calcPercentUsage = (100 * t) / totalDays;

    return (
      <Progress
        firstLabel={``}
        secondaryLabel={`${dayRemaining || 'Infinity'} / ${getDayPersian(row.expired_at)}`}
        value={dayRemaining > 0 ? calcPercentUsage : 100}
      />
    );
  }, []);

  const handleOrderStatus = useCallback(({ row }, field) => {
    const handleColor = () =>
      (row[field] === 'OPEN' && 'info') ||
      (row[field] === 'PENDING' && 'success') ||
      (row[field] === 'CANCELED' && 'error') ||
      (row[field] === 'PAID' && 'primary') ||
      (row[field] === 'COMPLETED' && 'success') ||
      'primary';
    return <Chip color={handleColor()} label={row[field]} />;
  }, []);

  const getComplexField = useCallback(({ row }, field) => {
    const myArray = field.split('.');
    return row[myArray[0]] && row[myArray[0]][myArray[1]];
  }, []);

  function getTransactionStatus({ row }, field) {
    return (
      <Typography
        display={'flex'}
        alignItems={'center'}
        component={'span'}
        color={+row[field] >= 0 ? 'success' : 'error'}
      >
        {+row[field] >= 0 ? (
          <ArrowDropUp fontSize="large" color="success" />
        ) : (
          <ArrowDropDown fontSize="large" color="error" />
        )}
        {separateNum(row[field])}
      </Typography>
    );
  }

  const getTypeIcon = useCallback(({ row }, field) => {
    if (row[field] === 'BONUS') return <CardGiftcard color="primary" />;
    if (row[field] === 'PAYMENT') return <AddCard color="primary" />;
    if (row[field] === 'ORDER') return <ShoppingCart color="primary" />;
    if (row[field] === 'MONEY_ORDER') return <MonetizationOn color="primary" />;
    if (row[field] === 'ONLINE') return <Payment color="primary" />;
    if (row[field] === 'CRYPTOCURRENCIES') return <CurrencyBitcoin color="primary" />;
  }, []);

  const renderHtml = useCallback(
    ({ row }, field) => <div dangerouslySetInnerHTML={{ __html: row[field] }} />,
    []
  );

  function totalPrice({ row }, field) {
    return separateNum(row[field] - row.total_discount_amount);
  }

  function getTransactionStatus({ row }, field) {
    return (
      <Typography
        display={'flex'}
        alignItems={'center'}
        component={'span'}
        color={+row[field] >= 0 ? 'success' : 'error'}
      >
        {+row[field] >= 0 ? (
          <ArrowDropUp fontSize="large" color="success" />
        ) : (
          <ArrowDropDown fontSize="large" color="error" />
        )}
        {separateNum(row[field])}
      </Typography>
    );
  }

  const handleFunc = useCallback(
    ({ row }, name, filed) => {
      switch (name) {
        case 'date':
          return handleDate({ row }, filed);
        case 'bagde':
          return handleBadge({ row }, filed);
        case 'status':
          return handleStatus({ row }, filed);
        case 'setFullName':
          return setFullName({ row }, filed);
        case 'multiBadge':
          return handleMultiBadge({ row }, filed);
        case 'progress':
          return handleProgress({ row }, filed);
        case 'progressDay':
          return handleProgressDay({ row }, filed);
        case 'orderStatus':
          return handleOrderStatus({ row }, filed);
        case 'price':
          return handlePrice({ row }, filed);
        case 'complexField':
          return getComplexField({ row }, filed);
        case 'transactionStatus':
          return getTransactionStatus({ row }, filed);
        case 'typeIcon':
          return getTypeIcon({ row }, filed);
        case 'render':
          return renderHtml({ row }, filed);
        case 'total':
          return totalPrice({ row }, filed);
        case 'datalimit':
          return handleDataLimit({ row }, filed);
        default:
          return null;
      }
    },
    [
      handleDate,
      handleBadge,
      handleStatus,
      setFullName,
      handleMultiBadge,
      handleProgress,
      handleProgressDay
    ]
  );

  const list = (item) => (
    <Card sx={{ p: 0.5, my: 0.5 }} onClick={(e) => handleClick(e, item)}>
      {columns.map((col, idx) => (
        <Grid container key={idx} spacing={1} sx={{ mb: 0.5 }} alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body1" component={'div'}>
              {col.headerName}:{'  '}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" component={'div'} noWrap>
              {col.renderCell
                ? handleFunc({ row: item }, col.renderCell, col.field)
                : item[col.field]}{' '}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Card>
  );

  return (
    <Box display={'flex'} flexGrow={1} flexDirection={'column'} overflow={'hidden'} height={'100%'}>
      <Box width={'100%'} justifyContent={'space-between'} alignItems={'center'} marginY={1}>
        <SearchT
          showFilter={showFilter}
          search={search}
          sortItem={sortItem}
          refresh={refresh}
          tabsName={tabsName}
          tabs={tabs}
          setFilters={setFilters}
          filters={filters}
          setSearch={(v) => {
            setData([]);
            setSearch(v);
            setPageNum(0);
          }}
          searchChildren={searchChildren}
        />
        <Menu
          ref={menuRef}
          items={[...rowActions, ...(moreActions ? moreActions : [])].map((i) => ({
            name: i?.name,
            icon: i?.icon,
            color: i?.color,
            onClick: () => i?.onClick({ row })
          }))}
        />
      </Box>
      <Box className="content">
        <List>
          {data?.map((item, idx) => (
            <div ref={lastElementRef} key={idx}>
              {list(item)}
            </div>
          ))}
        </List>
        {data.length === 0 && !isLoading && (
          <Stack direction={'column'} justifyContent="center" alignItems="center">
            <IconButton color="primary" disableRipple>
              <CampaignIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <Typography component={'h3'} color={'primary'} sx={{ mt: 1 }}>
              No Rows
            </Typography>
          </Stack>
        )}
        <ListLoading isLoading={isLoading} rows={data?.length > 0 && pageNum > 1 ? 5 : 15} />
      </Box>
    </Box>
  );
});
export default GridMobile;
