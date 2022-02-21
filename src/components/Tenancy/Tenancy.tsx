import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import { TenancyI } from "../../model";

interface TenancyProps {
  tenancy: TenancyI;
}

export const Tenancy = ({ tenancy }: TenancyProps) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{tenancy.landlord.image}</Avatar>}
        title={tenancy.address.street}
        subheader={`${tenancy.address.city} - ${tenancy.address.country}`}
      />
      <CardContent>
        {tenancy.utilities.map((u) => (
          <p>{u}</p>
        ))}
        <div>{tenancy.rooms}</div>
      </CardContent>
    </Card>
  );
};
