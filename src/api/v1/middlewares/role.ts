import { NextFunction, Request, Response } from 'express'
import { ForbiddenResponse } from '@api/error/http-error'
import { Role } from '@api/types'

export const authRole =
  (roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    const role = user?.role || ''

    if (!roles.includes(role)) {
      return ForbiddenResponse(res, [
        {
          message: 'Not Permission',
          field: 'role'
        }
      ])
    }

    next()
  }
