import clientPromise from "../../../lib/mongodb";
import Project from "@/Models/Project";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("project-opener");

    switch (req.method) {
      case "GET": {
        const project = await db
          .collection<Project>("projects")
          .findOne({ _id: new ObjectId(req.query.id as string) });
        if (!project) {
          res.status(404).json({ message: "Not Found" });
        } else {
          res.status(200).json(project);
        }
        break;
      }

      case "POST": {
        const project = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const result = await db.collection("projects").insertOne(project);
        if (!result) {
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json({ message: "Project Created", result });
        }
        break;
      }

      case "PUT": {
        const updatedProject = req.body;
        const result = await db
          .collection<Project>("projects")
          .findOneAndUpdate(
            { _id: new ObjectId(req.query.id as string) },
            { $set: updatedProject },
            { returnDocument: "after" }
          );
        if (!result.value) {
          res.status(404).json({ message: "Project not found" });
        } else {
          res.status(200).json(result.value);
        }
        break;
      }

      case "DELETE": {
        const project = await db
            .collection<Project>("projects")
            .findOneAndDelete({ _id: new ObjectId(req.query.id as string) });
        if (!project.value) {
            res.status(404).json({ message: "Project not found" });
        } else {
            res.status(200).json({ message: "Project deleted" });
        }
        break;
      }

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
