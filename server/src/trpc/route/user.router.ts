import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { createRouter } from '../createRouter'
import { createUserSchema, requestOtpSchema, verifyOtpSchema } from '../../schema/user.schema'
import { sendLoginEmail } from '../../utils/mailer'
import { encode, decode } from '../../utils/base64'
import { signJwt } from '../../utils/jwt'
import { baseUrl } from '../../constants'
import { serialize } from 'cookie'


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
  .mutation('request-otp', {
    input: requestOtpSchema,
    async resolve({ ctx, input }) {
      const { email, redirect } = input
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      // send email to user
      await sendLoginEmail({
        email: user.email,
        url: baseUrl,
        token: encode(`${token.id}:${user.email}`),
      })

      return true
    },
  })
  .query('verify-otp', {
    input: verifyOtpSchema,
    async resolve({ ctx, input }) {
      const decoded = decode(input.hash)
      const [id, email] = decoded.split(':')

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
        include: {
          user: true,
        },
      })

      if (!token) {
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid token',
        })
      }

      const jwt = signJwt({
        email: token.user.email,
        id: token.user.id,
      })

      ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: '/' }))

      return {
        redirect: token.redirect,
      }
    },
  })
  .query('me', {
    resolve({ ctx }) {
      return ctx.user
    },
  })


  .query('get-users', {
    resolve: async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany()

      return users
    }
  })