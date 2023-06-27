import clientPromise from "../../../lib/mongodb";
import Project from "@/Models/Project";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const client = await clientPromise;
        const db = client.db("project-opener");
        const projects = await db.collection<Project>("projects").find({}).toArray();
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
