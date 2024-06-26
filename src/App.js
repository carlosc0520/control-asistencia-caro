import './App.css';
import 'rsuite/dist/rsuite.min.css';
import { Outlet } from 'react-router-dom';
import SideBar from './views/SideBar';

function App() {
  return (
    <div className="App min-h-screen flex">
      <div className="hidden md:block md:w-1/4 lg:w-1/5 xl:w-1/6 bg-gray-800 p-4">
        <SideBar />
      </div>
      <div className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

