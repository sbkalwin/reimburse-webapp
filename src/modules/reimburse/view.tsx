import { useRouter } from 'next/router';

import ReimburseForm from './components/reimburse-form';
import { reimburses } from './components/reimburse-form-type';

export default function ReimburseView() {
  const { query } = useRouter();
  const id = query.id;

  const reimburse = reimburses.find((reimburse) => reimburse.id === id);

  return <ReimburseForm reimburse={reimburse} />;
}
