import { Box, Fade, Grid, Skeleton, Typography } from '@mui/material';
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
import useHostZones from 'hooks/useHostZones';
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
  const [totalUsage, setTotalUsage] = useState({ download: '', upload: '', avg: 0 });
  const [isLoadingGetReport, setIsLoadingGetReport] = useState(false);
  const { hostZones, isLoading, getHostZones } = useHostZones();

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
        upload: data.reduce((acc, curr) => acc + curr.upload, 0),
        avg: (data.reduce((acc, curr) => acc + curr.count, 0) / data.length).toFixed(0)
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getReport();
    getHostZones();
    const timer = setInterval(() => {
      getReport();
    }, 600000);
    return () => {
      clearInterval(timer);
    };
  }, [getReport]);

  const hadleSubmitHostZone = async (values) => {
    setIsLoadingGetReport(true);
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
        start_date: dayjs().utc().format('YYYY-MM-DDT00:00:00+00:00'),
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
    if (values.date === 4) {
      obj = {
        end_date: dayjs(values.end_date).format(`YYYY-MM-DD HH:mm`),
        start_date: dayjs(values.start_date).format(`YYYY-MM-DD HH:mm`),
        trunc: 'day'
      };
    }
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
        upload: data.reduce((acc, curr) => acc + curr.upload, 0),
        avg:
          data.length > 0
            ? (data.reduce((acc, curr) => acc + curr.count, 0) / data.length).toFixed(0)
            : 0
      });
      setIsLoadingGetReport(false);
    } catch (e) {
      setIsLoadingGetReport(false);
    }
  };

  return (
    <>
      <>
        <Formik initialValues={{ zone_id: 1, date: 24 }}>
          {({ values }) => (
            <Form>
              <Grid container spacing={1}>
                <FormObserver onChange={hadleSubmitHostZone} />
                <Grid item xs={12} md={6}>
                  <Select
                    fullWidth={false}
                    isLoading={isLoading}
                    name={'zone_id'}
                    options={hostZones}
                    input={<SecondarySelect fullWidth={false} />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    width={'fit-content'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    bgcolor={'#f6f6f6'}
                    borderRadius={50}
                    py={'auto'}
                  >
                    <SelectBadge
                      mx={0.9}
                      px={0.9}
                      py={0.5}
                      width={'auto'}
                      borderRadius={50}
                      options={[
                        { name: '24 H', id: 24 },
                        { name: '1 Day', id: 1 },
                        { name: '1 Week', id: 7 },
                        { name: '1 Month', id: 30 },
                        { name: 'Custom', id: 4 }
                      ]}
                      name="date"
                    />
                  </Box>
                  <Fade in={values.date === 4}>
                    <Box>
                      <Date name="start_date" label={'Start At'} />
                      <Date name="end_date" label={'End At'} />
                    </Box>
                  </Fade>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </>
      <Grid container spacing={2}>
        {/* Host and Zone Dashboard  */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                title={
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6">Zone 1</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6">Avg Active User</Typography>
                        {isLoadingGetReport ? (
                          <Skeleton width={25} height={15} />
                        ) : (
                          <Typography>{totalUsage.avg}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6">Total Usage</Typography>
                        <Typography display={'flex'} alignItems={'center'}>
                          Download:
                          {isLoadingGetReport ? (
                            <Skeleton width={35} height={15} sx={{ ml: 1 }} />
                          ) : (
                            convertByteToInt(totalUsage.download).toFixed(2) + 'GB'
                          )}
                        </Typography>
                        <Typography display={'flex'} alignItems={'center'}>
                          Upload:{' '}
                          {isLoadingGetReport ? (
                            <Skeleton width={35} height={15} sx={{ ml: 1 }} />
                          ) : (
                            convertByteToInt(totalUsage.upload).toFixed(2) + 'GB'
                          )}
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
    </>
  );
};

export default Dashboard;
