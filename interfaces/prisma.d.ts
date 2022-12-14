type PrismaInfo =
  | import("@prisma/client").Prisma.RejectOnNotFound
  | import("@prisma/client").Prisma.RejectPerOperation
  | undefined;
