import { Grid } from '@mui/material';
import CheckBox from 'components/formik/checkbox';
import Select from 'components/formik/select';
import TextField from 'components/formik/textfield';
import GLOBAL from 'components/variables';

const AddOneFrom = ({ keyboard }) => {
  return (
    <>
      <Grid item xs={12} md={3}>
        <Select id={'status'} name={'status'} label="Status" options={GLOBAL.statusNotifications} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Select id={'type'} name={'type'} label="Type" options={GLOBAL.typeNotifications} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Select
          id={'engine'}
          name={'engine'}
          label="Engine"
          options={[
            { id: 'telegram', name: 'Telegram' },
            { id: 'email', name: 'Email' },
            { id: 'sms', name: 'SMS' }
          ]}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField id={'level'} name={'level'} label="Level" />
      </Grid>
      <Grid item xs={12}>
        <TextField id={'photo_url'} name={'photo_url'} label="Photo Url" type="text" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={'keyboard'}
          name={'keyboard'}
          label="Keyboard"
          type="text"
          minRows={4}
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={'message'}
          name={'message'}
          label="Message"
          type="text"
          minRows={4}
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <CheckBox name="approve" label={'Approve'} />
      </Grid>
    </>
  );
};

export default AddOneFrom;
