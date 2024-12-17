import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import routesGuest from './router-guest';
import { useSelector, useStore } from 'react-redux';
import { ReducerProps } from './reducers/ReducersProps';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { change_user } from './reducers/Action';
import { GetApi } from './Api';

function App() {
  const content = useRoutes(router);
  const contentGuest = useRoutes(routesGuest);
  const store = useStore();
  const user = useSelector((state: ReducerProps) => state.user);
  const getUser = async () => {
    const resUser = await GetApi(
      '/api/auth/user-info',
      window.localStorage.getItem('token')
    );
    store.dispatch(change_user(resUser.data));
  };
  useEffect(() => {
    if (window.localStorage.getItem('token')) getUser();
  }, []);
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {user ? user.role == 'ADMIN' ? content : <>hello user</> : contentGuest}
      </LocalizationProvider>
      <ToastContainer />
    </ThemeProvider>
  );
}
export default App;
