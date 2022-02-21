import { Tenancy } from "../../components/Tenancy";
import { TenancyI } from "../../model";

export const TenanciesPage = () => {
  const tenancies: TenancyI[] = [
    {
      address: {
        country: "Sweden",
        city: "Lund",
        street: "Lokföraregatan 17c",
        postCode: "22738",
      },
      size: "70",
      rooms: "3",
      utilities: ["Dishwasher", "Beers"],
      landlord: { name: "Nils Goksör" },
    },
  ];

  return (
    <>
      <p>These are your tenancies</p>
      {tenancies.map((tenancy) => (
        <Tenancy tenancy={tenancy} />
      ))}
    </>
  );
};
