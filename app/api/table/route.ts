import dbConn from "@/lib/dbConn";
import mongoose from "mongoose";
import { jsonResponse } from "@/lib/jsonResponse";

let Table;
if (mongoose.models.Table) {
    Table = mongoose.models.Table;
} else {
    // Import or define your TableSchema here
    const { TableSchema } = require("@/lib/models/table");
    Table = mongoose.model("Table", TableSchema);
}

export const POST = async (request: Request) => {
    await dbConn();
    try {
        // Ensure the mongoose models are not re-registered
        if (!mongoose.models.Table) {
            // Import or define your Table model here if not already registered
            // Example:
            // import { TableSchema } from "@/lib/models/table";
            // mongoose.model("Table", TableSchema);
        }

        const body = await request.json();
        const { name, minute_rate, created_by , _id , century_rate ,one_red_rate ,ten_red_rate,six_red_rate } = body;

        if (!name || !minute_rate || !created_by) {
            return new Response(JSON.stringify({ error: "All fields are required" }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        const newTable = await Table.create(body);

        return new Response(JSON.stringify(newTable), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating table:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export const GET = async (req:Request) => {
    await dbConn();
    try {
        const tables = await Table.find();
        return jsonResponse(tables, 200)
    } catch (error) {
        console.log(error)
        return jsonResponse({ error: "Internal Server Error" }, 200)
    }
}