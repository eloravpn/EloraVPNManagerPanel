import { Grid, Typography } from '@mui/material';
import Button from 'components/button';
import Card from 'components/card';
import Bar from 'components/chart/Bar';
import Mixed from 'components/chart/Mixed';
import SelectBadge from 'components/formik/badge';
import Date from 'components/formik/date_picker';
import FormObserver from 'components/formik/observer';
import Select from 'components/formik/select';
import SecondarySelect from 'components/formik/select/dashboardUI';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { getReportAccount } from 'services/reportService';
import { convertByteToInt, getBetweenDate, getDayPersian } from 'utils';

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
      setLabelReportHost(
        data?.map((i) => dayjs.utc(i.date).tz('Asia/Tehran').format('HH:mm')) ?? []
      );

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

    const DD = dayjs().utc().format('DD');
    const a = dayjs()
      .utc()
      .format(`YYYY-MM-${DD - 1} HH:mm`);
    const b = dayjs().utc().format(`YYYY-MM-DD HH:mm`);

    if (values.date === 24)
      obj = {
        start_date: a,
        end_date: b,
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
      setLabelReportHost(
        data?.map((i) =>
          obj.trunc === 'hour'
            ? dayjs.utc(i.date).tz('Asia/Tehran').format('HH:mm')
            : getDayPersian(dayjs.tz(i.date, 'Asia/Tehran').format('YYYY-MM-DD'))
        ) ?? []
      );

      setTotalUsage({
        download: data.reduce((acc, curr) => acc + curr.download, 0),
        upload: data.reduce((acc, curr) => acc + curr.upload, 0)
      });
      console.log(data);
    } catch (e) {}
  };

  return (
    <Grid container spacing={2}>
      {/* Host and Zone Dashboard  */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Formik initialValues={{ zone_id: 1, date: 1 }}>
              {() => (
                <Form>
                  <FormObserver onChange={hadleSubmitHostZone} />

                  <Card
                    title={
                      <>
                        <Select
                          fullWidth={false}
                          name={'zone_id'}
                          options={[{ id: 1, name: 'Zone 1' }]}
                          input={<SecondarySelect fullWidth={false} />}
                        />
                      </>
                    }
                  >
                    <SelectBadge
                      options={[
                        { name: '24 H', id: 24 },
                        { name: '1 Day', id: 1 },
                        { name: '1 Week', id: 7 },
                        { name: '1 Month', id: 30 }
                      ]}
                      name="date"
                    />
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12}>
            <Card
              title={
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">Zone 1</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">Total Active User</Typography>
                      <Typography>0</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">Total Usage</Typography>
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
              <Mixed
                type={'area'}
                data={{
                  labels: labelReportHost,
                  data: [
                    {
                      type: 'column',
                      data: reportHosts.map(({ download }) =>
                        convertByteToInt(download).toFixed(2)
                      ),
                      name: 'Download'
                    },
                    {
                      type: 'column',
                      data: reportHosts.map(({ upload }) => convertByteToInt(upload).toFixed(2)),
                      name: 'Upload'
                    },
                    {
                      type: 'line',
                      data: reportHosts.map(({ count }) => count),
                      name: 'Count'
                    }
                  ]
                }}
                max={Math.max(
                  ...reportHosts.map(({ download }) => convertByteToInt(download).toFixed(2))
                )}
                height={350}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
