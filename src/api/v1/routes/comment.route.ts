import { Router } from 'express'
import { authenticate, validate } from '@api/middlewares'
import {
  createCommentHanlder,
  createReplyHanlder,
  deleteCommentHanlder,
  deleteReplyHanlder,
  getAllCommentHanlder
} from '@api/controllers/comment.controller'
import {
  createCommentSchema,
  createReplySchema
} from '@api/validator-schema/comment.schema'

const router = Router()

router.get('/all', getAllCommentHanlder)

router.post(
  '/',
  createCommentSchema,
  validate,
  authenticate,
  createCommentHanlder
)

router.post(
  '/reply',
  createReplySchema,
  validate,
  authenticate,
  createReplyHanlder
)

router.post('/delete/:id', authenticate, deleteCommentHanlder)

router.post('/delete/reply/:id', authenticate, deleteReplyHanlder)

export default router
