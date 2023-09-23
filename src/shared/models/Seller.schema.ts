import { Schema } from 'mongoose';

export const SellerSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        stir: {
            type: String,
            required: true
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)