import CardMd from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const Custom = styled(CardMd)({
  borderRadius: '16px',
  boxShadow:
    'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
});

export default function Card({ children, sx, sxContent, className, onClick }) {
  return (
    <Custom sx={{ ...sx, minWidth: 275 }} className={className} onClick={onClick && onClick}>
      <CardContent sx={{ ...sxContent }}>{children}</CardContent>
    </Custom>
  );
}
