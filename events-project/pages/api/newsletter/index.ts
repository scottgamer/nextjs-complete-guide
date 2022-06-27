import { NextApiHandler } from "next";
import { MongoClient, Document } from "mongodb";
import { MONGO_URL } from "../../../helpers/dbUtils";

const connectDB = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  return client;
};

const insertDocument = async (client: MongoClient, document: Document) => {
  const db = client.db("events");
  await db.collection("newsletter").insertOne(document);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Connecting to DB failed" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
    }

    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
