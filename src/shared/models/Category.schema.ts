import { Schema, Types } from 'mongoose';

export const CategorySchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        parentCategory: {
            type: Schema.Types.ObjectId,
            ref: 'category'
        }
    },
    {
        timestamps: true
    }
)