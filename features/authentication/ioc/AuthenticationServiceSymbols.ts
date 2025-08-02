export const AuthenticationServicesSymbols = {
  dataSources: {
    AUTHENTICATION_DATA_SOURCES: Symbol("AuthenticationDataSourcesImpl"),
  },
  repositories: {
    AUTHENTICATION_REPOSITORY: Symbol("AuthenticationRepositoryImpl"),
  },
  useCases: {
    LOGIN_USE_CASE: Symbol("loginUseCase"),
    LOGOUT_USE_CASE: Symbol("logoutUseCase"),
  },
};
