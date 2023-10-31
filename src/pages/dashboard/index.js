import { MoreVert } from '@mui/icons-material';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import Card from 'components/card';
import ChartJs from 'components/chart';
import Select from 'components/formik/select';
import SecondarySelect from 'components/formik/select/dashboardUI';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
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
            <ChartJs
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
      </Grid>
    </>
  );
};

export default Dashboard;
