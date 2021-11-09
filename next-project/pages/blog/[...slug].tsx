import { NextPage } from "next";
import { useRouter } from "next/router";

const Blog: NextPage = () => {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>Blog Post page</h1>
    </div>
  );
};

export default Blog;
