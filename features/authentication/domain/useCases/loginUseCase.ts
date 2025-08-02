import { IUseCase } from "@/core/interfaces/IUseCase";
import { Either } from "fp-ts/lib/Either";
import { Authentication } from "../models/Authentication";
import { AuthenticationRepository } from "../repositories/AuthenticationRepository";
import { AuthenticationRequest } from "../request/AuthenticationRequest";

export type loginUseCaseResponse = Promise<Either<string, Authentication>>;
export type loginUseCaseRequest = AuthenticationRequest;

export const loginUseCase = (
  authenticationRepository : AuthenticationRepository
) : IUseCase<loginUseCaseRequest, loginUseCaseResponse> => ( {
  execute : async ( request ) => authenticationRepository.login( request )
} );