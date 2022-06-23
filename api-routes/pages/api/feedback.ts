import { NextApiHandler } from "next";

// allows to execute server-side code
const handler: NextApiHandler = (req, res) => {
  res.status(200).json({
    message: "this works",
  });
};

export default handler;
