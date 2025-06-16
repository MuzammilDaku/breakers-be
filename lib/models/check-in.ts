import mongoose, { Schema, Document } from 'mongoose';
import { User } from './users';
import { Table } from './table';

export interface CheckInTableInterface extends Document {
    created_by: mongoose.Types.ObjectId;
    total_frame:number;
    status: "paid" | "unpaid";
    total_bill:number;
    table_id:mongoose.Types.ObjectId;
    customer_name:string;
    customer_phone:string;
    received_amount:number;
    date?:any
}

const CheckInTableSchema: Schema = new mongoose.Schema<CheckInTableInterface>(
    {
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
        table_id: { type: mongoose.Schema.Types.ObjectId, ref: Table, required: true },
        total_bill:{type:Number,required:true},
        status:{type:String,enum:["paid","unpaid"],default:"unpaid"},
        customer_name:{type:String,required:true},
        customer_phone:{type:String,required:true},
        total_frame:{type:Number,required:true},
        received_amount:{type:Number,default:0},
        date:{type:Date,default:new Date()}
    },
    { timestamps: true }
);

export const CheckInTable = mongoose.models.CheckInTable || mongoose.model("CheckInTable",CheckInTableSchema);