import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { GetApi, GetGuestApi } from 'src/Api';

function RecentOrders({ cryptoOrders, getData }) {
  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} getData={getData} />
    </Card>
  );
}

export default RecentOrders;
