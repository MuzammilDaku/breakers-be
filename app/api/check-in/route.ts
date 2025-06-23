import dbConn from "@/lib/dbConn"
import { jsonResponse } from "@/lib/jsonResponse";
import { CheckInTable, CheckInTableInterface } from "@/lib/models/check-in";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
    await dbConn();
    try {
        const body = await req.json() as CheckInTableInterface;
        const { created_by, total_bill, table_id, total_frame, customer_name, customer_phone } = body;
        if (!customer_name || !customer_phone || !total_frame || !created_by || !total_bill || !table_id) {
            return jsonResponse({ error: "All fields are required" }, 200)
        }
        const checkIn = await CheckInTable.create(body);
        return jsonResponse(checkIn, 201)
    } catch (error) {
        console.error(error)
        return jsonResponse({ error: "Internal Server Error" }, 200)
    }
}

export const GET = async (req:Request) => {
    await dbConn();
    try {
        const { searchParams } = new URL(req.url);
        const query: any = {};

        // Example: filter by name if provided in query string
        if (searchParams.has("user_id")) {
            query.id = searchParams.get("user_id");
        }
        const data = await CheckInTable.find({created_by:query.id});
        return jsonResponse(data, 200)
    } catch (error) {
        return jsonResponse({ error: "Internal Server Error" }, 200)

    }
}