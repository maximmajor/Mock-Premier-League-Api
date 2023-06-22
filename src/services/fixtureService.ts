import IFixture from '../interfaces/fixtureInterface';
import accountRepository from '../repositories/accountRepository';
import { HttpException } from '../middlewares/HttpException';
import teamRepository from '../repositories/teamRepository';
import fixtureRepository from '../repositories/fixtureRepository';
import shortid from 'shortid';

class fixtureService {
    private accountRepository: accountRepository;
    private teamRepository: teamRepository;
    private fixtureRepository: fixtureRepository

    constructor() {
        this.accountRepository = new accountRepository();
        this.teamRepository = new teamRepository();
        this.fixtureRepository = new fixtureRepository();
    }

    public async createFixture(data: any, accountId: string, baseUrl: string): Promise<IFixture | String> {
        const generateShortUrlPath = `${shortid.generate()}`
        const createFixture: any = {
            uniqueLink: `${baseUrl}${generateShortUrlPath}`,
            accountId: accountId,
            team1: data.team1,
            team2: data.team2,
            date: data.date
        }
        const saveFixture = await this.fixtureRepository.createFixture(createFixture)
        return saveFixture!;
    }

    public async getAllFixtures(): Promise<IFixture[]> {
        const fixtures: any = await this.fixtureRepository.findAllFixture();
        return fixtures
    }

    public async getPendingFixtures(): Promise<IFixture[]> {
        const fixtures: any = await this.fixtureRepository.findPendingFixtures();
        return fixtures
    }

    public async getCompletedFixtures(): Promise<IFixture[]> {
        const fixtures: any = await this.fixtureRepository.findCompletedFixtures();
        return fixtures
    }

    public async findByUniqueLink(uniqueLink: string): Promise<IFixture[]> {
        const fixtures: any = await this.fixtureRepository.findByUniqueLink(uniqueLink);
        return fixtures
    }

    public async getFixtureById(fixtureId: string): Promise<string | null> {
        const fixture: any = await this.fixtureRepository.findFixtureById(fixtureId);
        if (!fixture) {
            throw new HttpException(409, 'fixture does not exist');
        }
        return fixture
    }


    public async getFixtureByAccountId(accountId: string): Promise<IFixture[] | null> {
        const fixture = await this.fixtureRepository.findFixtureByAccountId(accountId);
        return fixture;
    }

    public async updateFixture(fixtureId: string, updateData: Partial<IFixture>): Promise<IFixture | null> {
        const fixture: any = await this.fixtureRepository.findFixtureById(fixtureId);
        if (!fixture) {
            throw new HttpException(409, 'fixture does not exist');
        }
        const updatedFixture = await this.fixtureRepository.updateFixture(fixtureId, updateData);
        return updatedFixture;
    }

    public async removeFixture(fixtureId: string): Promise<string | null> {
        const fixture: any = await this.fixtureRepository.removeFixture(fixtureId);
        if (!fixture) {
            throw new HttpException(409, 'fixture does not exist');
        }
        return fixture
    }

    public async searchFixture(uniqueLink: any, teamId: any, status: any): Promise<string | null> {
        const searchCriteria: any = {};

    if (uniqueLink) {
      searchCriteria.uniqueLink = { $regex: new RegExp(uniqueLink, 'i') };
    }

    if (teamId) {
      searchCriteria.$or = [
        { team1: teamId },
        { team2: teamId },
      ];
    }

    if (status) {
      searchCriteria.status = status;
    }
        const team: any = await this.fixtureRepository.searchFixture(searchCriteria);
        return team
    }
}

export default fixtureService;