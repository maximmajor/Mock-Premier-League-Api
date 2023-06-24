import { Request, Response } from 'express';
import fixtureService from '../services/fixtureService';
import accountService from '../services/accountService';
import IFixture from '../interfaces/fixtureInterface';
import { HttpException } from '../middlewares/HttpException';

class fixtureController {
    private accountService: accountService;
    private fixtureService: fixtureService;

    constructor() {
        this.accountService = new accountService();
        this.fixtureService = new fixtureService();
    }

    public createFixture = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const fixtureData: IFixture = req.body;
            const baseUrl = `${req.protocol}://${req.get('host')}/`;
            const fixture = await this.fixtureService.createFixture(fixtureData, accountId, baseUrl);
            res.status(201).json(fixture);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };


    public getAllFixtures = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const fixtures = await this.fixtureService.getAllFixtures();
            res.status(200).json(fixtures);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };


    public getPendingFixtures = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const fixtures = await this.fixtureService.getPendingFixtures();
            res.status(200).json(fixtures);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };


    public getCompletedFixtures = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const fixtures = await this.fixtureService.getCompletedFixtures();
            res.status(200).json(fixtures);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public getFixtureById = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const fixtureId = req.params.fixtureId
            console.log(fixtureId)
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const fixtures = await this.fixtureService.getFixtureById(fixtureId);
            res.status(200).json(fixtures);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public getFixtureByAccountId = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const account = await this.accountService.getAccountById(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            }
            const fixtures = await this.fixtureService.getFixtureByAccountId(accountId);
            res.status(200).json(fixtures);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public updateFixture = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const fixtureId = req.params.fixtureId
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const updateData = req.body;
            const updatedFixture = await this.fixtureService.updateFixture(fixtureId, updateData);
            res.status(200).json(updatedFixture);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public async findByUniqueLink(req: Request, res: Response): Promise<void> {
        try {
            const { urlpath } = req.params;
            console.log(urlpath);
            if (!urlpath) {
                res.status(400).json({ error: 'URL path is required' });
                return
            }
            const link: any = await this.fixtureService.findByUniqueLink(urlpath);
            if (!link) {
                res.status(404).json({ error: ' URL not found' });
                return
            }
            res.status(200).json(link.uniqueLink);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public removeFixture = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const fixtureId = req.params.fixtureId
            console.log(fixtureId)
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const fixtures = await this.fixtureService.removeFixture(fixtureId);
            res.status(200).json(fixtures);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public searchFixture = async (req: Request, res: Response): Promise<void> => {
        try {
            const { uniqueLink, teamId, status } = req.query;
            const fixtures = await this.fixtureService.searchFixture(uniqueLink, teamId, status);
            res.status(200).json(fixtures);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };
}

export default fixtureController;
