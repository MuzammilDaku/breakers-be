import { jsonResponse } from "@/lib/jsonResponse";
import dbConn from "@/lib/dbConn";
import { User } from "@/lib/models/users";

interface LoginBody {
    phone: string;
    password: string;
};

export async function POST(req: Request) {
    await dbConn();
    const body = await req.json();

    if (!body.id) {
        return jsonResponse({ error: "Id Required" }, 400);
    }

    try {
        const user = await User.findById(body.id);
        if (!user) {
            return jsonResponse({ error: "User not found" }, 200);
        }
        console.log(new Date())
        user.status = "running";
        user.date = new Date();
        await user.save();

        return jsonResponse(user, 200);

    } catch (error) {
        console.error("Error during login:", error);
        return jsonResponse({ error: "Internal server error" }, 500);
    }
}