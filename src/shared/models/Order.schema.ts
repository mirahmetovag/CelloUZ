import { Schema, Types } from 'mongoose';

export const OrderSchema = new Schema (
    {
        status: {
            type: ['Not Completed', 'New', 'Accepted', 'With currier', 'Delivered'],
            default: 'Not Completed'
        },
        products: 
        [
            {
                productId: {
                    type: Types.ObjectId,
                    required: true,
                    ref: 'product'
                },
                pricePerUnit: {
                    type: Number,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ],
        total: {
            type: Number,
            required: true
        },
        addressId: {
            type: Schema.Types.ObjectId,
            ref: 'address',
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    },
    {
        timestamps: true
    }
)