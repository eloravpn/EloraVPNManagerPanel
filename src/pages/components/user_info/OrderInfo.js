import { Close, InfoOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import {
  Alert,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import { getDayPersian, separateNum } from 'utils';

export const OrderInfo = ({ orders, user, balance }) => {
  const [openInfoOrder, setOpenInfoOrder] = useState(false);

  return (
    <>
      <Alert
        severity="info"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenInfoOrder((res) => !res);
            }}
          >
            {openInfoOrder ? <Close fontSize="inherit" /> : <InfoOutlined fontSize="inherit" />}
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <Typography component={'span'} fontWeight={700}>
          Count:{' '}
        </Typography>
        {orders?.length}
        <Typography component={'span'} fontWeight={700} ml={1}>
          Total Payment:{' '}
        </Typography>
        {separateNum(orders.reduce((acc, curr) => +acc + +curr.total, 0))}
        <Typography component={'span'} fontWeight={700} ml={1}>
          Balance:{' '}
        </Typography>
        {separateNum(user.balance || balance)}
      </Alert>
      {openInfoOrder && (
        <Box maxHeight={150} overflow={'auto'}>
          <List dense>
            {orders.map((order, idx) => (
              <Fragment key={idx}>
                <ListItem>
                  <ListItemIcon sx={{ m: 0 }}>
                    <ShoppingBagOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={order?.service?.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {separateNum(order?.total)}
                        </Typography>
                        -{getDayPersian(order?.modified_at)}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};
