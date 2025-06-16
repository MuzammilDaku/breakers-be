import dbConn from "@/lib/dbConn";
import { jsonResponse } from "@/lib/jsonResponse";
import { User } from "@/lib/models/users";

export async function GET() {
  await dbConn(); // Ensure the database connection is established
  const users = await User.find(); // Assuming User is imported from your models
  return jsonResponse(users, 200);
}
