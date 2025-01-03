import { memo, useState } from 'react';
import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import PaymentAccounts from './PaymentAccounts';

const Commerce = (props) => {
  const [activeTab, setActiveTab] = useState('payment-accounts');

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: -2 }}>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Payment Accounts" value="payment-accounts" />
      </Tabs>

      <Container
        maxWidth={'xl'}
        disableGutters
        sx={{
          height: '300px',
          mt: 1
        }}
      >
        {activeTab === 'payment-accounts' && <PaymentAccounts {...props} />}
      </Container>
    </Box>
  );
};

export default memo(Commerce);
