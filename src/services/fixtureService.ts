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
        const checkIfFixtureExist = await this.teamRepository.findTeamByTeamName(data.teamName)
        if (checkIfFixtureExist.length > 0) {
            throw new HttpException(409, 'Fixture Already Exist');
        }
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
        const fixtures: any = await this.fixtureRepository.findAllFixture();
        return fixtures
    }

    public async getCompletedFixtures(): Promise<IFixture[]> {
        const fixtures: any = await this.fixtureRepository.findAllFixture();
        return fixtures
    }

    public async redirectToFixtureUrl(uniqueLink: string): Promise<IFixture[]> {
        const fixtures: any = await this.fixtureRepository.redirectToFixtureUrl(uniqueLink);
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
}

export default fixtureService;