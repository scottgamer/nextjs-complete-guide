import { NextPage } from "next";
import { useRouter } from "next/router";

const Project: NextPage = () => {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h1>Project Name</h1>
    </div>
  );
};

export default Project;
