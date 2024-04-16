import { useRouter } from 'next/router';

import StationeryForm from './components/stationery-form';
import { stationeries } from './components/stationery-form-type';

export default function StationeryView() {
  const { query } = useRouter();
  const id = query.id;

  const stationery = stationeries.find((stationery) => stationery.id === id);
  return <StationeryForm stationery={stationery} />;
}
