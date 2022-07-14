import { prisma } from '../prisma/prisma'
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';

export function createContext({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) {
  return {
    req,
    res,
    prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;