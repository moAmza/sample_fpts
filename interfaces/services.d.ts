type ServiceTypes = "auth" | "user";

type AllServicesType = ReturnType<
  typeof import("../src/services/index").initServices
>;

type GetServiceType<Services extends ServiceTypes> = <T extends Services>(
  key: T
) => AllServicesType[T];
