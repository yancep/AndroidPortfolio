import { AuthenticationModule } from "@/features/authentication/ioc/Authentication.Module";
import { ServicesModule } from "@/features/shared/Services.Module";
import { UserModule } from "@/features/users/domain/User.Module";
import { NetworkModule } from "@/ioc/common/network.module";
import { Container } from "inversify";
import { TokenServiceModule } from "./common/tokenService.module";

const ApplicationContainer = new Container({
  skipBaseClassChecks: true,
  defaultScope: "Singleton",
  autoBindInjectable: true,
});

const initializeContainer = () => {
  //Common
  ApplicationContainer.load(TokenServiceModule);
  ApplicationContainer.load(NetworkModule);

  //Authentication
  ApplicationContainer.load(AuthenticationModule);

  //Services
  ApplicationContainer.load(ServicesModule);

  //Shared features
  ApplicationContainer.load(UserModule);

  //Features:
  //DataSources

  //Repositories

};

initializeContainer();

export { ApplicationContainer, initializeContainer };

