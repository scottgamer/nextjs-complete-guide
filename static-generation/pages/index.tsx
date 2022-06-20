import type { GetStaticProps, NextPage } from "next";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

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
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

// TODO: fix type error
export const getStaticProps: GetStaticProps = async (context) => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return {
      redirect: { destination: "/no-data" },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

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
