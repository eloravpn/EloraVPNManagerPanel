import { Grid, Typography } from '@mui/material';
import Button from 'components/button';
import Card from 'components/card';
import Bar from 'components/chart/Bar';
import SelectBadge from 'components/formik/badge';
import Date from 'components/formik/date_picker';
import Select from 'components/formik/select';
import SecondarySelect from 'components/formik/select/dashboardUI';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { getReportAccount } from 'services/reportService';
import { convertByteToInt, getBetweenDate } from 'utils';
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

const Dashboard = () => {
  const [reportHosts, setReportHosts] = useState([]);
  const [labelReportHost, setLabelReportHost] = useState([]);
  const [totalUsage, setTotalUsage] = useState({ download: '', upload: '' });

  const getReport = useCallback(async () => {
    const DD = dayjs().utc().format('DD');
    const a = dayjs()
      .utc()
      .format(`YYYY-MM-${DD - 1} HH:mm`);
    const b = dayjs().utc().format(`YYYY-MM-DD HH:mm`);

    try {
      const { data } = await getReportAccount({
        start_date: a,
        end_date: b,
        trunc: 'hour'
      });
      setReportHosts(data);
      setLabelReportHost(data?.map((i) => dayjs.tz(i.date, 'Asia/Tehran')) ?? []);

      setTotalUsage({
        download: data.reduce((acc, curr) => acc + curr.download, 0),
        upload: data.reduce((acc, curr) => acc + curr.upload, 0)
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getReport();
    const timer = setInterval(() => {
      getReport();
    }, 600000);
    return () => {
      clearInterval(timer);
    };
  }, [getReport]);

  const hadleSubmitHostZone = async (values) => {
    var obj = {};

    if (values.date === 24)
      obj = {
        end_date: dayjs().utc().format(),
        start_date: getBetweenDate(1),
        trunc: 'hour'
      };
    if (values.date === 1)
      obj = {
        end_date: dayjs().utc().format(),
        start_date: dayjs().utc().format('YYYY-MM-DDT00:00'),
        trunc: 'hour'
      };
    if (values.date === 7)
      obj = {
        end_date: getBetweenDate(1),
        start_date: getBetweenDate(7),
        trunc: 'day'
      };
    if (values.date >= 30)
      obj = {
        end_date: getBetweenDate(1),
        start_date: getBetweenDate(values.date),
        trunc: 'day'
      };
    try {
      const { data } = await getReportAccount({
        ...obj
      });
      setReportHosts(data);
      setLabelReportHost(data.map((i) => dayjs(i.date).format('YYYY-MM-DD hh:mm')));
      setTotalUsage({
        download: data.reduce((acc, curr) => acc + curr.download, 0),
        upload: data.reduce((acc, curr) => acc + curr.upload, 0)
      });
      console.log(data);
    } catch (e) {}
  };

  console.log(labelReportHost);

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
                      <Typography>0</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">Totla Usage</Typography>
                      <Typography>
                        Download: {convertByteToInt(totalUsage.download).toFixed(2)} GB
                      </Typography>
                      <Typography>
                        Upload:{convertByteToInt(totalUsage.upload).toFixed(2)} GB
                      </Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </>
              }
            >
              <Bar
                type={'area'}
                data={{
                  labels: labelReportHost,
                  data: [
                    {
                      data: reportHosts.map(({ download }) =>
                        convertByteToInt(download).toFixed(2)
                      ),
                      name: 'Download'
                    },
                    {
                      data: reportHosts.map(({ upload }) => convertByteToInt(upload).toFixed(2)),
                      name: 'Upload'
                    }
                  ]
                }}
                height={350}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 2 }} title="Host Zones">
              <Formik initialValues={{ zone_id: 1, date: 1 }} onSubmit={hadleSubmitHostZone}>
                {() => (
                  <Form onChange={() => alert()}>
                    <Select
                      fullWidth={true}
                      name={'zone_id'}
                      options={[{ id: 1, name: 'Zone 1' }]}
                      input={<SecondarySelect />}
                    />
                    <SelectBadge
                      options={[
                        { name: '24 H', id: 24 },
                        { name: '1 Day', id: 1 },
                        { name: '1 Week', id: 7 },
                        { name: '1 Month', id: 30 }
                      ]}
                      name="date"
                    />
                    <Grid container spacing={1}>
                      <Grid item xs={9}>
                        <Button fullWidth type={'submit'}>
                          Search
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button color="error" type={'reset'}>
                          reset
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
