import { PrismaClient } from "@prisma/client";
import { initRepositories } from "./repos";
import { initServices } from "./services";
import express, { urlencoded } from "express";
import { initControllers } from "./controllers";
import { initRouters } from "./routes";
import { json } from "body-parser";
import { pipe } from "fp-ts/lib/function";

const run = async () => {
  const router = pipe(
    new PrismaClient(),
    initRepositories,
    initServices,
    initControllers,
    initRouters
  );

  express()
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(router)
    .listen(3000, () => console.log("listening on 3000"));
};

run().catch(console.log);
