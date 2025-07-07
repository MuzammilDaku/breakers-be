import dbConn from "@/lib/dbConn"
import { jsonResponse } from "@/lib/jsonResponse";
import { Customer } from "@/lib/models/customer";



export const POST = async (req: Request) => {
    try {
        await dbConn();
        const body = await req.json();
        if(!body.name) {
            return jsonResponse({error:"Provide Name"},200)
        }

        const customer = await Customer.create(body);
        return jsonResponse(customer,201)

    } catch (error) {
        return jsonResponse({ error: "Internal Server Error" }, 200)
    }
}


export const GET = async (req: Request) => {
    try {
        await dbConn();
        const customers = await Customer.find()
        return jsonResponse(customers,201)

    } catch (error) {
        return jsonResponse({ error: "Internal Server Error" }, 200)
    }
}