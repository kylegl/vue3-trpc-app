import { useQuery as _useQuery } from 'vue-query'
import type {
  TRPCClientErrorLike,
  TRPCRequestOptions,
} from '@trpc/client'
import type {
  AnyRouter,
  ProcedureRecord,
  inferHandlerInput,
  inferProcedureInput,
  inferProcedureOutput,
} from '@trpc/server'
import type { UseQueryOptions, UseQueryReturnType } from 'vue-query'
import { client } from './trpcClient'

export interface TRPCUseQueryBaseOptions extends TRPCRequestOptions {
  /**
   * Opt out of SSR for this query by passing `ssr: false`
   */
  ssr?: boolean
}

export interface UseTRPCQueryOptions<TPath, TInput, TOutput, TData, TError>
  extends UseQueryOptions<TOutput, TError, TData, [TPath, TInput]>,
  TRPCUseQueryBaseOptions {}

type inferProcedures<
  TObj extends ProcedureRecord<any, any, any, any, any, any>,
> = {
  [TPath in keyof TObj]: {
    input: inferProcedureInput<TObj[TPath]>
    output: inferProcedureOutput<TObj[TPath]>
  };
}

type TQueryValues = inferProcedures<AnyRouter['_def']['queries']>

type TQueries = AnyRouter['_def']['queries']

type TError = TRPCClientErrorLike<AnyRouter>

function getClientArgs<TPathAndInput extends unknown[], TOptions>(
  pathAndInput: TPathAndInput,
  opts: TOptions,
) {
  const [path, input] = pathAndInput
  return [path, input, opts] as const
}

export function useQuery<
  TPath extends keyof TQueryValues & string,
  TQueryFnData = TQueryValues[TPath]['output'],
  TData = TQueryValues[TPath]['output'],
>(
  pathAndInput: [path: TPath, ...args: inferHandlerInput<TQueries[TPath]>],
  opts?: UseTRPCQueryOptions<
    TPath,
    TQueryValues[TPath]['input'],
    TQueryFnData,
    TData,
    TError
    >,
): UseQueryReturnType<TData, TError> {
  console.log('use query func', pathAndInput)
  return _useQuery(
    pathAndInput as any,
    () => ((client as any).query(...getClientArgs(pathAndInput, opts))),
    opts,
  )
}
