import mongoose from 'mongoose';
import { ITeam } from '../interfaces/teamInterface';

const teamSchema = new mongoose.Schema<ITeam>(
    {
        teamName: {
            type: String,
            required: true,
            trim: true,
        },
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account"
        },
        teamMembers:  [
            {
                name: {
                    type: String,
                },
                role: {
                    type: String,
                }, 
            }
        ],

    },
    {
        timestamps: true,
    },
);
teamSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const teamModel = mongoose.model('team', teamSchema);
export default teamModel;