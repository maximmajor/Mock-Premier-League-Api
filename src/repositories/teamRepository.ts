
import ITeam from '../interfaces/teamInterface';
import teamModel from '../models/teamModel';

class teamRepository {
    public teamModel = teamModel;


    public async createTeam(data: ITeam): Promise<ITeam> {
        const team = await this.teamModel.create(data);
        return team
    }


    public async findAllTeam(): Promise<ITeam[]> {
        const getAllTeams = await this.teamModel.find().populate('accountId').exec();
        return getAllTeams;
    }


    public async findTeamById(teamId: string): Promise<ITeam | null> {
        const getTeam = await this.teamModel.findById({ _id: teamId });
        return getTeam;
    }

    public async findTeamByAccountId(accountId: string): Promise<ITeam[]> {
        const getAccountByuserName = await this.teamModel.find({ accountId: accountId }).exec();
        return getAccountByuserName!;
    }


    public async findTeamByTeamName(teamName: string): Promise<ITeam[]> {
        const getTeamByTeamNamel = await this.teamModel.find({ teamName: teamName }).exec();
        return getTeamByTeamNamel!;
    }


    public async updateTeam(teamId: string, updateData: Partial<ITeam>): Promise<ITeam | null> {
        const updatedTeam: any = await this.teamModel.findByIdAndUpdate(teamId, updateData, { new: true }).exec();
        return updatedTeam;
    }

    public async removeTeam(teamId: string): Promise<ITeam | null> {
        const removeTeam: any = await this.teamModel.findByIdAndRemove({ _id: teamId })
        return removeTeam;
    }

    public async searchTeam(searchCriteria: any): Promise<ITeam | null> {
        const searchTeam: any = await this.teamModel.find(searchCriteria).populate('accountId').exec();
        return searchTeam;
    }
}

export default teamRepository;