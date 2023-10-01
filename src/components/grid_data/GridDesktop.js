import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
  memo
} from 'react';
import Icon from '../icon';
import { convertByteToInt, getDayPersian } from '../../utils';
import HttpService from '../httpService';
import Http from '../httpService/Http';
import Search from './Search';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import Menu from '../menu';
import { NotInterested, TaskAlt } from '@mui/icons-material';
import Chip from 'components/chip';
import Progress from 'components/progress';
import dayjs from 'dayjs';
import Tooltip from 'components/tooltip';

const style = {
  boxShadow:
    'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
  borderRadius: '16px',
  color: 'rgb(33, 43, 54)',
  backgroundColor: 'rgb(255, 255, 255)',
  border: 'none',

  '& .super-app-theme--header': {
    backgroundColor: 'rgb(244, 246, 248)'
  },
  '& .super-app-theme--header:first-of-type': {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px'
  },
  '& .super-app-theme--header:last-child': {
    borderTopRightRadius: '8px',
    borderBottomStartRadius: '8px'
  }
};
const rowPerPage = [10, 20, 30];
const CustomGrid = forwardRef(
  ({ columns, rowActions, paginateServ, showFilter, url, name, moreActions, sortItem }, ref) => {
    const [filters, setFilters] = useState({});

    useImperativeHandle(ref, () => ({
      editRow(row) {
        const newData = rows.map((item) => (item.id === row.id ? row : item));
        setRows(newData);
      },
      deleteRow(row) {
        const newData = rows.filter((i) => i.id !== row.id);
        setRows(newData);
      },
      createRow(row) {
        const newData = [row, ...rows];
        setRows(newData);
      },
      changeStatus(newData) {
        setRows(newData);
      },
      filters(filters) {
        setFilters(filters);
      }
    }));

    const menuRef = useRef();

    const [search, setSearch] = useState({
      q: null,
      sort: sortItem ? sortItem[0].id : 'expire'
    });
    const [rows, setRows] = useState([]);
    const [row, setRow] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [rowsState, setRowsState] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
      offset: 0
    });

    const handleDate = useCallback(({ row }, field) => {
      return getDayPersian(row[field]);
    }, []);

    const handleBadge = useCallback(({ row }, field) => {
      return (
        row[field] &&
        row[field].map((i) => <Chip label={i.name || i} size="small" color="primary" />)
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
          <Tooltip key={idx} title={item.name}>
            <Chip
              label={row[item.name] || row[item]}
              size="small"
              color={item.color}
              variant={'outlined'}
            />
          </Tooltip>
        ) : null
      );
    }, []);

    const handleProgress = useCallback(({ row }, field) => {
      const value = JSON.parse(field);

      return (
        <Progress
          firstLabel={`${convertByteToInt(row[value[0]]).toFixed(2)} GB`}
          secondaryLabel={`${convertByteToInt(row[value[2]]).toFixed(0)} GB`}
          value={row[value[1]]}
        />
      );
    }, []);

    const handleProgressDay = useCallback(({ row }, field) => {
      var now = dayjs();
      var start = dayjs(row.modified_at);
      var end = dayjs(row.expired_at);
      const dayRemaining = Math.ceil(end.diff(now) / (1000 * 3600 * 24));
      const totalDays = Math.ceil(end.diff(start) / (1000 * 3600 * 24));
      const t = totalDays - dayRemaining;
      const calcPercentUsage = (100 * t) / totalDays;

      return (
        <Progress
          firstLabel={`${getDayPersian(row.expired_at)}`}
          secondaryLabel={`${dayRemaining || 'Infinity'} Day`}
          value={dayRemaining > 0 ? calcPercentUsage : 100}
        />
      );
    }, []);

    const handleFunc = useCallback(
      ({ row, ...t }, name, filed) => {
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

    const getData = useCallback(() => {
      setLoading(true);
      HttpService()
        .get(url, {
          params: {
            offset: paginateServ
              ? paginationModel.offset === 0
                ? 0
                : paginationModel.offset
              : null,
            limit: paginateServ ? paginationModel.pageSize : null,
            q: search?.q,
            sort: `${search.ASC ? '' : '-'}${search?.sort}`,
            ...filters
          }
        })
        .then((res) => {
          if (name) setRows(res.data[name]);
          setRowsState(res?.data?.total);
        })
        .catch((err) => {
          Http.error(err);
        })
        .finally(() => setLoading(false));
    }, [
      url,
      paginateServ,
      paginationModel.offset,
      paginationModel.pageSize,
      search,
      filters,
      name
    ]);

    useEffect(() => {
      let active = true;

      getData();

      if (!active) {
        return;
      }

      return () => {
        active = false;
      };
    }, [getData, search]);

    const paginationServ = {
      pageSizeOptions: rowPerPage,
      rowCount: rowsState,
      loading: isLoading,
      paginationModel: paginationModel,
      paginationMode: 'server',
      onPaginationModelChange: (e) => {
        setPaginationModel((prev) => ({
          ...e,
          offset: e.page === 0 ? 0 : prev.offset + e.pageSize
        }));
      }
    };

    const localPaginate = {
      loading: isLoading,
      initialState: {
        pagination: {
          paginationModel: { pageSize: 10, page: 0 }
        }
      }
    };

    return (
      <>
        <Menu
          ref={menuRef}
          items={
            !!moreActions &&
            moreActions?.map((i) => ({
              name: i?.name,
              icon: i?.icon,
              color: i?.color,
              onClick: () => i?.onClick(row)
            }))
          }
        />
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            {...(paginateServ ? paginationServ : localPaginate)}
            pageSizeOptions={rowPerPage}
            slots={{
              noResultsOverlay: CustomNoRowsOverlay,
              noRowsOverlay: CustomNoRowsOverlay,
              toolbar: Search
              // pagination: !paginateServ ? CustomPagination : undefined,
            }}
            slotProps={{
              toolbar: {
                setSearch,
                refresh: getData,
                showFilter,
                search,
                sortItem
              }
            }}
            sx={style}
            columns={[
              {
                field: 'iid',
                headerName: '#',
                headerClassName: 'super-app-theme--header',
                width: 10,
                align: 'center'
              },
              ...columns.map((item) => ({
                ...item,
                flex: 1,
                headerClassName: 'super-app-theme--header',
                valueGetter: item?.valueGetter
                  ? (param) => handleFunc(param, item.valueGetter, item.field)
                  : null,
                renderCell: item?.renderCell
                  ? (param) => handleFunc(param, item.renderCell, item.field)
                  : null,
                valueSetter: item?.valueSetter
                  ? (param) => handleFunc(param, item.valueSetter, item.field)
                  : null
              })),
              {
                field: 'actions',
                type: 'actions',
                flex: 1,
                headerName: `Actions`,
                headerClassName: 'super-app-theme--header',
                getActions: (params) => [
                  ...rowActions.map((item, idx) => (
                    <Tooltip key={idx} title={item.name}>
                      <GridActionsCellItem
                        disableRipple
                        icon={
                          <Icon color={item.color} size={'20px'}>
                            {item.icon}
                          </Icon>
                        }
                        onClick={() => item.onClick(params)}
                        label={item.icon}
                      />
                    </Tooltip>
                  )),

                  <GridActionsCellItem
                    onClick={(e) => {
                      menuRef.current.changeStatus(e);
                      setRow(params);
                    }}
                    sx={{
                      display: moreActions ? '' : 'none'
                    }}
                    icon={
                      <Icon color={'primary'} size={'20px'}>
                        more_vert
                      </Icon>
                    }
                    label={'Actions'}
                  />
                ]
              }
            ]}
            rows={rows.map((v, idx) => ({
              ...v,
              iid: idx + 1
            }))}
          />
        </div>
      </>
    );
  }
);
export default memo(CustomGrid);
