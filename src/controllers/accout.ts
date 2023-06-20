import { Request, Response } from 'express';
import accountService from '../services/account';
import IAccount from '../interfaces/account';
import { HttpException } from '../middlewares/HttpException';

class accountController {
    private accountService: accountService;

    constructor() {
        this.accountService = new accountService();
    }

    public createAccount = async (req: Request, res: Response): Promise<void> => {
        try {
            const accountData: IAccount = req.body;
            const account = await this.accountService.createAccount(accountData);
            res.status(201).json(account);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };


    public getAllAccounts = async (req: Request, res: Response): Promise<void> => {
        try {
            const accounts = await this.accountService.getAllAccounts();
            res.status(200).json(accounts);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public getAccountById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { accountId } = req.params;
            const account = await this.accountService.getAccountById(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            } else {
                res.status(200).json(account);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };

    public getAllNoneAdmin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { accountId } = req.params;
            const account = await this.accountService.getAllNoneAdmin(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            } else {
                res.status(200).json(account);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };



    public getAllAdmin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { accountId } = req.params;
            const account = await this.accountService.getAllAdmin(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            } else {
                res.status(200).json(account);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };



    public updateAccount = async (req: Request, res: Response): Promise<void> => {
        console.log(req.params.args)
        try {
            const { accountId } = req.params;
            const updateData: Partial<IAccount> = req.body;
            const updatedAccount = await this.accountService.updateAccount(accountId, updateData);
            if (!updatedAccount) {
                res.status(404).json({ message: 'Account not found' });
            } else {
                res.status(200).json(updatedAccount);
            }
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

export default accountController;
