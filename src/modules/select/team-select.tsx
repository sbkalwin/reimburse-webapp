import { ComboboxItem } from '@mantine/core';
import { getTeamsInput, TeamLiteModel } from 'api-hooks/team/model';
import { useGetTeams } from 'api-hooks/team/query';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type TeamOption = ComboboxItem & {
  item: TeamLiteModel;
};

export interface TeamSelectProps
  extends Omit<SelectFieldProps, 'type' | 'data' | 'onAfterChange'> {
  filterQuery?: getTeamsInput;
  onAfterChange?: (value: string | null, option: TeamOption) => void;
}

export function teamTransformer(team: TeamLiteModel): TeamOption {
  return {
    item: team,
    value: team.id,
    label: [team.id, team.nama].join(' - '),
  };
}

export default function TeamSelect(props: TeamSelectProps) {
  const { filterQuery, onAfterChange, ...rest } = props;
  const queryGetTeams = useGetTeams({ params: filterQuery });
  const options = (queryGetTeams.data?.data || []).map((team) => {
    return teamTransformer(team);
  });

  return (
    <Input
      {...rest}
      type="select"
      data={options}
      disabled={queryGetTeams.isLoading || undefined}
      onAfterChange={onAfterChange as any}
    />
  );
}
