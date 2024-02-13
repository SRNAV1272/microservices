import './App.css';
import { Outlet, useRoutes } from 'react-router-dom';
import Dashboard from './components/layout/dashboard';
import DatabaseTable from './components/pages/Tables';
import { Backdrop, CircularProgress } from '@mui/material';
import SimpleSnackbar from './components/pages/Notification';
import { useSelector } from 'react-redux';

function App() {
  const load = useSelector(state => state?.LoadingReducer?.load)
  const routes = useRoutes([
    {
      path: '/',
      element:
        <Dashboard>
          <Outlet />
        </Dashboard>,
      children: [
        {
          path: '/',
          element: <DatabaseTable />
        }
      ]
    }
  ])

  return (
    <>

      <SimpleSnackbar />
      {
        routes
      }
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }
        }
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop >
    </>
  );
}

export default App;
