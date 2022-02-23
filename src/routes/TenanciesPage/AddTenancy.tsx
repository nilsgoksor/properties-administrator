import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { RoomSizes } from "../../constants";
import { LandlordI, TenancyI } from "../../model";
import axios from "axios";
import { v4 } from "uuid";
import { StreetDataI } from "../../model/StreetData.interface";

interface AddTenancyProps {
  landlord: LandlordI;
  addTenancy(t: TenancyI): void;
}

export const AddTenancy = ({ landlord, addTenancy }: AddTenancyProps) => {
  const [showAddTenancy, setShowAddTenancy] = useState(false);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [rooms, setRooms] = useState("");
  const [size, setSize] = useState("");
  const [utilities, setUtilities] = useState("");

  const [streetSearch, setStreetSearch] = useState("");
  const [streetResults, setStreetResults] = useState<StreetDataI[]>([]);

  const addTenancyHandler = () => {
    const id = v4();
    const newTenancy: TenancyI = {
      id: id,
      address: {
        country: country,
        street: street,
        city: city,
        postCode: postCode,
      },
      rooms: rooms,
      size: size,
      utilities: utilities.split(","),
      landlord: landlord,
    };

    axios
      .post<TenancyI>(`${process.env.REACT_APP_API_URL}/tenancies`, newTenancy)
      .then((res) => {
        setShowAddTenancy(false);
        addTenancy(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.dataforsyningen.dk/autocomplete?q=${streetSearch}&type=adresse&caretpos=6&supplerendebynavn=true&stormodtagerpostnumre=true&multilinje=true&fuzzy=`
      )
      .then((res) => setStreetResults(res.data));
  }, [streetSearch]);

  const handleSelectStreet = (newStreet: string) => {
    console.log(newStreet);

    setStreetSearch(newStreet);
    setStreet(newStreet);
  };

  const streetData = streetResults.find((r) => r.tekst === street);
  const streetValid = typeof streetData?.tekst === "string";
  const validInfo =
    streetValid && country.length > 2 && city.length > 2 && rooms !== "";

  return (
    <div className="my-4">
      <Button onClick={() => setShowAddTenancy(true)}>Add Tenancy</Button>
      <Modal show={showAddTenancy} hide={() => setShowAddTenancy(false)}>
        <div className="flex flex-col space-y-4 > * + *">
          <h2 className="text-2xl">New tenancy</h2>
          <TextField
            required
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextField
            required
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Autocomplete
            options={streetResults.map((o) => o.tekst)}
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => <TextField {...params} label="Street" />}
            value={streetSearch}
            onInputChange={(e: any) => setStreetSearch(e?.target?.value)}
            onChange={(e, v: any) => handleSelectStreet(v as string)}
          />
          <TextField
            label="Postcode"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          />
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Rooms</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rooms}
              label="Rooms"
              onChange={(e) => setRooms(e.target.value)}
            >
              {RoomSizes.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <TextField
            label="Utilities"
            fullWidth
            value={utilities}
            onChange={(e) => setUtilities(e.target.value)}
            helperText="Separated by comma, i.e. Dishwasher,WiFi"
          />
          <div className="flex justify-end">
            <Button onClick={() => addTenancyHandler()} disabled={!validInfo}>
              Create
            </Button>
            <Button onClick={() => setShowAddTenancy(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
