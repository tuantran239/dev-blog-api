import { FuncHandleHGet, FuncHandleHSet } from '@api/utils/functions/functionRedis'
import { RedisKeys } from '@api/utils/keys'

const { authKey } = RedisKeys

export const hSetAuth = async (userId: string, field: any) =>
  FuncHandleHSet(authKey(userId), field)

export const hGetAuth = async (userId: string) => FuncHandleHGet(authKey(userId))
