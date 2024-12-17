import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import { GetApi } from 'src/Api';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PannelSystem from './PannelSystem';
import PannelObject from './PannelObject';
function ApplicationsGrantPermission() {
  const [cryptoOrders, setCryptoOrders] = useState<any>([]);
  const [value, setValue] = useState('1');

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
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Helmet>
        <title>BMCSDL</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="System" value="1" />
                <Tab label="Object" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <PannelSystem />
            </TabPanel>
            <TabPanel value="2">
              <PannelObject />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsGrantPermission;
