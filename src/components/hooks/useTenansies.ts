import axios from "axios";
import { useEffect, useState } from "react";
import { TenancyI } from "../../model";

export const useTenansies = () => {
  const [tenancies, setTenancies] = useState<TenancyI[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<TenancyI[]>(`${process.env.REACT_APP_API_URL}/tenancies`)
      .then((res) => {
        setTenancies(res.data);
        setLoading(false);
        setError("");
      })
      .catch(() => {
        setLoading(false);
        setError("Error fetching your tenancies");
      });
  }, []);

  return { tenancies, error, loading };
};
