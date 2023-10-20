import { memo, useEffect } from 'react';

import useUsers from 'hooks/useUsers';

const Info = (props) => {
  const { refrence, initial } = props;

  const { getUser, user, isLoading: isLoadingUser } = useUsers();

  useEffect(() => {
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  return <></>;
};

export default memo(Info);
