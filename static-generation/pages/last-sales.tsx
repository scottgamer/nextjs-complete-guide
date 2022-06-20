import { NextPage } from "next";
import { useEffect, useState } from "react";

interface TransformedSale {
  id: string;
  username: any;
  volume: any;
}

type TransformedSales = TransformedSale[];

const LastSalesPage: NextPage = () => {
  const [sales, setSales] = useState<TransformedSales>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetch(
          "https://nextjs-course-c9cb8-default-rtdb.firebaseio.com/sales.json"
        );
        const sales = await data.json();
        const transformedSales: TransformedSales = [];

        for (const key in sales) {
          transformedSales.push({
            id: key,
            username: sales[key].username,
            volume: sales[key].volume,
          });
        }

        setSales(transformedSales);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data fetched</p>;
  }

  return (
    <ul>
      {sales?.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
