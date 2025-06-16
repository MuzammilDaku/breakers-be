import { jsonResponse } from "@/lib/jsonResponse";
import dbConn from "@/lib/dbConn";
import { User } from "@/lib/models/users";

interface LoginBody {
    phone: string;
    password: string;
};

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

        if(user) {
            const isPasswordValid = user.password === body.password; // Replace with a proper hash comparison in production
            if (!isPasswordValid) {
                return jsonResponse({ error: "Invalid password" }, 200);
            }
        }

        return jsonResponse(user, 200);

    } catch (error) {
        console.error("Error during login:", error);
        return jsonResponse({ error: "Internal server error" }, 500);
    }
}