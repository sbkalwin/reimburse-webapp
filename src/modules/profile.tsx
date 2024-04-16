import UserForm from './user/components/user-form';
import { employees } from './user/components/user-form-type';

export default function Profile() {
  return <UserForm user={employees[0]} />;
}
