import { FuncHandleHGet, FuncHandleHSet } from '@api/utils/functions/functionRedis'
import { RedisKeys } from '@api/utils/keys'

const { authKey } = RedisKeys

export const hSetPost = async (postId: string, field: any) =>
  FuncHandleHSet(authKey(postId), field)

export const hGetPost = async (postId: string) => FuncHandleHGet(authKey(postId))
