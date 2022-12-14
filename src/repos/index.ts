import { PrismaClient } from "@prisma/client";
import { genUserRepo } from "./user-repo";
import { genVerifierRepo } from "./verifier-repo";

export const initRepositories = (prisma: PrismaClient) => ({
  userRepo: genUserRepo(prisma.user),
  verifierRepo: genVerifierRepo(prisma.verifier),
});
