import { ReimburseTypeEnum } from 'api-hooks/reimburse/model';

interface ReimburseTypeBadgeProps {
  type: ReimburseTypeEnum;
}

export default function ReimburseTypeBadge(props: ReimburseTypeBadgeProps) {
  switch (props.type) {
    case ReimburseTypeEnum.itinerary:
      return <>Perjalanan</>;
    case ReimburseTypeEnum.stationery:
      return <>Peralatan Kantor</>;
    default:
      return <>Invalid Type</>;
  }
}
