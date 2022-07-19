import { createTRPCClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import superjson from 'superjson'
import type { AppRouter } from '../../../server/src/trpc/route/app.router'
import { createVueQueryHooks } from './createVueQueryHooks'

const url = 'http://localhost:2022/trpc'

export const client = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      maxBatchSize: 10,
      url,
    }),
  ],
  transformer: superjson,
})

export const trpc = createVueQueryHooks<AppRouter>()

