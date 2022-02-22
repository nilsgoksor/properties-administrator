import {
  Alert,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material";
import { TenancyI } from "../../model";
import InfoIcon from "@mui/icons-material/InfoRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";

interface TenancyProps {
  tenancy: TenancyI;
  removeTenacy(removeIndex: string): void;
}

export const Tenancy = ({ tenancy, removeTenacy }: TenancyProps) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [removing, setRemoving] = useState(false);

  const hasUtilities = tenancy.utilities[0].length > 0;

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:1337/tenancies/${tenancy.id}`)
      .then(() => {
        setRemoving(false);
        removeTenacy(tenancy.id);
      })
      .catch(() => {
        setRemoving(false);
      });
  };

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
          <CardActions>
            <IconButton onClick={() => setEditing(!editing)} disabled>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => setRemoving(!removing)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
          {removing && (
            <>
              <Alert severity="warning" className="my-4">
                Are you sure you want to delete this tenancy?
              </Alert>
              <Button onClick={deleteHandler}>Delete</Button>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};
