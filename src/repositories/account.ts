
import IAccount from '../interfaces/account';
import accountModel from '../models/account';

class accountRepository {
    public accountModel = accountModel;


    public async createAccount(data: IAccount): Promise<IAccount> {
        const signUpAccount = await this.accountModel.create(data);
        return signUpAccount
    }



    public async findAllAccounts(): Promise<IAccount[]> {
        const getAllAccounts = await this.accountModel.find().exec();
        return getAllAccounts;
    }


    public async findAccountById(accountId: string): Promise<IAccount | null> {
        const getAccount = await this.accountModel.findById({ _id: accountId });
        return getAccount;
    }

    public async findAccountByEmail(email: string): Promise<IAccount> {
        const getAccountByEmail = await this.accountModel.findOne({ email: email }).exec();
        return getAccountByEmail!;
    }

    public async findAllAdmin(accountId: string): Promise<IAccount> {
        const getAccountByEmail = await this.accountModel.findOne({ _id: accountId, isAdmin: true }).exec();
        return getAccountByEmail!;
    }

    public async findAllNoneAdmin(accountId: string): Promise<IAccount> {
        const getAccountByEmail = await this.accountModel.findOne({ _id: accountId, isAdmin: false }).exec();
        return getAccountByEmail!;
    }

    public async updateAccount(accountId: string, updateData: Partial<IAccount>): Promise<IAccount | null> {
        const updatedAccount: any = await this.accountModel.findByIdAndUpdate(accountId, updateData, { new: true }).exec();
        return updatedAccount;
    }

}

export default accountRepository;