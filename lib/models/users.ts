import mongoose from "mongoose";

export interface IUser {
    name: string;
    phone: string;
    role?: 'owner' | 'user';
    password: string;
    status?:'running' | 'expired';
    date:Date
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['owner', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
    },
    status:{
        type:String,
        enum:['running','expired'],
        default:"running"
    },
    date:{
        type: Date,
        default: Date.now
    }
});


export const User = mongoose.models.User || mongoose.model('User', userSchema);