import { Close, MiscellaneousServices } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material';
import Drawer from 'components/drawer_v2';
import { useFormikContext } from 'formik';
import useServices from 'hooks/useServices';
import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { separateNum } from 'utils';

const ServicesSelect = ({ name, onBlur, onChange }) => {
  const { getServices, services, isLoading } = useServices();

  const drawerRef = useRef();
  const [service, setService] = useState(null);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    getServices();
    return () => {};
  }, []);

  const handleSelect = (SERVICE) => {
    const { name } = SERVICE;
    setFieldValue(name, SERVICE.id);
    drawerRef.current.onChange();
    setService({ name });
    onBlur && onBlur(SERVICE);
    onChange && onChange(SERVICE);
  };

  return (
    <>
      <Box
        className="badge"
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        onClick={() => drawerRef.current.onChange()}
      >
        <Box display={'flex'} alignItems={'center'}>
          <MiscellaneousServices sx={{ marginRight: 1, fontSize: 25 }} color="primary" />
          {service ? service.name : 'Select User'}
        </Box>
        <IconButton
          size="sm"
          onClick={() => {
            setFieldValue(name, null);
            setService(null);
          }}
        >
          <Close color="secondary" fontSize="sm" />
        </IconButton>
      </Box>
      <Drawer ref={drawerRef} anchor="bottom">
        <Box
          display={'flex'}
          flexDirection={'column'}
          flexShrink={1}
          overflow={'hidden'}
          height={'60vh'}
        >
          <Box width={'100%'} justifyContent={'space-between'} alignItems={'center'} marginY={1}>
            <Box
              display="flex"
              alignItems={'center'}
              justifyContent={'space-between'}
              mb={1}
              mx={2}
            >
              <Typography variant="h6">Select Service</Typography>
              <IconButton onClick={() => drawerRef.current.onChange()}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <Box overflow="auto" maxHeight={'99vh'}>
            {services.length === 0 && !isLoading && (
              <Box textAlign={'center'} m={10}>
                {' '}
                No Found Service.
              </Box>
            )}
            <List>
              {isLoading ? (
                [...Array(10)].map((e) => (
                  <Box display={'flex'} alignItems={'center'} m={1} key={e}>
                    <Box mr={2}>
                      <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </Box>
                    <Box width={'100%'}>
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={10} width="40%" />
                    </Box>
                  </Box>
                ))
              ) : (
                <>
                  {services.map((service, idx) => (
                    <Fragment key={idx}>
                      <ListItem onClick={() => handleSelect(service)}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <>
                              <MiscellaneousServices sx={{ fontSize: 35 }} color="primary" />
                            </>
                          </ListItemAvatar>
                          <ListItemText
                            primary={service.name}
                            secondary={
                              <>
                                <Typography
                                  component={'span'}
                                  sx={{
                                    ...(service.discount
                                      ? {
                                          WebkitTextDecorationLine: 'line-through',
                                          WebkitTextDecorationColor: 'red',
                                          textDecoration: 'line-through red 2px'
                                        }
                                      : '')
                                  }}
                                >
                                  {` ${service.discount ? separateNum(service.price) : ''}`}
                                </Typography>
                                <Typography>
                                  {`${separateNum(service.price - service.discount)} `}
                                </Typography>
                              </>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  ))}
                </>
              )}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default memo(ServicesSelect);
