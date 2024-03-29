import { Box, Grid } from '@mui/material';
import Mixed from 'components/chart/Mixed';
import SelectBadge from 'components/formik/badge';
import FormObserver from 'components/formik/observer';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import useAccount from 'hooks/useAccount';
import { memo, useState } from 'react';
import { getReportAccount } from 'services/reportService';
import { convertByteToInt, getBetweenDate, getDayPersian } from 'utils';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const Usages = (props) => {
  const { initial } = props;
  const { getUsageAccount, useages, isLoading } = useAccount();
  const [isLoadingGetReport, setIsLoadingGetReport] = useState(false);
  const [reportHosts, setReportHosts] = useState([]);
  const [labelReportHost, setLabelReportHost] = useState([]);

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
        account_id: initial.id,
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

      setIsLoadingGetReport(false);
    } catch (e) {
      setIsLoadingGetReport(false);
    }
  };

  return (
    <Grid container spacing={2}>
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
              <FormObserver onChange={handleSubmit} />
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

        <Mixed
          type={'area'}
          data={{
            labels: labelReportHost,
            data: [
              {
                type: 'column',
                data: reportHosts.map(({ download }) => convertByteToInt(download).toFixed(2)),
                name: 'Download'
              },
              {
                type: 'column',
                data: reportHosts.map(({ upload }) => convertByteToInt(upload).toFixed(2)),
                name: 'Upload'
              }
            ]
          }}
          max={Math.max(
            ...reportHosts.map(({ download }) => convertByteToInt(download).toFixed(2))
          )}
          height={350}
        />
      </Grid>
    </Grid>
  );
};

export default memo(Usages);
