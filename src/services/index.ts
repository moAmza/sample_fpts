import { initRepositories } from "../repos";
import { mapServices } from "../utilities/service-config-utilities";
import { genAuthService } from "./auth-service";
import { genUserService } from "./user-service";

export type lazyServicesType = {
  auth: ReturnType<typeof genAuthService>;
  user: ReturnType<typeof genUserService>;
};

export const initServices = (repos: ReturnType<typeof initRepositories>) => {
  const lazyServices: lazyServicesType = {
    auth: genAuthService(repos.userRepo, repos.verifierRepo),
    user: genUserService(repos.userRepo),
  };

  const services = mapServices(lazyServices);

  return services;
};
