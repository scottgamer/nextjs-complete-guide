import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    `mongodb+srv://arielgamer:9VEY5dBL7BZE2mPa@cluster0.5bpz9.mongodb.net/?retryWrites=true&w=majority`
  );

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
      email,
      name,
      text,
      eventId,
    };

    const db = client.db("events");
    await db.collection("comments").insertOne(newComment);

    res.status(201).json({ message: "Comment added", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db("events");
    const comments = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments });
  }

  client.close();
};

export default handler;
