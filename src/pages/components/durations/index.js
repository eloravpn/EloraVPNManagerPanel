import { Box } from '@mui/material';
import Chip from 'components/chip';
import Grid from 'components/grid';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { getExpireTime } from 'utils';

const Durations = ({ name, disabled }) => {
  const { setFieldValue } = useFormikContext();

  const [dates, setDates] = useState({
    days: [
      { day: 1, label: '1 Day', active: false },
      { day: 3, label: '3 Day', active: false },
      { day: 7, label: '7 Week', active: false }
    ],
    month: [
      { day: 30, label: '1 Month', active: false },
      { day: 60, label: '2 Month', active: false },
      { day: 90, label: '3 Month', active: false },
      { day: 180, label: '6 Month', active: false }
    ]
  });

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex'
        }}
      >
        {dates.days.map(({ label, day, active }, idx) => (
          <Chip
            disabled={disabled}
            key={idx}
            label={label}
            variant={active ? 'filled' : 'outlined'}
            onClick={() => {
              getExpireTime(7);

              setFieldValue(name, day);
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
        {dates.month.map(({ label, day, active }, idx) => (
          <Chip
            disabled={disabled}
            key={idx}
            label={label}
            variant={active ? 'filled' : 'outlined'}
            onClick={() => {
              setFieldValue(name, day);
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
  );
};

export default Durations;
