import { jsonResponse } from "@/lib/jsonResponse";
import dbConn from "@/lib/dbConn";
import { User } from "@/lib/models/users";

interface LoginBody {
    phone: string;
    password: string;
};

// /**
//  * @swagger
//  * tags:
//  *   - name: Auth
//  *     description: Authentication related endpoints
//  * /api/auth/login:
//  *   post:
//  *     tags:
//  *       - Auth
//  *     description: Returns The User
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               phone:
//  *                 type: string
//  *                 example: "1234567890"
//  *               password:
//  *                 type: string
//  *                 example: "yourpassword"
//  *             required:
//  *               - phone
//  *               - password
//  *     responses:
//  *       200:
//  *         description: User
//  */

export async function POST(req: Request) {
    await dbConn();
    const body: LoginBody = await req.json();

    if (!body.phone || !body.password) {
        return jsonResponse({ error: "Phone and password are required" }, 400);
    }

    try {
        const user = await User.findOne({ phone: body.phone }).select('+password');
        if (!user) {
            return jsonResponse({ error: "User not found" }, 200);
        }

        if (user) {
            const isPasswordValid = user.password === body.password; // Replace with a proper hash comparison in production
            if (!isPasswordValid) {
                return jsonResponse({ error: "Invalid password" }, 200);
            }
        }

        if (user.status === "expired") {
            return jsonResponse({ error: "Registeration Expired!" }, 200)
        }

        const userDate = new Date(user.date ?? user.get('date'));
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - userDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 30) {
            await User.findByIdAndUpdate(user._id, { $set: { status: "expired" } });
            return jsonResponse({ error: "Registeration Expired!" }, 200)
        }

        return jsonResponse(user, 200);

    } catch (error) {
        console.error("Error during login:", error);
        return jsonResponse({ error: "Internal server error" }, 500);
    }
}