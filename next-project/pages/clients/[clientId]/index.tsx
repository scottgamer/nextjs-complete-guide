import { NextPage } from "next";
import { useRouter } from "next/router";

const ClientProjects: NextPage = () => {
  const router = useRouter();

  const loadProjectHandler = () => {
    router.push("/clients/richard/project-a");
  };

  return (
    <div>
      <h1>The Projects of a given Client</h1>
      <button onClick={loadProjectHandler}>Load project A</button>
    </div>
  );
};

export default ClientProjects;
