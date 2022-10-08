import { Router } from 'express'
import { serverCons } from '@api/constants'
import authRoutes from './auth.route'
import authSocialRoutes from './authsocial.route'
import userRoutes from './user.route'
import postRoutes from './post.route'
import searchRoutes from './search.route'
import tagRoutes from './tag.route'
import commentRoutes from './comment.route'

const routes = Router()

routes.use(serverCons.routes.auth, authRoutes)

routes.use(serverCons.routes.authSocial, authSocialRoutes)

routes.use(serverCons.routes.user, userRoutes)

routes.use(serverCons.routes.post, postRoutes)

routes.use(serverCons.routes.search, searchRoutes)

routes.use(serverCons.routes.tag, tagRoutes)

routes.use(serverCons.routes.comment, commentRoutes)

export default routes
