import mongoose, { Schema, Document } from 'mongoose';

export interface ITable extends Document {
    name: string;
    minute_rate: number;
    created_by: mongoose.Types.ObjectId;
}

const TableSchema: Schema = new Schema(
    {
        name: { type: String, required: true, },
        minute_rate: { type: Number, required: true, min: 0 },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }   
    },
    { timestamps: true }
);

export const Table = mongoose.model("Table",TableSchema);