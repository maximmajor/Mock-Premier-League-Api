import ITeam from '../interfaces/teamInterface';
import accountRepository from '../repositories/accountRepository';
import { HttpException } from '../middlewares/HttpException';
import teamRepository from '../repositories/teamRepository';

class teamService {
    private accountRepository: accountRepository;
    private teamRepository: teamRepository;

    constructor() {
        this.accountRepository = new accountRepository();
        this.teamRepository = new teamRepository();
    }

    public async createTeam(data: any, accountId: string): Promise<ITeam | String> {
        const checkIfTeamExist = await this.teamRepository.findTeamByTeamName(data.teamName)
        if (checkIfTeamExist.length > 0) {
            throw new HttpException(409, 'Team Already Exist');
        }
        const createTeam: any = {
            teamName: data.teamName,
            accountId: accountId,
            teamMembers: data.teamMembers
        }
        const saveTeam = await this.teamRepository.createTeam(createTeam)
        return saveTeam!;
    }

    public async getAllTeams(): Promise<ITeam[]> {
        const teams: any = await this.teamRepository.findAllTeam();
        return teams
    }

    public async getTeamById(teamId: string): Promise<string | null> {
        const team: any = await this.teamRepository.findTeamById(teamId);
        if (!team) {
            throw new HttpException(409, 'Team does not exist');
        }
        return team
    }


    public async getTeamByAccountId(accountId: string): Promise<ITeam[] | null> {
        const team = await this.teamRepository.findTeamByAccountId(accountId);
        return team;
    }

    public async updateTeam(teamId: string, updateData: Partial<ITeam>): Promise<ITeam | null> {
        const team: any = await this.teamRepository.findTeamById(teamId);
        if (!team) {
            throw new HttpException(409, 'Team does not exist');
        }
        const updatedTeam = await this.teamRepository.updateTeam(teamId, updateData);
        return updatedTeam;
    }

    public async removeTeam(teamId: string): Promise<string | null> {
        const team: any = await this.teamRepository.removeTeam(teamId);
        if (!team) {
            throw new HttpException(409, 'Team does not exist');
        }
        return team
    }

    public async searchTeam(teamName: any, accountId: any): Promise<string | null> {
        const searchCriteria: any = {};

        if (teamName) {
            searchCriteria.teamName = { $regex: new RegExp(teamName, 'i') };
        }

        if (accountId) {
            searchCriteria.accountId = accountId;
        }
        const team: any = await this.teamRepository.searchTeam(searchCriteria);
        return team
    }

}

export default teamService;
