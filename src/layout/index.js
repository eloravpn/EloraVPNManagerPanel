import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Main = () => {
  return (
    <div className="root">
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  );
};

export default Main;
