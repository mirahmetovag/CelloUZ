import { Schema } from 'mongoose';

export const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        interests: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'category'
                }
        ],
        watchedProducts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'product'
                }
        ],
        favourites: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'product'
                }
        ],
        balance: {
            type: Number,
            default: 0
        },
        role: {
            type: ['Admin', 'User'],
            default: 'User'
        }
    },
    {
        timestamps: true
    }
)