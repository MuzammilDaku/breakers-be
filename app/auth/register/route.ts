import { IUser, User } from '@/lib/models/users';
import dbConn from '@/lib/dbConn';
import { jsonResponse } from '@/app/route';

export const POST = async (req: Request) => {
    await dbConn();

    try {
        const body: IUser = await req.json();
        console.log('Registration request body:', body);
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
            password: body.password, // In a real application, you should hash the password before saving
            role: body.role || 'user', // Default role is 'user'
        });
        await newUser.save();
        // Respond with the created user
        return jsonResponse(newUser, 201);
    } catch (error) {
        console.error('Error during registration:', error);
        return jsonResponse({ error: 'Internal server error' }, 500);
    }
}
