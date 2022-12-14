type DtoInputType<
  A extends { [i: string]: (args: any) => any },
  k extends keyof typeof authDto.input
> = ReturnType<A[k]> extends import("fp-ts/TaskEither").TaskEither<
  infer B,
  infer C
>
  ? C
  : never;
