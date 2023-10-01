import { forwardRef, useCallback, Fragment, useImperativeHandle, useState, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Icon from '../icon';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '../menu';
import useFetch from '../useFetch';
import ListLoading from '../list_loading';
import { Stack } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

const GridMobile = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    editRow(row) {
      editRow(row);
    },
    deleteRow(row) {
      deleteRow(row);
    },
    createRow(row) {
      createRow(row);
    }
  }));
  const [pageNum, setPageNum] = useState(1);
  const { url, paginateServ, search, name, columns, rowActions, moreActions } = props;

  const { isLoading, data, hasMore, editRow, deleteRow, createRow } = useFetch(
    url,
    search,
    pageNum,
    paginateServ,
    name
  );

  const observer = useRef();
  const menuRef = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (paginateServ) {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNum((prev) => prev + 1);
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [isLoading, hasMore, paginateServ]
  );

  const [row, setRow] = useState(null);

  const handleClick = (event, item) => {
    setRow(item);
    menuRef.current?.changeStatus(event);
  };

  const list = (item) => (
    <>
      <ListItem
        ref={lastElementRef}
        alignItems="flex-start"
        secondaryAction={
          <IconButton onClick={(e) => handleClick(e, item)} edge="end" aria-label="comments">
            <MoreVertIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Icon color="primary" size="35px">
            fiber_manual_record
          </Icon>
        </ListItemAvatar>
        <ListItemText
          primary={item[columns[0]?.field] ?? ''}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item[columns[1].field] ?? ''}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );

  return (
    <>
      <Menu
        ref={menuRef}
        items={[...rowActions, ...(moreActions ? moreActions : [])].map((i) => ({
          name: i?.name,
          icon: i?.icon,
          color: i?.color,
          onClick: () => i?.onClick({ row })
        }))}
      />
      <List>
        {data?.map((item, idx) => (
          <Fragment key={idx}> {list(item)}</Fragment>
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
      <ListLoading isLoading={isLoading} rows={data?.length > 0 ? 1 : 15} />
    </>
  );
});
export default GridMobile;
