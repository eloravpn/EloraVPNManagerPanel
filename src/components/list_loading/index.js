import { Divider, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';

const ListLoading = ({ isLoading, rows, children }) => {
  return isLoading ? (
    <>
      {[...Array(rows)].map((e, i) => (
        <List key={i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Skeleton animation="wave" variant="circular" width={25} height={25} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton animation="wave" height={10} width="30%" />}
              secondary={<Skeleton animation="wave" height={10} width="80%" />}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </>
  ) : (
    <> {children} </>
  );
};

export default ListLoading;
