import { IUser, User } from '@/lib/models/users';
import dbConn from '@/lib/dbConn';
import { jsonResponse } from "@/lib/jsonResponse";

// /**
//  * @swagger
//  * tags:
//  *   - name: Auth
//  *     description: Authentication related endpoints
//  * /api/auth/register:
//  *   post:
//  *     tags:
//  *       - Auth
//  *     description: Create New User
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
//  *               name:
//  *                 type: string
//  *                 example: "John Dow"
//  *               password:
//  *                 type: string
//  *                 example: "yourpassword"
//  *             required:
//  *               - phone
//  *               - password
//  *               - name
//  *     responses:
//  *       201:
//  *         description: User
//  */

export const POST = async (req: Request) => {
    await dbConn();

    try {
        const body: IUser = await req.json();
        // console.log('Registration request body:', body);
        if (!body.name || !body.phone || !body.password) {
            return jsonResponse({ error: 'Name, phone, and password are required' }, 400);
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ phone: body.phone });
        if (existingUser) {
            return jsonResponse({ error: 'User already exists with this phone number' }, 409);
        }
        // Create a new user
        const newUser = new User({
            name: body.name,
            phone: body.phone,
            password: body.password, 
            role: body.role || 'user',
        });
        await newUser.save();
        // Respond with the created user
        return jsonResponse(newUser, 201);
    } catch (error) {
        console.error('Error during registration:', error);
        return jsonResponse({ error: 'Internal server error' }, 500);
    }
}
