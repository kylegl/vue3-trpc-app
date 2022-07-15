import { z } from 'zod'

export const clientSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export type ClientSchema = z.infer<typeof clientSchema>
