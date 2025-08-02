import { IUseCase } from "@/core/interfaces/IUseCase";
import { Either } from "fp-ts/lib/Either";
import { AuthenticationRepository } from "../repositories/AuthenticationRepository";

export type logoutUseCaseResponse = Promise<Either<string, any>>;

export const logoutUseCase = (
  authenticationRepository : AuthenticationRepository
) : IUseCase<void, logoutUseCaseResponse> => ( {
  execute : async () => authenticationRepository.logout()
} );