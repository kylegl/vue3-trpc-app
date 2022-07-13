import { createTRPCClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import type { AppRouter } from '~/server/trpc/'

// polyfill

const sleep = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms))

const url = 'http://localhost:3000/trpc'

export const client = createTRPCClient<AppRouter>({
  links: [
    () =>
      ({ op, prev, next }) => {
        console.log('->', op.type, op.path, op.input)

        return next(op, (result) => {
          console.log('<-', op.type, op.path, op.input, ':', result)
          prev(result)
        })
      },
    httpBatchLink({ url }),
  ],
})

export const testAPI = async () => {
  await sleep()

  // parallel queries
  await Promise.all([
  //
    client.query('hello'),
    client.query('hello', 'client'),
  ])

  await sleep()
  const postCreate = await client.mutation('post.create', {
    title: 'hello client',
  })
  console.log('created post', postCreate.title)
  await sleep()
  const postList = await client.query('post.list')
  console.log('has posts', postList, 'first:', postList[0].title)
  await sleep()
  try {
    await client.query('admin.secret')
  }
  catch (cause) {
  // will fail
  }
  await sleep()
  const authedClient = createTRPCClient<AppRouter>({
    links: [loggerLink(), httpBatchLink({ url })],
    headers: () => ({
      authorization: 'secret',
    }),
  })

  await authedClient.query('admin.secret')

  const msgs = await client.query('messages.list')
  console.log('msgs', msgs)

  console.log('👌 should be a clean exit if everything is working right')
}

