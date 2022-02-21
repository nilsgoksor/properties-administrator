import { TenancyI } from "../../model";

interface TenancyProps {
  tenancy: TenancyI;
}

export const Tenancy = ({ tenancy }: TenancyProps) => {
  return <p>{tenancy.address.street}</p>;
};
