import type { NextPage } from "next";

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

export async function getStaticProps() {
  // prepares props for the component to use
  return {
    props: {
      products: [{ id: "p1", title: "product 1" }],
    },
  };
}

export default Home;
