import { useCallback, useState } from 'react';
import { getAllUsers, getFullUser } from 'services/usersService';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const getUsers = useCallback(async (q) => {
    setIsLoading(true);
    try {
      const users = await getAllUsers({ q, limit: 1000 });
      setUsers(users);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);
  const getUser = useCallback(async (userID) => {
    setIsLoading(true);
    try {
      const user = await getFullUser(userID);
      setUser(user);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);

  return { getUsers, users, setUsers, user, getUser, isLoading };
};

export default useUsers;
