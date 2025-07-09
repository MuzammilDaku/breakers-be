import dbConn from "@/lib/dbConn";
import mongoose from "mongoose";
import { jsonResponse } from "@/lib/jsonResponse";
import { InUseTable } from "@/lib/models/inUseTable";


export const POST = async (request: Request) => {
    await dbConn();
    try {
        const body = await request.json();
  
        const inUseTable = await InUseTable.create(body);

        return new Response(JSON.stringify(inUseTable), {
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

export const GET = async (req: Request) => {
    await dbConn();
    try {
        const { searchParams } = new URL(req.url);
        const query: any = {};

        // Example: filter by name if provided in query string
        if (searchParams.has("user_id")) {
            query.id = searchParams.get("user_id");
        }

        const tables = await InUseTable.find({ created_by: query.id });
        return jsonResponse(tables, 200);
    } catch (error) {
        console.log(error);
        return jsonResponse({ error: "Internal Server Error" }, 200);
    }
};

export const DELETE = async (req: Request) => {
    await dbConn();
    try {
        const { searchParams } = new URL(req.url);

        const query: any = {};

        if (searchParams.has("id")) {
            query.id = searchParams.get("id");
        }
        
        if (!query) {
            return jsonResponse({ error: "_id is required" }, 200);
        }

        const deletedTable = await InUseTable.findByIdAndDelete(query.id);

        if (!deletedTable) {
            return jsonResponse({ error: "Table not found" }, 200);
        }

        return jsonResponse({ message: "Table deleted successfully" }, 201);
    } catch (error) {
        console.error("Error deleting table:", error);
        return jsonResponse({ error: "Internal server error" }, 200);
    }
};
