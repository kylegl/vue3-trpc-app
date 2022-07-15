import {z} from 'zod'

export const contactSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  clientId: z.string()
})

export type ContactSchema = z.infer<typeof contactSchema>