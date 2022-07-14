import { createTRPCClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import superjson from 'superjson'
import type { AppRouter } from '../../../server/src/trpc/route/app.router'

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

// export const testAPI = async () => {
//   await sleep()

//   // parallel queries
//   await Promise.all([
//   //
//     client.query('hello'),
//     client.query('hello', 'client'),
//   ])

//   await sleep()
//   const postCreate = await client.mutation('post.create', {
//     title: 'hello client',
//   })
//   console.log('created post', postCreate.title)
//   await sleep()
//   const postList = await client.query('post.list')
//   console.log('has posts', postList, 'first:', postList[0].title)
//   await sleep()
//   try {
//     await client.query('admin.secret')
//   }
//   catch (cause) {
//   // will fail
//   }
//   await sleep()
//   const authedClient = createTRPCClient<AppRouter>({
//     links: [loggerLink(), httpBatchLink({ url })],
//     headers: () => ({
//       authorization: 'secret',
//     }),
//   })

//   await authedClient.query('admin.secret')

//   const msgs = await client.query('messages.list')
//   console.log('msgs', msgs)

//   console.log('👌 should be a clean exit if everything is working right')
// }
