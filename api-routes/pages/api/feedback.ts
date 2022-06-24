import { NextApiHandler } from "next";
import fs from "fs/promises";
import path from "path";
import { FeedbackItem } from "..";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export const extractFeedback = async (
  filePath: string
): Promise<FeedbackItem[]> => {
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData.toString());
  return data;
};

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
      const filePath = buildFeedbackPath();
      const data = await extractFeedback(filePath);
      const updatedData = [...data, newFeedback];

      await fs.writeFile(filePath, JSON.stringify(updatedData));
    } catch (error) {
      console.error(error);
    }

    res.status(201).json({ message: "Success", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = await extractFeedback(filePath);
    res.status(200).json({
      feedback: data,
    });
  }
};

export default handler;
