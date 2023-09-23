import { Schema, Types } from 'mongoose';

export const BrandSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)