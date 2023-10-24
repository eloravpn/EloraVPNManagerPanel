import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Main = () => {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
};

export default Main;
