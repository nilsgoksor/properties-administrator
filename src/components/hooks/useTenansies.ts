import axios from "axios";
import { useEffect, useState } from "react";
import { TenancyI } from "../../model";

export const useTenansies = () => {
  const [tenancies, setTenancies] = useState<TenancyI[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<TenancyI[]>("http://localhost:1337/tenancies")
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
