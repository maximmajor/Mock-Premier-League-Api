import mongoose from 'mongoose';

export interface IAccount extends mongoose.Document {
    name: string;
    userName: string;
    email: string;
    password: string;
    avater: string;
    isAdmin: boolean;
    token: string;
}
export default IAccount