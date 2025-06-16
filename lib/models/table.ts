import mongoose, { Schema, Document } from 'mongoose';
import { User } from './users';

export interface ITable extends Document {
    name: string;
    minute_rate: number;
    created_by: mongoose.Types.ObjectId;
}

const TableSchema: Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        minute_rate: { type: Number, required: true, min: 0 },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true }
    }
);

export const Table = mongoose.models.Table as mongoose.Model<ITable> || mongoose.model<ITable>("Table", TableSchema);