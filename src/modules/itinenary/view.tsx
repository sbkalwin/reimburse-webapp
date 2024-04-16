import { useRouter } from 'next/router';

import IternaryForm from './components/itinenary-form';
import { itinenaries } from './components/itinenary-form-type';

export default function IternaryView() {
  const { query } = useRouter();
  const id = query.id;

  const itinenary = itinenaries.find((itinenary) => itinenary.id === id);
  return <IternaryForm itinenary={itinenary} />;
}
