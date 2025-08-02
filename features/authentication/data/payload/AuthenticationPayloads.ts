export type AuthenticationPayload = {
  email: string;
  password: string;
};

export type RegisterUserPayload = {
  profile: {
    name: string;
    firstLastName: string;
    secondLastName: string;
    identityCard: string;
    phone: string;
  };
  password: string;
  username: string;
  email: string;
};

export type UpdateUserPayload = {
  is_enabled?: boolean;
};
