import IAccount from '../interfaces/accountInterface';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import accountRepository from '../repositories/accountRepository';
import { HttpException } from '../middlewares/HttpException';

class accountService {
    private accountRepository: accountRepository;

    constructor() {
        this.accountRepository = new accountRepository();
    }

    public async createAccount(data: IAccount): Promise<IAccount | String> {
        const { password, isAdmin } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (isAdmin === true) {
            const accountData: any = { ...data, password: hashedPassword, isAdmin: true };
            const signUpAccount = await this.accountRepository.createAccount(accountData);
            return signUpAccount;
        }
        const accountData: any = { ...data, password: hashedPassword };
        const signUpAccount = await this.accountRepository.createAccount(accountData);
        return signUpAccount;
    }

    public async getAllAccounts(): Promise<IAccount[]> {
        const accounts = await this.accountRepository.findAllAccounts();
        return accounts;
    }


    public async login(email: string, password: string): Promise<string | null> {
        const account: any = await this.accountRepository.findAccountByEmail(email);
        if (!account) {
            throw new HttpException(409, 'Account is not found');
        }
        const passwordMatch = await bcrypt.compare(password, account.password);
        if (!passwordMatch) {
            throw new HttpException(409, 'Invalid password');
        }
        const token = jwt.sign({ userId: account._id }, 'secretWord' as Secret, {
            expiresIn: '24h',
        });
        return token;
    }

    public async getAuthAccount(userId: string): Promise<string | null> {
        const user: any = await this.accountRepository.findAccountById(userId);
        if (!user) {
            throw new HttpException(409, 'Account is not');
        }
        return user
    }

    public async getAccountById(accountId: string): Promise<IAccount | null> {
        const account = await this.accountRepository.findAccountById(accountId);
        return account;
    }

    public async getAllAdmin(): Promise<IAccount[]> {
        const accounts = await this.accountRepository.findAllAdmin();
        return accounts;
    }

    public async getAllNoneAdmin(): Promise<IAccount[]> {
        const users = await this.accountRepository.findAllNoneAdmin();
        return users;
    }


    public async updateAccount(accountId: string, updateData: Partial<IAccount>): Promise<IAccount | null> {
        const { password } = updateData;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        const updatedAccount = await this.accountRepository.updateAccount(accountId, updateData);
        return updatedAccount;
    }


    public async removeAccount(accountId: string): Promise<IAccount | null> {
        const account = await this.accountRepository.removeAccount(accountId);
        return account;
    }
}

export default accountService;
