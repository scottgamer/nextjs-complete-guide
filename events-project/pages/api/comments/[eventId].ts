import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);
    res.status(201).json({ message: "Comment added", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "1", name: "Richard", email: "email", text: "text" },
      { id: "2", name: "Ariel", email: "email", text: "text" },
      { id: "3", name: "name", email: "email", text: "text" },
    ];

    res.status(200).json({ comments: dummyList });
  }
};

export default handler;
