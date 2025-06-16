import dbConn from "@/lib/dbConn"
import {  CheckInTableInterface } from "@/lib/models/check-in";
import { jsonResponse } from "../route";
import mongoose from "mongoose";
let CheckInTable;
if (mongoose.models.CheckInTable) {
    CheckInTable = mongoose.models.CheckInTable;
} else {
    // Import or define your TableSchema here
    const {CheckInTableSchema} = require("@/lib/models/check-in")
    CheckInTable = mongoose.model("Table", CheckInTableSchema);
}
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
        return jsonResponse({ error: "Internal Server Error" }, 200)
    }
}

export const GET = async () => {
    await dbConn();
    try {
        const data = await CheckInTable.find();
        return jsonResponse(data,200)
    } catch (error) {
        return jsonResponse({ error: "Internal Server Error" }, 200)
        
    }
}