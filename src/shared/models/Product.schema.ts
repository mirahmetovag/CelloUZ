import { Schema, Types } from 'mongoose';

export const ProductSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'category',
            required: true
        },
        brandId: {
            type: Schema.Types.ObjectId,
            ref: 'brand',
            required: true
        },
        pricePerUnit: {
            type: Number,
            required: true
        },
        availableAmount: {
            type: Number,
            required: true
        },
        size: {
            type: ['Standart', 'S', 'M', 'L'],
            default: 'Standart'
        },
        imageName: {
            type: String,
            required: true
        },
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: 'seller',
            required: true
        }
    },
    {
        timestamps: true
    }
)