// ~/server/trpc/index.ts
import { createRouter } from '../createRouter'
import { userRouter } from './user.router'
export * from '../createContext'

export const appRouter = createRouter()
  .merge('users.', userRouter)

export type AppRouter = typeof appRouter