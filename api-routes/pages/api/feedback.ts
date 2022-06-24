import { NextApiHandler } from "next";
import fs from "fs/promises";
import path from "path";

// allows to execute server-side code
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    try {
      // store in DB or file
      const filePath = path.join(process.cwd(), "data", "feedback.json");
      const fileData = await fs.readFile(filePath);
      const data = JSON.parse(fileData.toString());
      const updatedData = [...data, newFeedback];

      await fs.writeFile(filePath, JSON.stringify(updatedData));
    } catch (error) {
      console.error(error);
    }

    res.status(201).json({ message: "Success", feedback: newFeedback });
  } else {
    res.status(200).json({
      message: "this works",
    });
  }
};

export default handler;
