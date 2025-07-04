import { jsonResponse } from "@/lib/jsonResponse";
import dbConn from "@/lib/dbConn";
import { User } from "@/lib/models/users";


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 * /api/auth/renew:
 *   post:
 *     tags:
 *       - Auth
 *     description: Renew Date For Subscription of User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: objectid
 *                 example: "60d21b4667d0d8992e610c85"
 *             required:
 *               - id
 *     responses:
 *       201:
 *         description: User
 */

export async function POST(req: Request) {
    await dbConn();
    const body = await req.json();

    if (!body.id) {
        return jsonResponse({ error: "Id Required" }, 200);
    }

    try {
        const user = await User.findById(body.id);
        if (!user) {
            return jsonResponse({ error: "User not found" }, 200);
        }
        // console.log(new Date())
        user.status = "running";
        user.date = new Date();
        await user.save();

        return jsonResponse(user, 201);

    } catch (error) {
        console.error("Error during login:", error);
        return jsonResponse({ error: "Internal server error" }, 200);
    }
}