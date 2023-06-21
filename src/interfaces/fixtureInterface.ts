import mongoose from 'mongoose';

export interface IFixture extends mongoose.Document {
    uniqueLink: string;
    accountId: mongoose.Schema.Types.ObjectId;
    team1: mongoose.Schema.Types.ObjectId;
    team2: mongoose.Schema.Types.ObjectId;
    scores: {
        team1: string
        team2: string
    }
    date: string;
    status: string
}
export default IFixture