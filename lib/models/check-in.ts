import mongoose, { Schema, Document, Mongoose } from 'mongoose';
import { User } from './users';

export interface CheckInTableInterface extends Document {
    created_by: mongoose.Types.ObjectId;
    total_frame?:number;
    total_bill:number;
    customer_name:string;
    date?:any;
    _id:string;
    game_type:string[];
    game_mode:string[]
    time_played?:number;
    table_names:string[];
    bill_type:string;
}

const CheckInTableSchema: Schema = new mongoose.Schema<CheckInTableInterface>(
    {
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
        total_bill: { type: Number, required: true },
        customer_name: { type: String, required: true },
        total_frame: { type: Number },
        date: { type: String,required:true},
        _id: { 
            type: String, 
            default: () => new mongoose.Types.ObjectId().toString() 
        },
        game_type:{type:[String]},
        game_mode:{type:[String]},
        table_names:{type:[String]},
        time_played:{type:Number},
        bill_type:{type:String,default:"automatic"}
    }
);

export const CheckInTable = mongoose.models.CheckInTable || mongoose.model("CheckInTable",CheckInTableSchema);