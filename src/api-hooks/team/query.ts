import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import { API_LIST, callApi } from 'common/helpers/client';

import { TeamLiteModel, TeamModel, getTeamInput, getTeamsInput } from './model';

export const teamKeys = {
  teams: 'get-teams',
  team: 'get-team',
  teamsKey(input?: getTeamsInput) {
    return [teamKeys.teams, input];
  },
  teamKey(input: getTeamInput) {
    return [teamKeys.team, input.id];
  },
} as const;

export function useGetTeams(props?: {
  params?: getTeamsInput;
  options?: UseQueryOptions<ApiResult<TeamModel[]>, ApiError>;
}) {
  return useQuery({
    queryKey: teamKeys.teamsKey(props?.params),
    async queryFn() {
      return await callApi(
        {
          url: API_LIST.Teams,
          params: props?.params,
          method: 'GET',
        },
        TeamLiteModel,
      );
    },
    ...props?.options,
  });
}

export function useGetTeam(props: {
  input: getTeamInput;
  options?: UseQueryOptions<ApiResult<TeamModel>, ApiError>;
}) {
  return useQuery({
    queryKey: teamKeys.teamKey(props.input),
    async queryFn() {
      return await callApi(
        {
          url: `${API_LIST.Teams}/${props.input.id}`,
          method: 'GET',
        },
        TeamModel,
      );
    },
    ...props?.options,
  });
}
