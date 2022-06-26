import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";
import { MONGO_URL } from "../../../helpers/dbUtils";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const client = await MongoClient.connect(MONGO_URL);

    const db = client.db("events");
    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();

    console.log(userEmail);
    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
