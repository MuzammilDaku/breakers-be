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
        const { name, created_by , _id , century_rate ,one_red_rate ,ten_red_rate,six_red_rate , fifteen_red_rate } = body;

        if (!name || !created_by || !century_rate || !one_red_rate || !six_red_rate || !ten_red_rate ||!fifteen_red_rate) {
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

export const GET = async (req: Request) => {
    await dbConn();
    try {
        const { searchParams } = new URL(req.url);
        const query: any = {};

        // Example: filter by name if provided in query string
        if (searchParams.has("user_id")) {
            query.id = searchParams.get("user_id");
        }

        const tables = await Table.find({_id:query.id});
        return jsonResponse(tables, 200);
    } catch (error) {
        console.log(error);
        return jsonResponse({ error: "Internal Server Error" }, 200);
    }
};

export const PUT = async (request: Request) => {
    await dbConn();
    try {
        const body = await request.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return jsonResponse({ error: "_id is required" }, 200);
        }

        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        const updatedTable = await Table.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedTable) {
            return jsonResponse({ error: "Table not found" }, 200);
        }

        return jsonResponse(updatedTable, 201);
    } catch (error) {
        console.error("Error updating table:", error);
        return jsonResponse({ error: "Internal server error" }, 200);
    }
};

export const DELETE = async (request: Request) => {
    await dbConn();
    try {
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return jsonResponse({ error: "_id is required" }, 200);
        }

        const deletedTable = await Table.findByIdAndDelete(_id);

        if (!deletedTable) {
            return jsonResponse({ error: "Table not found" }, 200);
        }

        return jsonResponse({ message: "Table deleted successfully" }, 201);
    } catch (error) {
        console.error("Error deleting table:", error);
        return jsonResponse({ error: "Internal server error" }, 200);
    }
};
