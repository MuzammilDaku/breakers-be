import dbConn from "@/lib/dbConn"
import { jsonResponse } from "@/lib/jsonResponse";
import { GameHistory } from "@/lib/models/gameHistory";



export const POST = async (req: Request) => {
    try {
        await dbConn();
        const body = await req.json();
        if(!body) {
            return jsonResponse({error:"Provide All Fields"},200)
        }

        const gameHistory = await GameHistory.create(body);
        return jsonResponse(gameHistory,201)

    } catch (error) {
        return jsonResponse({ error: "Internal Server Error" }, 200)
    }
}


export const GET = async (req: Request) => {
    try {
        await dbConn();
        const gameHistory = await GameHistory.find()
        return jsonResponse(gameHistory,201)

    } catch (error) {
        return jsonResponse({ error: "Internal Server Error" }, 200)
    }
}