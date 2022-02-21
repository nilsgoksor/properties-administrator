import { useEffect, useState } from "react";
import { useTenansies } from "../../components/hooks";
import { Tenancy } from "../../components/Tenancy";
import { TenancyI } from "../../model";
import { AddTenancy } from "./AddTenancy";

export const TenanciesPage = () => {
  const landlord = {
    name: "Nils Goksör",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQGNKlxYFTg5Mg/profile-displayphoto-shrink_400_400/0/1517249338479?e=1651104000&v=beta&t=QX_l-xoQle_osVmoG9bH4RckO0Tvyl3Xx4zPg3x-g-I",
  };

  const [yourTenancies, setYourTenancies] = useState<TenancyI[]>([]);
  const { tenancies, loading, error } = useTenansies();

  useEffect(() => {
    setYourTenancies(tenancies);
  }, [tenancies]);

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  return (
    <>
      <AddTenancy
        landlord={landlord}
        addTenacy={(t: TenancyI) => setYourTenancies([...yourTenancies, t])}
      />
      <h2>These are your tenancies</h2>
      {yourTenancies.length > 0 ? (
        <>
          {yourTenancies.map((tenancy) => (
            <Tenancy key={tenancy.address.street} tenancy={tenancy} />
          ))}
        </>
      ) : (
        <p>You own no tenancies</p>
      )}
    </>
  );
};
