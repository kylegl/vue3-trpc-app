import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { createRouter } from '../createRouter'
import { createUserSchema, requestOtpSchema, verifyOtpSchema } from '../../schema/user.schema'


export const userRouter = createRouter()
  .mutation('register-user', {
    input: createUserSchema,

    async resolve({ ctx, input }) {
      const { email, name } = input

      try {
        const user = await ctx.prisma.user.create({
          data: {
            email,
            name,
          },
        })

        return user
      }
      catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            })
          }
        }

        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Do you smell smoke?',
        })
      }
    },
  })
  .query('get-users', {
    resolve: async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany()

      return users
    }
  })