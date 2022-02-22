import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material";
import { TenancyI } from "../../model";
import InfoIcon from "@mui/icons-material/InfoRounded";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface TenancyProps {
  tenancy: TenancyI;
}

export const Tenancy = ({ tenancy }: TenancyProps) => {
  const [expanded, setExpanded] = useState(false);

  const hasUtilities = tenancy.utilities[0].length > 0;

  return (
    <Card className="my-4">
      <CardHeader
        avatar={<Avatar>{tenancy.landlord.image}</Avatar>}
        title={tenancy.address.street}
        action={
          <IconButton onClick={() => setExpanded(!expanded)}>
            <InfoIcon />
          </IconButton>
        }
        subheader={`${tenancy.address.city} - ${tenancy.address.country}`}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Chip label={`${tenancy.rooms} rooms`} />
            {tenancy.size && <Chip label={`${tenancy.size} m2`} />}
          </Stack>
          {hasUtilities && (
            <>
              <p>With the following utilities:</p>
              <Stack direction="row" spacing={1}>
                {tenancy.utilities.map((u) => (
                  <Chip key={u} label={`${u}`} />
                ))}
              </Stack>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};
