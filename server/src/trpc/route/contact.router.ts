import { contactSchema } from "../../schema/contact.schema"
import { createRouter } from "../createRouter"

export const contactRouter = createRouter()
  .mutation('create-contact', {
    input: contactSchema,
    async resolve({ ctx, input }) {
      const {  name, email, phone, role, clientId } = input
      const contact = await ctx.prisma.contact.create({
        data: {
          name,
          email,
          phone,
          role,
          client: {
            connect: {
              id: clientId,
            },
          }
        },
      })

      return contact
    }
  })
  .mutation('update-contact', {
    input: contactSchema,
    async resolve({ ctx, input }) {
      const { id, name, email, phone, role } = input
      const contact = await ctx.prisma.contact.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
          role,
        },
      })

      return contact
    }
  })
  .mutation('delete-contact', {
    input: contactSchema,
    async resolve({ ctx, input }) {
      const { id } = input
      const contact = await ctx.prisma.contact.delete({
        where: {
          id,
        },
      })

      return contact
    }
  })
  .query('get-contacts', {
    async resolve({ ctx }) {
      const contacts = await ctx.prisma.contact.findMany()

      return contacts
    }
  })
  .query('get-contacts-by-client-id', {
    input: contactSchema,
    async resolve({ ctx, input }) {
      const { clientId } = input
      const contacts = await ctx.prisma.contact.findMany({
        where: {
          client: {
            id: clientId,
          },
        },
      })

      return contacts
    }
  })
