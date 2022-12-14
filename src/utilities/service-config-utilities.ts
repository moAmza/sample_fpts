import { lazyServicesType } from "../services";

const getService =
  (lazyServices: lazyServicesType) =>
  <T extends ServiceTypes>(type: T): ReturnType<typeof lazyServices[T]> =>
    //@ts-ignore
    lazyServices[type](getService(lazyServices));

export const mapServices = (
  lazyServices: lazyServicesType
): {
  [key in keyof typeof lazyServices]: ReturnType<typeof lazyServices[key]>;
} =>
  Object.keys(lazyServices).reduce(
    (cur, val) => ({
      ...cur,
      [val]: getService(lazyServices)(val as keyof typeof lazyServices),
    }),
    {} as any
  );
