import { serverConf } from '@config'

const commonRoute = `/api/${serverConf.version}`

const routes = {
  auth: `${commonRoute}/auth`,
  authSocial: '/api',
  user: `${commonRoute}/user`,
  post: `${commonRoute}/post`,
  search: `${commonRoute}/search`,
  tag: `${commonRoute}/tag`,
  comment: `${commonRoute}/comment`
}

const serverCons = {
  routes,
  commonRoute
}

export default serverCons
