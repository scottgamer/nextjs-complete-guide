import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import fs from "fs/promises";

const ProductDetailsPage: NextPage = ({ loadedProduct }) => {
  if (!loadedProduct) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const productId = params.product_id;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({
    params: { product_id: id },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
};

export default ProductDetailsPage;
