import {
  MissingParamError,
  ServerError,
} from "../../errors/index";
import { SignUpController } from "./signup";
import {
  AddAccountModel,
  AddAccount,
  ProductModel,
  HttpRequest,
} from "./signup-protocols";
import { ok, serverError, badRequest } from "../../helpers/http-helper";

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<ProductModel> {
      const fakeAccount = {
        id: "valid_ID",
        name: "valid_name",
        price: 0,
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

const makeFakeAccount = (): ProductModel => ({
  id: "valid_ID",
  name: "valid_name",
  price: 0,
});

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "valid_name",
    price: "valid_price",
  },
});

interface sutTypes {
  sut: SignUpController;
  addAccountStub: AddAccount;
}
const makeSut = (): sutTypes => {
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController( addAccountStub);
  return { sut, addAccountStub };
};

describe("Signup Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        price: "any_price",
      },
    };
    const httpResponse = await await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("name")));
  });

  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("Should call AddAcount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, "add");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      price: "valid_price",
    });
  });

  test("Should return 500 if AddAccount Throws", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      throw new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      serverError(new ServerError(null))
    );
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });
});
