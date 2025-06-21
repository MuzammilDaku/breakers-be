import mongoose, { Schema, Document } from 'mongoose';
import { User } from './users';

export interface ITable extends Document {
    name: string;
    created_by: mongoose.Types.ObjectId;
    six_red_rate:Number;
    ten_red_rate:Number;
    century_rate:Number;
    one_red_rate:Number;
    fifteen_red_rate:Number;
    _id:string
}

const TableSchema: Schema = new mongoose.Schema<ITable>(
    {
        name: { type: String, required: true },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
        six_red_rate:{type:Number,required:true},
        one_red_rate:{type:Number,required:true},
        ten_red_rate:{type:Number,required:true},
        century_rate:{type:Number,required:true},
        fifteen_red_rate:{type:Number,required:true},
        _id:{type:String,required:true}
    }
);

export const Table = mongoose.models.Table as mongoose.Model<ITable> || mongoose.model<ITable>("Table", TableSchema);