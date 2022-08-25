import { DbAddAccount } from "../../data/usecases/addAccount/db-add-account";
import { AccountPostgresRepository } from "../../infra/db/postgres/account-repository/account";
import { SignUpController } from "../../presentation/controllers/signup/signup";
import { Controller } from "../../presentation/protocols";

export const makeSignUpController = (): Controller => {
  const accountPostgresRepository = new AccountPostgresRepository();
  const dbAddAccount = new DbAddAccount(accountPostgresRepository);
  return new SignUpController(dbAddAccount);
};
