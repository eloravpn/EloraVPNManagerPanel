import { AllInclusiveOutlined } from '@mui/icons-material';
import { Box, DialogActions, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from 'components/button';
import Chip from 'components/chip';
import SelectBadge from 'components/formik/badge';
import Date from 'components/formik/date_picker';
import Select from 'components/formik/select';
import Slider from 'components/formik/slider';
import TextField from 'components/formik/textfield';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import config from 'config';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import useUsers from 'hooks/useUsers';
import UserSelect from 'pages/components/select/users';
import UserInfo from 'pages/components/user_info';
import { memo, useEffect, useRef, useState } from 'react';
import { convertToByte, emailGenerator, getDayPersian, getExpireTime, uuidGenerator } from 'utils';
import * as yup from 'yup';
import useHostZones from '../../../hooks/useHostZones';

const Input = styled(TextField)`
  width: 75px;
`;

const validationSchema = yup.object({
  user_id: yup.number().required(),
  uuid: yup.string().required(),
  email: yup.string().required(),
  expired_at: yup.string().required(),
  host_zone_id: yup.number().required(),
  ip_limit: yup.number().required()
});

const initialForm = {
  enable: true,
  data_limit: 0,
  ip_limit: 0,
  host_zone_id: '',
  user_id: '',
  expired_at: getExpireTime(30),
  user_title: '',
  service_title: ''
};

function valueLabelFormat(value) {
  const unit = 'GB';
  let scaledValue = value;

  return `${scaledValue} ${unit}`;
}

function calculateValue(value) {
  return value;
}

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);
  const { getUser, user, isLoading } = useUsers();
  const { getHostZones, hostZones } = useHostZones();
  const formikRef = useRef();

  useEffect(() => {
    if (!initial.id && formikRef.current) {
      // Only set new UUID and email if this is a new record
      formikRef.current.setFieldValue('uuid', uuidGenerator());
      formikRef.current.setFieldValue('email', emailGenerator());
    }
  }, []); // Empty dependency array means this runs once when component mounts

  useEffect(() => {
    getHostZones();
    return () => {};
  }, [getHostZones]);

  useEffect(() => {
    if (initial.user_id) getUser(initial.user_id);

    return () => {};
  }, [getUser, initial.user_id]);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.accounts, {
        ...values,
        data_limit: convertToByte(values.data_limit)
      })
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        createRow && createRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  const handleEdit = (values) => {
    setPostDataLoading(true);
    HttpService()
      .put(`${api.accounts}/${initial?.id}`, {
        ...values,
        data_limit: convertToByte(values.data_limit)
      })
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        editRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  const [dates, setDates] = useState({
    days: [
      { day: 1, name: '1 Day', active: false },
      { day: 3, name: '3 Day', active: false },
      { day: 7, name: '7 Week', active: false }
    ],
    month: [
      { day: 30, name: '1 Month', active: false },
      { day: 60, name: '2 Month', active: false },
      { day: 90, name: '3 Month', active: false },
      { day: 180, name: '6 Month', active: false }
    ]
  });

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initial || initialForm}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          initial.id ? handleEdit(values) : handleCreate(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {!!values.user_id && (
              <UserInfo user={user} isLoading={isLoading}>
                <Box display={'flex'} alignItems={'center'}>
                  <Typography variant="h6" component={'div'}>
                    Expire Date:
                    {getDayPersian(dayjs(values.expired_at).format('YYYY-MM-D')) || null}
                  </Typography>
                  {!getDayPersian(dayjs(values.expired_at).format('YYYY-MM-D')) && (
                    <AllInclusiveOutlined fontSize="large" />
                  )}
                </Box>
              </UserInfo>
            )}
            <Grid container spacing={12} rowSpacing={2} justifyContent={'center'}>
              {!initial.user_id ? (
                <Grid item xs={12}>
                  <UserSelect name="user_id" label="Users" />
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <Select
                  name="host_zone_id"
                  label="Host Zone"
                  labelName={'name'}
                  options={hostZones}
                  // isLoading={isLoadingHostZones}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectBadge
                  label={'Status'}
                  name="enable"
                  options={[
                    { id: true, name: 'Enable' },
                    { id: false, name: 'Disable' }
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField name="uuid" label="UUID" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="user_title" label="User Title" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="service_title" label="Service Title" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="ip_limit" label="IP Limit" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="email" label="Email" />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Input
                      fullWidth={false}
                      size="small"
                      name={'data_limit'}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 500,
                        type: 'number',
                        'aria-labelledby': 'input-slider'
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Slider
                      name={'data_limit'}
                      min={0}
                      max={500}
                      step={1}
                      scale={calculateValue}
                      getAriaValueText={valueLabelFormat}
                      valueLabelFormat={valueLabelFormat}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Date name="expired_at" label="Date Picker" />
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  {dates.days.map(({ name, day, active }, idx) => (
                    <Chip
                      key={idx}
                      label={name}
                      variant={active ? 'filled' : 'outlined'}
                      onClick={() => {
                        getExpireTime(7);

                        setFieldValue('expired_at', dayjs(getExpireTime(day)));
                        setDates((prev) => ({
                          ...prev,
                          days: prev.days.map((i, ix) =>
                            ix === idx ? { ...i, active: true } : { ...i, active: false }
                          ),
                          month: prev.month.map((i) => ({
                            ...i,
                            active: false
                          }))
                        }));
                      }}
                    />
                  ))}
                </Box>
                <Box>
                  {dates.month.map(({ name, day, active }, idx) => (
                    <Chip
                      key={idx}
                      label={name}
                      variant={active ? 'filled' : 'outlined'}
                      onClick={() => {
                        setFieldValue('expired_at', dayjs(getExpireTime(day)));
                        setDates((prev) => ({
                          ...prev,
                          month: prev.month.map((i, ix) =>
                            ix === idx ? { ...i, active: true } : { ...i, active: false }
                          ),
                          days: prev.days.map((i) => ({
                            ...i,
                            active: false
                          }))
                        }));
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <DialogActions>
              <Button
                autoFocus
                variant={'outlined'}
                type="submit"
                isLoading={postDataLoading}
                color="primary"
              >
                Submit
              </Button>
              <Button
                variant={'outlined'}
                color="error"
                onClick={() => refrence.current.changeStatus()}
              >
                Cancel
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(AddEdit);
