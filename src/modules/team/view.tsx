import { useRouter } from 'next/router';

import TeamForm from './components/team-form';
import { teams } from './components/team-form-type';

export default function TeamView() {
  const { query } = useRouter();
  const id = query.id;

  const team = teams.find((team) => team.id === id);
  return <TeamForm team={team} />;
}
