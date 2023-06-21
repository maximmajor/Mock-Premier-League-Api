import mongoose from 'mongoose';

export interface IFixture extends mongoose.Document {
    uniqueLink: string;
    accountId: mongoose.Schema.Types.ObjectId;
    team1: mongoose.Schema.Types.ObjectId;
    team2: mongoose.Schema.Types.ObjectId;
    date: Date;
    completed: string
}
export default IFixture