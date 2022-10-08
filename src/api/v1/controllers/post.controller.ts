import { Request, Response } from 'express'
import Post from '@api/models/Post'
import { projectionCons, serverCons } from '@api/constants'
import {
  CommonErrorResponse,
  generateError,
  InternalServerErrorResponse
} from '@api/error/http-error'
import {
  deletePost,
  getAllPost,
  getPost,
  getPostExist,
  updatePost
} from '@api/services/post.service'
import { HttpResponse } from '@api/utils'
import { FilterPosts } from '@api/utils/filter'
import { serverConf } from '@config'
import { createLike, deleteLike, getLike } from '@api/services/like.service'
import {
  createBookmark,
  deleteBookmark,
  getBookmark
} from '@api/services/bookmark.service'

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

  const { data: posts, error } = await getAllPost(
    filters,
    projectionCons.Post.all,
    Object.assign(options, {
      populate: { path: 'author', select: 'name avatar' }
    })
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true,
    records: posts?.length,
    posts
  })
}

export const getPostHanlder = async (req: Request, res: Response) => {
  const { id } = req.params

  const { error, data: post } = await getPostExist(
    false,
    { _id: id },
    projectionCons.Post.one
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true,
    post
  })
}

export const updatePostHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { id } = req.params

  const { error } = await updatePost(
    { _id: id, author: user.id },
    {
      $set: { ...req.body }
    }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

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

  if (!like) {
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
  } else {
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

  if (!bookmark) {
    await createBookmark({
      user: user.id,
      post: postId
    })
  } else {
    await deleteBookmark({
      user: user.id,
      post: postId
    })
  }

  return HttpResponse(res, 200, { success: true })
}
