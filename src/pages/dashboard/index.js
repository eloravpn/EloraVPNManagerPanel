import { MoreVert } from '@mui/icons-material';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import Card from 'components/card';
import ChartJs from 'components/chart';
import Bar from 'components/chart/Bar';
import Radial from 'components/chart/Radial';
import Select from 'components/formik/select';
import SecondarySelect from 'components/formik/select/dashboardUI';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [number, setNumber] = useState(5);
  useEffect(() => {
    // create interval
    const interval = setInterval(
      // set number every 5s
      () => setNumber(Math.floor(Math.random() * 100 + 1)),
      1000
    );

    // clean up interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Grid container spacing={2}>
      {/* Host and Zone Dashboard  */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Card
              title={
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">Zone 1</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">Totla Active User</Typography>
                      <Typography>18,752</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">Totla Usage</Typography>
                      <Typography>500 GB</Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </>
              }
              action={
                <Formik initialValues={{ zone_id: 1 }}>
                  {() => (
                    <Form>
                      <Select
                        fullWidth={false}
                        name={'zone_id'}
                        options={[{ id: 1, name: 'Zone 1' }]}
                        input={<SecondarySelect />}
                      />
                    </Form>
                  )}
                </Formik>
              }
            >
              <Bar
                type={'area'}
                data={
                  {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    data: [
                      {
                        data: [10, 13, 19, 50, 3, 2, 5, 68, 87, 78, 85],
                        name: 'Download'
                      },
                      {
                        data: [15, 20, 10, 45, 8, 5, 10, 60, 90, 78, 100],
                        name: 'Upload'
                      }
                    ]
                  }

                  // convertByteToInt(upload).toFixed(2) || 0,
                  // convertByteToInt(download).toFixed(2) || 0
                }
                height={350}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container direction={'column'}>
              <Grid item xs={12}>
                <Card title="Host 1" subheader={'Connection: 2,124'}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Radial labels={['CPU']} data={[number]} height={200} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Radial labels={['RAM']} data={[number]} height={200} />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Transactions */}
          <Grid item xs={12} md={6} lg={3}>
            <Card title={'total balance'}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant={'h5'} component={'div'} fontWeight={800}>
                    25,000,000 Toman
                  </Typography>
                  <Typography variant={'subtitle1'} color={'secondary'} component={'div'}>
                    +2.6% than last week
                  </Typography>
                </Box>
                <Bar
                  type={'area'}
                  sparkline={true}
                  data={
                    {
                      data: [
                        {
                          data: [10, 20, 15, 17, 8, 6, 35],
                          name: 'Download'
                        }
                      ]
                    }

                    // convertByteToInt(upload).toFixed(2) || 0,
                    // convertByteToInt(download).toFixed(2) || 0
                  }
                  height={50}
                  width={100}
                />
              </Box>
            </Card>
          </Grid>
          {/* Orders */}
          <Grid item xs={12} md={6} lg={3}>
            <Card title="Orders">
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant={'h5'} component={'div'} fontWeight={800}>
                    25,000,000 Toman
                  </Typography>
                  <Typography variant={'subtitle1'} color={'secondary'} component={'div'}>
                    +2.6% than last week
                  </Typography>
                </Box>
                <Bar
                  type={'area'}
                  sparkline={true}
                  data={
                    {
                      data: [
                        {
                          data: [10, 20, 15, 17, 8, 6, 35],
                          name: 'Download'
                        }
                      ]
                    }

                    // convertByteToInt(upload).toFixed(2) || 0,
                    // convertByteToInt(download).toFixed(2) || 0
                  }
                  height={50}
                  width={100}
                />
              </Box>
            </Card>
          </Grid>
          {/* Accounts */}
          <Grid item xs={12} md={6} lg={3}>
            <Card title="Accounts">
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant={'h5'} component={'div'} fontWeight={800}>
                    25,000,000 Toman
                  </Typography>
                  <Typography variant={'subtitle1'} color={'secondary'} component={'div'}>
                    +2.6% than last week
                  </Typography>
                </Box>
                <Bar
                  type={'area'}
                  sparkline={true}
                  data={
                    {
                      data: [
                        {
                          data: [10, 20, 15, 17, 8, 6, 35],
                          name: 'Download'
                        }
                      ]
                    }

                    // convertByteToInt(upload).toFixed(2) || 0,
                    // convertByteToInt(download).toFixed(2) || 0
                  }
                  height={50}
                  width={100}
                />
              </Box>
            </Card>
          </Grid>
          {/* Users */}
          <Grid item xs={12} md={6} lg={3}>
            <Card title="Users">
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Typography variant={'h5'} component={'div'} fontWeight={800}>
                    25,000,000 Toman
                  </Typography>
                  <Typography variant={'subtitle1'} color={'secondary'} component={'div'}>
                    +2.6% than last week
                  </Typography>
                </Box>
                <Bar
                  type={'area'}
                  sparkline={true}
                  data={
                    {
                      data: [
                        {
                          data: [10, 20, 15, 17, 8, 6, 35],
                          name: 'Download'
                        }
                      ]
                    }

                    // convertByteToInt(upload).toFixed(2) || 0,
                    // convertByteToInt(download).toFixed(2) || 0
                  }
                  height={50}
                  width={100}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
