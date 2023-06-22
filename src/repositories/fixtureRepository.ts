import { IFixture } from './../interfaces/fixtureInterface';
import fixtureModel from '../models/fixtureModel';

class fixtureRepository {
    public fixtureModel = fixtureModel;


    public async createFixture(data: IFixture): Promise<IFixture> {
        const fixture = await this.fixtureModel.create(data);
        return fixture
    }

    
    public async findAllFixture(): Promise<IFixture[]> {
        const getAllFixtures = await this.fixtureModel.find().populate(['accountId', 'team1', 'team2']).exec();
  return getAllFixtures;
    }


    public async findFixtureById(fixtureId: string): Promise<IFixture | null> {
        const getFixture = await this.fixtureModel.findById({ _id: fixtureId });
        return getFixture;
    }

    public async findFixtureByAccountId(accountId: string): Promise<IFixture[]> {
        const getFixtureById = await this.fixtureModel.find({ accountId: accountId }).exec();
        return getFixtureById!;
    }


    public async findPendingFixtures(): Promise<IFixture[]> {
        const getPendingFixtures = await this.fixtureModel.find({ status: "Pending" }).exec();
        return getPendingFixtures!;
    }

    public async findCompletedFixtures(): Promise<IFixture[]> {
        const getCompletedFixtures = await this.fixtureModel.find({ status: "Completed" }).exec();
        return getCompletedFixtures!;
    }

    public async findByUniqueLink(uniqueLink: string): Promise<IFixture[]> {
        const getFixture = await this.fixtureModel.find({ uniqueLink: uniqueLink}).exec();
        return getFixture!;
    }

    public async updateFixture(fixtureId: string, updateData: Partial<IFixture>): Promise<IFixture | null> {
        const updatedFixture: any = await this.fixtureModel.findByIdAndUpdate({_id: fixtureId}, updateData, { new: true }).exec();
        return updatedFixture;
    }

    public async removeFixture(fixtureId: string): Promise<IFixture | null> {
        const removeAccount: any = await this.fixtureModel.findByIdAndRemove({_id: fixtureId})
        return removeAccount;
    }

    public async searchFixture(searchCriteria: any): Promise<IFixture | null> {
        const searchFixture: any = await this.fixtureModel.find(searchCriteria)
        .populate('accountId')
        .populate('team1')
        .populate('team2')
        .exec();
        return searchFixture;
    }

}

export default fixtureRepository;