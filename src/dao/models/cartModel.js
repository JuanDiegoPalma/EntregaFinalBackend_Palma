import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const cartCollection = 'carts'
const cartSchema = new mongoose.Schema(
    {
        productos: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'productos',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        status: {
            type: String,
            enum: ['active', 'completed', 'cancelled'],
            default: 'active'
        }
    },
    {
        timestamps: true
    }
);

cartSchema.plugin(paginate);

export const cartModel=mongoose.model(
    cartCollection,
    cartSchema
)
