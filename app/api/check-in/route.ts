import dbConn from "@/lib/dbConn"
import { jsonResponse } from "@/lib/jsonResponse";
import { CheckInTable, CheckInTableInterface } from "@/lib/models/check-in";

/**
 * @swagger
 * tags:
 *   - name: Bills
 *     description: Bills History Related APIs
 * /api/check-in:
 *   post:
 *     tags:
 *       - Bills
 *     description: Add History of Bill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               created_by:
 *                 type: string
 *                 example: "user123"
 *               total_bill:
 *                 type: number
 *                 example: 500
 *               table_id:
 *                 type: string
 *                 example: "table1"
 *               total_frame:
 *                 type: number
 *                 example: 3
 *               customer_name:
 *                 type: string
 *                 example: "John Doe"
 *               customer_phone:
 *                 type: string
 *                 example: "1234567890"
 *             required:
 *               - created_by
 *               - total_bill
 *               - table_id
 *               - total_frame
 *               - customer_name
 *               - customer_phone
 *     responses:
 *       201:
 *         description: Bill created successfully
 *       200:
 *         description: Validation error or server error
 *   get:
 *     tags:
 *       - Bills
 *     description: Get Bills by user_id
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *           format: objectid
 *         required: true
 *         description: Filter bills by user_id
 *     responses:
 *       200:
 *         description: List of bills
 */

export const POST = async (req: Request) => {
    await dbConn();
    try {
        const body = await req.json() as CheckInTableInterface;
        const { created_by, total_bill, customer_name } = body;
        if (!customer_name  || !created_by || !total_bill ) {
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

        if (searchParams.has("user_id")) {
            query.id = searchParams.get("user_id");
        }
        const data = await CheckInTable.find({created_by:query.id});
        return jsonResponse(data, 200)
    } catch (error) {
        console.log(error)
        return jsonResponse({ error: "Internal Server Error" }, 200)

    }
}