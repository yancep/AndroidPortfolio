import { IUseCase } from "@/core/interfaces/IUseCase";
import { ApplicationContainer } from "@/ioc/application.container";
import { AuthenticationServicesSymbols } from "../../ioc/AuthenticationServiceSymbols";
import { loginUseCaseRequest, loginUseCaseResponse } from "./loginUseCase";
import { logoutUseCaseResponse } from "./logoutUseCase";

const loginUseCase = ApplicationContainer.get<IUseCase<loginUseCaseRequest, loginUseCaseResponse>>(
  AuthenticationServicesSymbols.useCases.LOGIN_USE_CASE
);

const logoutUseCase = ApplicationContainer.get<IUseCase<void, logoutUseCaseResponse>>(
  AuthenticationServicesSymbols.useCases.LOGOUT_USE_CASE
);

export { loginUseCase, logoutUseCase };

