import { memo, useEffect } from 'react';
import { CardHeader, Grid } from '@mui/material';
import useAccount from 'hooks/useAccount';
import Card from 'components/card';
import ChartJs from 'components/chart';
import { convertByteToInt } from 'utils';

const Usages = (props) => {
  const { initial, fullChart } = props;
  const { getUsageAccount, useages } = useAccount();

  useEffect(() => {
    getUsageAccount(initial.id);
    return () => {};
  }, [getUsageAccount, initial.id]);

  return (
    <Grid container spacing={2}>
      {useages.map(({ download, upload, name }, idx) => (
        <Grid item xs={12} md={fullChart ? 12 : 4} key={idx}>
          <Card
            sx={{
              borderRadius: '16px',
              boxShadow:
                'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            }}
          >
            <CardHeader
              // avatar={<Avatar src={addPatient} sx={{ width: 56, height: 56 }} />}
              title={name}
              titleTypographyProps={{ fontSize: 20 }}
            />
            <ChartJs
              data={{
                labels: ['Upload', 'Download'],
                data: [
                  convertByteToInt(upload).toFixed(2) || 0,
                  convertByteToInt(download).toFixed(2) || 0
                ],
                type: ''
              }}
              height={200}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(Usages);
