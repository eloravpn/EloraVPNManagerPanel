import { memo, useEffect } from 'react';
import { Box, CardHeader, Grid } from '@mui/material';
import useAccount from 'hooks/useAccount';
import Card from 'components/card';
import ChartJs from 'components/chart';
import { convertByteToInt, getBetweenDate } from 'utils';
import Mixed from 'components/chart/Mixed';
import { Form, Formik } from 'formik';
import SelectBadge from 'components/formik/badge';
import dayjs from 'dayjs';

const Usages = (props) => {
  const { initial } = props;
  const { getUsageAccount, useages, isLoading } = useAccount();

  useEffect(() => {
    getUsageAccount(initial.id);
    return () => {};
  }, [getUsageAccount, initial.id]);

  const handleSubmit = async (values) => {
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
        start_date: dayjs(dayjs().format('YYYY-MM-DD 00:00')).utc().format(),
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
      setZone(hostZones.find((i) => i.id === values.zone_id));
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
    <Grid container spacing={2}>
      {/* {useages.map(({ download, upload, name }, idx) => ( */}
      <Grid
        item
        xs={12}
        md={12}
        sxContent={{
          overflowY: 'scroll'
        }}
      >
        <Formik initialValues={{ date: 1 }}>
          {() => (
            <Form>
              <Box
                mx={0.5}
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
                    { name: '1 Month', id: 30 }
                  ]}
                  name="date"
                />
              </Box>
            </Form>
          )}
        </Formik>
        {useages.length > 0 && (
          <Mixed
            type={'area'}
            data={{
              labels: ['aaa'],
              data: [
                {
                  type: 'column',
                  data: [5, 7, 5, 6, 3, 2, 5],
                  name: 'Download'
                },
                {
                  type: 'column',
                  data: [10, 20, 8, 6, 23, 21, 15, 17],
                  name: 'Upload'
                }
              ]
            }}
            max={30}
            height={350}
          />
        )}
      </Grid>
      {/* ))} */}
    </Grid>
  );
};

export default memo(Usages);
