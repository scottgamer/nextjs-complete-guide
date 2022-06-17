import type { GetStaticProps, NextPage } from "next";
import fs from "fs/promises";
import path from "path";

interface HomeProps {
  products: { id: string; title: string }[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  if (!products) {
    <p>loading...</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{[product.title]}</li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  // prepares props for the component to use
  return {
    props: {
      products: data.products,
    },
    // refresh data every 10 seconds
    revalidate: 10,
  };
};

export default Home;
