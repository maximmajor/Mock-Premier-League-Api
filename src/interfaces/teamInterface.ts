import mongoose from 'mongoose';

export interface ITeam extends mongoose.Document {
    teamName: string;
    accountId: mongoose.Schema.Types.ObjectId;
    teamMembers: [{
        name: string,
        role: string,
    }]
}
export default ITeam