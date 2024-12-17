import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';
import DialogAdd from './DialogAdd';
import { useEffect, useState } from 'react';
import { GetApi } from 'src/Api';
import DialogEdit from './DialogEdit';

function ApplicationsRoles() {
  const [openDialogAdd, setOpenDialogAdd] = useState<Boolean>(false);
  const [cryptoOrders, setCryptoOrders] = useState<any>([]);
  const getData = async () => {
    const res = await GetApi(
      '/admin/profile',
      window.localStorage.getItem('token')
    );
    if (res.data.message == 'Success') {
      setCryptoOrders(res.data.object);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>BMCSDL</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader setOpenDialogAdd={setOpenDialogAdd} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders cryptoOrders={cryptoOrders} getData={getData} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <DialogAdd
        open={openDialogAdd}
        setOpen={setOpenDialogAdd}
        getData={getData}
      />
    </>
  );
}

export default ApplicationsRoles;
