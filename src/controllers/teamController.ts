import { Request, Response } from 'express';
import teamService from '../services/teamService';
import accountService from '../services/accountService';
import ITeam from '../interfaces/teamInterface';
import { HttpException } from '../middlewares/HttpException';

class teamController {
    private teamService: teamService;
    private accountService: accountService;

    constructor() {
        this.teamService = new teamService();
        this.accountService = new accountService();
    }

    public createTeam = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const teamData: ITeam = req.body;
            const team = await this.teamService.createTeam(teamData, accountId);
            res.status(201).json(team);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };


    public getAllTeams = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const teams = await this.teamService.getAllTeams();
            res.status(200).json(teams);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public getTeamById = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const teamId = req.params.teamId
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const teams = await this.teamService.getTeamById(teamId);
            res.status(200).json(teams);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public getTeamByAccountId = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const account = await this.accountService.getAccountById(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            }
            const teams = await this.teamService.getTeamByAccountId(accountId);
            res.status(200).json(teams);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public updateTeam = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const teamId = req.params.teamId
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const updateData = req.body;
            const updatedTeam = await this.teamService.updateTeam(teamId, updateData);
            res.status(200).json(updatedTeam);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };


    public removeTeam = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountId = req.user
            const teamId = req.params.teamId
            const getAuthAccount = await this.accountService.getAuthAccount(accountId);
            if (!getAuthAccount) {
                res.status(401).json({ message: 'Account Not Found' });
                return;
            }
            const teams = await this.teamService.removeTeam(teamId);
            res.status(200).json(teams);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };


    public searchTeam = async (req: Request, res: Response): Promise<void> => {
        try {
            const { teamName, accountId } = req.query;
            const teams = await this.teamService.searchTeam(teamName, accountId);
            res.status(200).json(teams);
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

export default teamController;
