import { Router } from 'express'
import { searchHandler } from '@api/controllers/search.controller'

const router = Router()

router.get('/', searchHandler)

export default router
