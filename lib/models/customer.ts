import mongoose from "mongoose";

export interface IUser {
    name: string;
    date:Date
}

const customerSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
});


export const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);