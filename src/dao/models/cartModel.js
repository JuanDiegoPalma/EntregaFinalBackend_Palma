import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const cartCollection = 'carts'
const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
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

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;
