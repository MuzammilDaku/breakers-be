import dbConn from "@/lib/dbConn";
import { User } from "@/lib/models/users";

export function jsonResponse(data: any, status: number ) {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

export async function GET() {
  await dbConn(); // Ensure the database connection is established
  const users = await User.find(); // Assuming User is imported from your models
  return jsonResponse(users, 200);
}
