
import IAccount from '../interfaces/accountInterface';
import accountModel from '../models/accountModel';

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

    public async findAccountByUserName(userName: string): Promise<IAccount> {
        const getAccountByuserName = await this.accountModel.findOne({ userName: userName }).exec();
        return getAccountByuserName!;
    }


    public async findAllAdmin(): Promise<IAccount[]> {
        const getAccountByEmail = await this.accountModel.find({ isAdmin: true }).exec();
        return getAccountByEmail!;
    }

    public async findAllNoneAdmin(): Promise<IAccount[]> {
        const getAccountByEmail = await this.accountModel.find({ isAdmin: false }).exec();
        return getAccountByEmail!;
    }

    public async updateAccount(accountId: string, updateData: Partial<IAccount>): Promise<IAccount | null> {
        const updatedAccount: any = await this.accountModel.findByIdAndUpdate(accountId, updateData, { new: true }).exec();
        return updatedAccount;
    }


    public async removeAccount(accountId: string): Promise<IAccount | null> {
        const removeAccount: any = await this.accountModel.findByIdAndRemove({ _id: accountId })
        return removeAccount;
    }

}

export default accountRepository;