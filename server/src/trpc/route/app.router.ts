// ~/server/trpc/index.ts
import { createRouter } from '../createRouter'
import { clientRouter } from './client.router'
import { contactRouter } from './contact.router'
import { userRouter } from './user.router'
export * from '../createContext'

export const appRouter = createRouter()
  .merge('users.', userRouter)
  .merge('clients.', clientRouter)
  .merge('contacts.', contactRouter)


export type AppRouter = typeof appRouter