import { GetServerSideProps, NextPage } from "next";

interface UserProfilePageProps {
  username: string;
}

const UserProfilePage: NextPage<UserProfilePageProps> = ({ username }) => {
  return <h1>{username}</h1>;
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      username: "Richard",
    },
  };
};
