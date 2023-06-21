import mongoose from 'mongoose';
import { IFixture} from '../interfaces/fixtureInterface';

const fixtureSchema = new mongoose.Schema<IFixture>(
    {
        uniqueLink: {
            type: String,
            unique: true,
            required: true,
          },
          accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account"
        },
          team1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
            required: true,
          },
          team2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
          completed: {
            type: String,
            default: 'Pending',
          },
    },
    {
        timestamps: true,
    },
);
fixtureSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const fixtureModel = mongoose.model('fixture', fixtureSchema);
export default fixtureModel;