import mongoose from 'mongoose';
import { IAccount } from '../interfaces/accountInterface';

const accountSchema = new mongoose.Schema<IAccount>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        avater: {
            type: String,
            trim: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
       
        token: {
            type: String,
            trim: true,
        },

    },
    {
        timestamps: true,
    },
);
accountSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const accountModel = mongoose.model('account', accountSchema);
export default accountModel;