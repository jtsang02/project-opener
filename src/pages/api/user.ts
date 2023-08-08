import clientPromise from "../../../lib/mongodb";
import Staff from "@/Models/Staff";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const client = await clientPromise;
        const db = client.db("project-opener");

        switch (req.method) {
            case "GET": {
                const staff = await db
                    .collection<Staff>("staff")
                    // @ts-ignore - _id is not a string
                    .findOne({ _id: new ObjectId(req.query.id as string) });
                if (!staff) {
                    res.status(404).json({ message: "Not Found" });
                } else {
                    res.status(200).json(staff);
                }
                break;
            }

            case "DELETE": {
                const result = await db
                    .collection("staff")
                    .deleteOne({ _id: new ObjectId(req.query.id as string) });
                if (!result) {
                    res.status(500).json({ message: "Internal Server Error" });
                } else {
                    res.status(200).json({ message: "Staff Member Deleted", result });
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