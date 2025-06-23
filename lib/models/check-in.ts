import mongoose, { Schema, Document, Mongoose } from 'mongoose';
import { User } from './users';
import { Table } from './table';

export interface CheckInTableInterface extends Document {
    created_by: mongoose.Types.ObjectId;
    total_frame:number;
    total_bill:number;
    table_id:string;
    customer_name:string;
    customer_phone:string;
    received_amount:number;
    date?:any;
    _id:string;
    types:string
    time_played:string;
    frames:string
}

const CheckInTableSchema: Schema = new mongoose.Schema<CheckInTableInterface>(
    {
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
        table_id: { type: String, ref: Table, required: true },
        total_bill: { type: Number, required: true },
        customer_name: { type: String, required: true },
        customer_phone: { type: String, required: true },
        total_frame: { type: Number, required: true },
        received_amount: { type: Number, default: 0 },
        date: { type: Date, default: new Date() },
        _id: { 
            type: String, 
            default: () => new mongoose.Types.ObjectId().toString() 
        },
        types:{type:String,required:true},
        time_played:{type:String,required:true},
        frames:{type:String,required:true},


    },
    { timestamps: true }
);

export const CheckInTable = mongoose.models.CheckInTable || mongoose.model("CheckInTable",CheckInTableSchema);