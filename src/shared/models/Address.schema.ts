import { Schema, Types } from 'mongoose';

export const AddressSchema = new Schema (
    {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        house: {
            type: Number,
            required: true
        },
        apartment: {
            type: Number,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
    },
    {
        timestamps: true
    }
)