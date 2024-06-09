export type DeleteableType =
  | 'account-details'
  | 'accounts'
  | 'itineraries'
  | 'reimburses'
  | 'stationeries'
  | 'teams'
  | 'users';

export type DeleteMutationType = {
  id: string;
};
