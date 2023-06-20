import IAccount from '../interfaces/account';
import bcrypt from 'bcrypt';
import accountRepository from '../repositories/account';

class accountService {
    private accountRepository: accountRepository;

    constructor() {
        this.accountRepository = new accountRepository();
    }

    public async createAccount(data: IAccount): Promise<IAccount | String> {
        const { password, isAdmin } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        if(isAdmin === true ){
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


    public async getAllAdmin(accountId: string): Promise<IAccount> {
        const accounts: any = await this.accountRepository.findAllAdmin(accountId);
        return accounts;
    }

    public async getAllNoneAdmin(accountId: string): Promise<IAccount> {
        const users = await this.accountRepository.findAllNoneAdmin(accountId);
        return users;
    } 

    public async getAccountById(accountId: string): Promise<IAccount | null> {
        const account = await this.accountRepository.findAccountById(accountId);
        return account;
    }

    public async updateAccount(accountId: string, updateData: Partial<IAccount>): Promise<IAccount | null> {
        const { password } = updateData;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await this.accountRepository.updateAccount(accountId, updateData);
        return updatedUser;
    }
}

export default accountService;
