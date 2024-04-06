import { Typography } from '@mui/material';
import useUsers from 'hooks/useUsers';
import UserInfo from 'pages/components/user_info';
import { memo, useEffect } from 'react';
import { convertByteToInt } from 'utils';

const View = (props) => {
  const { initial } = props;

  const { getUser, user, isLoading: isLoadingUser } = useUsers();

  useEffect(() => {
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  return (
    <UserInfo user={user} isLoading={isLoadingUser}>
      <>{<div dangerouslySetInnerHTML={{ __html: initial.message }} />}</>
    </UserInfo>
  );
};

export default memo(View);
