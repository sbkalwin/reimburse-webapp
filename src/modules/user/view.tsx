import { useRouter } from 'next/router';

import UserForm from './components/user-form';
import { employees } from './components/user-form-type';

export default function UserView() {
  const { query } = useRouter();
  const id = query.id;

  const employee = employees.find((employee) => employee.nip === id);
  return <UserForm user={employee} />;
}
