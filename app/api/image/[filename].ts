import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { filename } = req.query; 
    const decodedFilename = decodeURIComponent(filename as string);
    const filePath = path.join(
      process.cwd(),
      "path/to/images",
      decodedFilename
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader("Content-Type", "image/jpeg"); // Adjust based on file type
    res.send(imageBuffer);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
