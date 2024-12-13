import React from 'react';
import { styled } from '@mui/material/styles';

const TooltipList = styled('ul')({
  paddingLeft: '16px',
  margin: '4px 0'
});

export const helpTexts = {
  UVICORN_PORT: {
    label: 'Uvicorn Port',
    helper: `Port number for Uvicorn server
Default: 8080`,
    tooltip: (
      <>
        Examples:
        <TooltipList>
          <li>8000-8999: Common development ports</li>
          <li>80: Standard HTTP port</li>
          <li>443: Standard HTTPS port</li>
          <li>1024-65535: User ports range</li>
        </TooltipList>
        Note: Server restart required after changing the port.
        <br />
        Ensure the port is not in use by other services.
      </>
    )
  },
  UVICORN_HOST: {
    label: 'Uvicorn Host',
    helper: `IP address for server to listen on
IPv4: 0.0.0.0 (all), 127.0.0.1 (localhost)`,
    tooltip: (
      <>
        Examples:
        <TooltipList>
          <li>IPv4: 0.0.0.0 (all interfaces)</li>
          <li>IPv6: :: (all interfaces)</li>
          <li>127.0.0.1 (localhost)</li>
          <li>Default: 0.0.0.0</li>
        </TooltipList>
      </>
    )
  },
  CUSTOM_BASE_URL: {
    label: 'Custom Base URL',
    helper: `Optional: Application access URL
Example: https://yoursub.domain.com`,
    tooltip: (
      <>
        Override the automatic domain detection. <br />
        Required for custom proxy setups.
      </>
    )
  },
  SUBSCRIPTION_BASE_URL: {
    label: 'Subscription Base URL',
    helper: 'Required: The public URL for VPN client subscriptions that ends with /api/sub',
    tooltip: (
      <>
        This URL will be used by VPN clients to fetch their configuration.
        <br />
        Examples:
        <ul style={{ paddingLeft: '16px', margin: '4px 0' }}>
          <li>https://vpn.example.com/api/sub</li>
          <li>https://sub.company.com/api/sub</li>
        </ul>
        Requirements:
        <ul style={{ paddingLeft: '16px', margin: '4px 0' }}>
          <li>Must be publicly accessible</li>
          <li>Must use HTTPS protocol</li>
          <li>Must end with /api/sub</li>
          <li>Must match your SSL certificate</li>
        </ul>
      </>
    )
  }
};
