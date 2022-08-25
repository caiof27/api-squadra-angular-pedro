import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
} from "./db-add-account-protocols";
export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository;
  constructor(addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData)
    );
    return account;
  }
}
