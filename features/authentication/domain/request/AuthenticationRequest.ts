export type AuthenticationRequest = {
  readonly email: string;
  readonly password: string;
};

export type LogoutRequest = {
  token: string;
};
