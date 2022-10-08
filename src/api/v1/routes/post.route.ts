import { Router } from 'express'
import { authenticate, validate } from '@api/middlewares'
import {
  bookmarkPostHandler,
  createPostHanlder,
  deletePostHanlder,
  getAllPostHanlder,
  getPostHanlder,
  likePostAllHandler,
  likePostHandler,
  updatePostHanlder
} from '@api/controllers/post.controller'
import { createPostSchema } from '@api/validator-schema/post.schema'

const router = Router()

router.get('/one/:id', getPostHanlder)

router.get('/all', getAllPostHanlder)

router.post('/', createPostSchema, validate, authenticate, createPostHanlder)

router.put('/:id', authenticate, updatePostHanlder)

router.delete('/:id', authenticate, deletePostHanlder)

router.post('/like', authenticate, likePostHandler)

router.post('/like/all', likePostAllHandler)

router.post('/bookmark', authenticate, bookmarkPostHandler)

export default router
