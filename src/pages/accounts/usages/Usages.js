import { memo, useEffect } from 'react';
import { CardHeader, Grid } from '@mui/material';
import useAccount from 'hooks/useAccount';
import Card from 'components/card';
import ChartJs from 'components/chart';
import { convertByteToInt } from 'utils';

const Usages = (props) => {
  const { initial, fullChart } = props;
  const { getUsageAccount, useages, isLoading } = useAccount();
  console.log('🚀 ~ Usages ~ useages.length:', useages.length);
  useEffect(() => {
    getUsageAccount(initial.id);
    return () => {};
  }, [getUsageAccount, initial.id]);
  return (
    <Grid container spacing={2}>
      {/* {useages.map(({ download, upload, name }, idx) => ( */}
      <Grid item xs={12} md={12}>
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
          {useages.length > 0 && (
            <>
              <ChartJs
                data={{
                  labels: ['1Day', '3Day', '1week'],
                  data: [
                    {
                      name: 'Upload',
                      data: [
                        convertByteToInt(useages[0].upload).toFixed(0) || 0,
                        convertByteToInt(useages[1].upload).toFixed(0) || 0,
                        convertByteToInt(useages[2].upload).toFixed(0) || 0
                      ]
                    },
                    {
                      name: 'Download',
                      data: [
                        convertByteToInt(useages[0].download).toFixed(0) || 0,
                        convertByteToInt(useages[1].download).toFixed(0) || 0,
                        convertByteToInt(useages[2].download).toFixed(0) || 0
                      ]
                    },
                    {
                      name: 'Download'
                    }

                    // convertByteToInt(upload).toFixed(2) || 0,
                    // convertByteToInt(download).toFixed(2) || 0
                  ],
                  type: ''
                }}
                height={200}
              />
            </>
          )}
        </Card>
      </Grid>
      {/* ))} */}
    </Grid>
  );
};

export default memo(Usages);
