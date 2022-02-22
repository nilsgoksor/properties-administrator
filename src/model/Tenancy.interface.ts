import { AddressI, LandlordI } from ".";

export interface TenancyI {
  id: string;
  address: AddressI;
  size: string;
  rooms: string;
  utilities: string[];
  landlord: LandlordI;
}
