import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface TransformedSale {
  id: string;
  username: any;
  volume: any;
}

interface LastSalesPageProps {
  sales: TransformedSale[];
}

type TransformedSales = TransformedSale[];

const LastSalesPage: NextPage<LastSalesPageProps> = (props) => {
  const [sales, setSales] = useState<TransformedSales>(props.sales);
  // const [isLoading, setLoading] = useState<boolean>(false);

  // use default fetch api
  const { data, error } = useSWR(
    "https://nextjs-course-c9cb8-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales: TransformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetch(
  //         "https://nextjs-course-c9cb8-default-rtdb.firebaseio.com/sales.json"
  //       );
  //       const sales = await data.json();
  //       const transformedSales: TransformedSales = [];

  //       for (const key in sales) {
  //         transformedSales.push({
  //           id: key,
  //           username: sales[key].username,
  //           volume: sales[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getData();
  // }, []);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
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

// will work as initial state for SSG
export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: { sales: transformedSales },
    revalidate: 10,
  };
};
