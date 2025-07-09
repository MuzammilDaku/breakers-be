import mongoose from "mongoose";

export interface IUser {
    name: string;
    date:Date;
    _id:string;
}

const customerSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required:true
    },
    _id:{
        type:String,
        required:true
    }
});


export const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);