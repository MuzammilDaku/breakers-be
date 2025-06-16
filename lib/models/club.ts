import mongoose from "mongoose";

export interface IClub {
    user: mongoose.Types.ObjectId;
    name: string;
    location: string;
    tables: number;
    contactNumber: string;
    openingHours: string;
    facilities: string[];
    createdAt?: Date;
}

const clubSchema = new mongoose.Schema<IClub>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    tables: {
        type: Number,
        required: true,
        min: 1
    },
    contactNumber: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    facilities: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export const Club = mongoose.models.Club || mongoose.model('Club', clubSchema);