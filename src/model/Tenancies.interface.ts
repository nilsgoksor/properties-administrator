import { AddressI, LandlordI } from ".";

export interface TenanciesI {
  address: AddressI;
  size: string;
  rooms: string;
  utilities: string[];
  landlord: LandlordI;
}
