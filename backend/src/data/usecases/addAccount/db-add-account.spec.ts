import {
  ProductModel,
  AddAccountModel,
  AddAccountRepository,
} from "./db-add-account-protocols";
import { DbAddAccount } from "./db-add-account";

const makeFakeAccount = (): ProductModel => ({
  id: "valid_id",
  name: "valid_name",
  price: 0,
});

const makeFakeAccountData = (): AddAccountModel => ({
  name: "valid_name",
  price: 0,
});

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<ProductModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
};

interface sutTypes {
  sut: DbAddAccount;
  addAccountReposityStub: AddAccountRepository;
}

const makeSut = (): sutTypes => {
  const addAccountReposityStub = makeAddAccountRepository();
  const sut = new DbAddAccount(addAccountReposityStub);
  return { sut,  addAccountReposityStub };
};
describe("DbAddAccount Usecase", () => {
  test("Should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountReposityStub } = makeSut();
    const addSpy = jest.spyOn(addAccountReposityStub, "add");
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });
  test("Should return an account on success", async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });
});
