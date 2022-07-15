import { clientSchema } from "../../schema/client.schema";
import { createRouter } from '../createRouter'

export const clientRouter = createRouter()
  .mutation('create-client', {
    input: clientSchema,
    async resolve({ ctx, input }) {
      const { name, email, phone, address } = input
      const client = await ctx.prisma.client.create({
        data: {
          name,
          email,
          phone,
          address,
        },
      })

      return client
    }
  })
  // get all clients
  .query('get-clients', {
    async resolve({ ctx }) {
      const clients = await ctx.prisma.client.findMany()

      return clients
    }
  })