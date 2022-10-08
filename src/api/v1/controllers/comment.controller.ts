import { projectionCons } from '@api/constants'
import { CommonErrorResponse } from '@api/error/http-error'
import { getAllComment, updateComment } from '@api/services/comment.service'
import { HttpResponse } from '@api/utils'
import { filterComments } from '@api/utils/filter'
import { Request, Response } from 'express'

export const createCommentHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { postId, comment, author } = req.body
  const _postId = new RegExp(`${postId}_`)

  const { error } = await updateComment(
    {
      postId: _postId,
      count: { $lt: 100 }
    },
    {
      $push: {
        comments: {
          user: user._id,
          comment,
          date: new Date()
        }
      },
      $inc: { count: 1 },
      $setOnInsert: {
        postId: `${postId}_${new Date().getTime()}`,
        author
      }
    },
    {
      new: true,
      upsert: true
    }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 201, {
    success: true
  })
}

export const createReplyHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { commentId, id, reply } = req.body

  const { error } = await updateComment(
    {
      _id: id,
      'comments._id': commentId
    },
    {
      $push: {
        'comments.0.replies': {
          reply,
          user: user._id
        }
      }
    },
    {
      upsert: true,
      new: true
    }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true
  })
}

export const getAllCommentHanlder = async (req: Request, res: Response) => {
  const { filters, options } = filterComments(req.query)

  const { data, error } = await getAllComment(
    filters,
    projectionCons.Comment.all,
    Object.assign(options, {
      populate: [
        {
          path: 'comments.user',
          model: 'User',
          select: projectionCons.User.post
        },
        {
          path: 'comments.replies.user',
          model: 'User',
          select: projectionCons.User.post
        }
      ]
    })
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true,
    comments: data
  })
}

export const deleteCommentHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user

  const { commentId } = req.body

  const { error } = await updateComment(
    {
      $or: [
        { _id: req.params.id, author: user._id },
        { _id: req.params.id, 'comments.user': user._id }
      ]
    },
    {
      $pull: { comments: { _id: commentId } }
    }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true
  })
}

export const deleteReplyHanlder = async (req: Request, res: Response) => {
  const user = res.locals.user

  const { replyId } = req.body

  const { error } = await updateComment(
    {
      $or: [
        { _id: req.params.id, author: user._id },
        { _id: req.params.id, 'comments.user': user._id },
        { _id: req.params.id, 'comments.replies.user': user._id }
      ]
    },
    {
      $pull: { 'comments.0.replies': { _id: replyId } }
    }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true
  })
}
