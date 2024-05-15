import { useRouter } from 'next/router';

import ReimburseForm from './components/reimburse-form';

export default function ReimburseView() {
  const { query } = useRouter();
  const id = query.id;

  return <ReimburseForm />;
}
