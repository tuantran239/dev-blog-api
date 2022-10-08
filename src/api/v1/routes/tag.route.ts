import { Router } from 'express'
import { createTagHanlder } from '@api/controllers/tag.controller'
import { createTagSchema } from '@api/validator-schema/tag.schema'
import { validate } from '@api/middlewares'

const router = Router()

router.post('/', createTagSchema, validate, createTagHanlder)

export default router
