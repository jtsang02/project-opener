import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addProject(
    req: NextApiRequest, 
    res: NextApiResponse): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db("project-opener");
    console.log(req.body);
    const project = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const result = await db.collection("projects").insertOne(project);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
