import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const PortfolioProject: NextPage = () => {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <div className={styles.container}>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
};

export default PortfolioProject;
