import { AddressI, LandlordI } from ".";

export interface TenancyI {
  address: AddressI;
  size: string;
  rooms: string;
  utilities: string[];
  landlord: LandlordI;
}
