import { Router } from 'express'
import {
  deleteTagHanlder,
  createTagHanlder,
  getAllTagHanlder,
  getPostTagHanlder
} from '@api/controllers/tag.controller'
import { createTagSchema } from '@api/validator-schema/tag.schema'
import { authenticate, validate } from '@api/middlewares'

const router = Router()

router.post('/', authenticate, createTagSchema, validate, createTagHanlder)

router.get('/all', getAllTagHanlder)

router.get('/', getPostTagHanlder)

router.delete('/:id', authenticate, deleteTagHanlder)

export default router
