import { Router } from 'express'
import {
  followHandler,
  getMyBookmarks,
  getMyFollowers,
  getMyFollowings,
  getMyLikes,
  updateInfoHandler,
  updatePasswordHandler,
  uploadAvatarHandler
} from '@api/controllers/user.controller'
import { authenticate, multerSingleFile, validate } from '@api/middlewares'
import {
  updateInfoSchema,
  updatePasswordSchema
} from '@api/validator-schema/user.schema'

const router = Router()

router.get('/my-likes', authenticate, getMyLikes)

router.get('/my-bookmarks', authenticate, getMyBookmarks)

router.get('/my-followers', authenticate, getMyFollowers)

router.get('/my-followings', authenticate, getMyFollowings)

router.post(
  '/upload-avatar',
  authenticate,
  multerSingleFile('avatar'),
  uploadAvatarHandler
)

router.post('/follow', authenticate, followHandler)

router.patch(
  '/update-info',
  authenticate,
  updateInfoSchema,
  validate,
  updateInfoHandler
)

router.patch(
  '/update-password',
  authenticate,
  updatePasswordSchema,
  validate,
  updatePasswordHandler
)

export default router
