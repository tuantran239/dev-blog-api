import { Request, Response } from 'express'
import Post from '@api/models/Post'
import { projectionCons, serverCons } from '@api/constants'
import {
  BadRequestResponse,
  CommonErrorResponse,
  generateError,
  InternalServerErrorResponse
} from '@api/error/http-error'
import {
  deletePost,
  getAllPost,
  getPost,
  updatePost
} from '@api/services/post.service'
import { checkType, HttpResponse } from '@api/utils'
import { FilterPosts } from '@api/utils/filter'
import { serverConf } from '@config'
import { createLike, deleteLike } from '@api/services/like.service'
import { createBookmark, deleteBookmark } from '@api/services/bookmark.service'
import { hGetPost, hSetPost } from '@api/services/redis.service'

export const createPostHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user

  const post = new Post({
    ...req.body,
    author: req.body.author || user.id
  })
  post.url = `${serverConf.domain}${serverCons.routes.post}/one/${post.id}`
  await post.save()

  return HttpResponse(res, 201, { success: true })
}

export const getAllPostHanlder = async (req: Request, res: Response) => {
  const { filters, options } = FilterPosts(req.query)

  const { data: posts } = await getAllPost(
    filters,
    projectionCons.Post.all,
    Object.assign(options, {
      populate: { path: 'author', select: projectionCons.User.post }
    })
  )

  return HttpResponse(res, 200, {
    success: true,
    records: posts?.length,
    posts: posts || []
  })
}

export const getPostHanlder = async (req: Request, res: Response) => {
  const { id } = req.params

  const postCache = await hGetPost(id)
  if (postCache) {
    return HttpResponse(res, 200, {
      success: true,
      post: postCache
    })
  }

  const { data: post } = await getPost({ _id: id }, projectionCons.Post.one)
  if (post) {
    await hSetPost(id, post)
  }

  return HttpResponse(res, 200, {
    success: true,
    post: post || {}
  })
}

export const updatePostHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { id } = req.params

  const { error, data } = await updatePost(
    { _id: id, author: user.id },
    {
      $set: { ...req.body }
    }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }
  await hSetPost(id, data)

  return HttpResponse(res, 200, {
    success: true
  })
}

export const deletePostHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { id } = req.params

  const { error } = await deletePost({ _id: id, author: user })
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true
  })
}

export const likePostHandler = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { postId, like } = req.body

  if (checkType(like, 'boolean') && !like) {
    const data = await Promise.all([
      createLike({
        user: user.id,
        post: postId
      }),
      updatePost(
        {
          _id: postId
        },
        {
          $inc: { likes: 1 }
        }
      )
    ])
    const error = data.some((d: any) => d.error !== undefined)
    if (error) {
      return InternalServerErrorResponse(
        res,
        generateError('Error Like post', 'Server')
      )
    }
  } else if (checkType(like, 'boolean') && like) {
    const data = await Promise.all([
      deleteLike({
        user: user.id,
        post: postId
      }),
      updatePost(
        {
          _id: postId,
          likes: { $gt: 1 }
        },
        {
          $inc: { likes: -1 }
        }
      )
    ])
    const error = data.some((d: any) => d.error !== undefined)
    if (error) {
      return InternalServerErrorResponse(
        res,
        generateError('Error Like post', 'Server')
      )
    }
  } else {
    return BadRequestResponse(res, generateError('Type not match', 'Like'))
  }

  return HttpResponse(res, 200, { success: true })
}

export const likePostAllHandler = async (req: Request, res: Response) => {
  const users = ['6337b5a8c39ce85721d34e85', '6337b5b0c39ce85721d34e89']

  for (let i = 1; i <= 5000; i++) {
    const userRandom = Math.floor(Math.random() * users.length)
    let user = users[userRandom]

    if (i === 1 || i === 5000) {
      user = '633671d30c38fe951a69df0c'
    }

    const { data } = await getPost({ title: `post title ${i}` })
    await createLike({
      user,
      post: data?.id
    })
  }

  return HttpResponse(res, 200, { success: true })
}

export const bookmarkPostHandler = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { postId, bookmark } = req.body

  if (checkType(bookmark, 'boolean') && !bookmark) {
    await createBookmark({
      user: user.id,
      post: postId
    })
  } else if (checkType(bookmark, 'boolean') && bookmark) {
    await deleteBookmark({
      user: user.id,
      post: postId
    })
  } else {
    return BadRequestResponse(res, generateError('Type not match', 'Bookmark'))
  }

  return HttpResponse(res, 200, { success: true })
}
