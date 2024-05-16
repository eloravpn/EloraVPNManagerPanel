import { Download } from '@mui/icons-material';
import { Box, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Mixed from 'components/chart/Mixed';
import SelectBadge from 'components/formik/badge';
import FormObserver from 'components/formik/observer';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { memo, useRef, useState } from 'react';
import { getReportAccount } from 'services/reportService';
import { convertByteToInt, exportAsImage, getBetweenDate, getDayPersian } from 'utils';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const Usages = (props) => {
  const { initial } = props;

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
    if (values.date === -1) {
      obj = {
        end_date: getBetweenDate(1),
        start_date: null,
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
  const [showTabel, setShowTabel] = useState(false);
  const usageRef = useRef();

  const htmlToImageConvert = () => {
    setShowTabel(true);
    setTimeout(() => {
      exportAsImage(imageRef.current, 'usage');
      setShowTabel(false);
    }, 2000);
  };

  const imageRef = useRef();
  const downloads = convertByteToInt(
    reportHosts.reduce((init, curr) => init + curr.download, 0)
  ).toFixed(2);
  const avgDownload = (downloads / reportHosts.length).toFixed(2);
  const totalDownload = convertByteToInt(
    reportHosts.reduce((init, curr) => init + curr.download, 0)
  ).toFixed(2);
  const totalUpload = convertByteToInt(
    reportHosts.reduce((init, curr) => init + curr.upload, 0)
  ).toFixed(2);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
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
                      { name: '1 Month', id: 30 },
                      { name: 'All', id: -1 }
                    ]}
                    name="date"
                  />
                </Box>
              </Form>
            )}
          </Formik>
          <Box textAlign={'center'}>
            <Typography variant="h6">
              Total Usage
              <IconButton color="primary" onClick={htmlToImageConvert}>
                <Download />
              </IconButton>
            </Typography>
            <Typography>
              Download:{' '}
              {isLoadingGetReport ? (
                <Skeleton width={35} height={15} sx={{ ml: 1 }} />
              ) : (
                totalDownload + 'GB'
              )}
            </Typography>
            <Typography>
              Upload:{' '}
              {isLoadingGetReport ? (
                <Skeleton width={35} height={15} sx={{ ml: 1 }} />
              ) : (
                totalUpload + 'GB'
              )}
            </Typography>
            <Typography>
              AVG:{' '}
              {isLoadingGetReport ? (
                <Skeleton width={35} height={15} sx={{ ml: 1 }} />
              ) : (
                avgDownload
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12}></Grid>
      </Grid>
      <table
        className="table-print"
        id="my-node"
        style={{ display: showTabel ? '' : 'none' }}
        ref={imageRef}
      >
        <tr style={{ textAlign: 'center' }}>
          <th>تاریخ</th>
          <th>بارگیری</th>
          <th>بارگذاری</th>
          <th>مجموع مصرف</th>
        </tr>

        {reportHosts.map(({ download, upload, date }) => (
          <tr
            className={
              (avgDownload >= convertByteToInt(download).toFixed(2) && 'success') ||
              (avgDownload <= convertByteToInt(download).toFixed(2) && 'danger')
            }
          >
            <td>{getDayPersian(date)}</td>
            <td>{convertByteToInt(download).toFixed(2)}</td>
            <td> {convertByteToInt(upload).toFixed(2)}</td>
            <td>{(convertByteToInt(download) + convertByteToInt(upload)).toFixed(2)}</td>
          </tr>
        ))}
        <tr className="total">
          <td>Total</td>
          <td>{totalDownload + 'GB'}</td>
          <td>{totalUpload + 'GB'}</td>
          <td>{+totalDownload + +totalUpload} GB</td>
        </tr>
      </table>
      <Mixed
        isLoading={isLoadingGetReport}
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
        max={Math.max(...reportHosts.map(({ download }) => convertByteToInt(download).toFixed(2)))}
        height={350}
      />
    </>
  );
};

export default memo(Usages);
