import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '../../server/src/trpc/route/app.router'

export type TQuery = keyof AppRouter['_def']['queries']

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

export interface CtxUser {
  id: string
  email: string
  name: string
  iat: string
  exp: number
}

