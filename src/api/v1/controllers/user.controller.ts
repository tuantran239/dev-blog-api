import { Request, Response } from 'express'
import {
  deleteAvatar,
  getUserExist,
  updateUser
} from '@api/services/user.service'
import {
  BadRequestResponse,
  CommonErrorResponse,
  InternalServerErrorResponse,
  generateError
} from '@api/error/http-error'
import { checkType, generateAvatarUrl, HttpResponse } from '@api/utils'
import { uploadFile } from '@api/services/upload.service'
import { cloudinaryCons, projectionCons } from '@api/constants'
import {
  createFollowing,
  deleteFollowing,
  getAllFollowing
} from '@api/services/following.service'
import {
  deleteFollower,
  createFollower,
  getAllFollower
} from '@api/services/follower.service'
import { FilterMyLikes } from '@api/utils/filter'
import { getAllLike } from '@api/services/like.service'
import { FilterMyBookmarks, FilterMyFollows } from '@api/utils/filter/user'
import { getAllBookmark } from '@api/services/bookmark.service'
import { notificationWorker } from '@api/worker/notification-worker'
import { NotificationType } from '@api/types/notification'

export const uploadAvatarHandler = async (req: Request, res: Response) => {
  const file = req.file
  const user = res.locals.user

  const { error: errorDel } = await deleteAvatar(user?.avatar.public_id)
  if (errorDel) {
    return InternalServerErrorResponse(res, errorDel.error)
  }

  const { error, data: result } = await uploadFile(
    cloudinaryCons.folder('avatar', user?.id),
    file,
    { width: 320, height: 320 }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  await updateUser(
    { _id: user?.id },
    {
      avatar: result || { public_id: null, url: generateAvatarUrl(user?.name) }
    }
  )

  return HttpResponse(res, 200, { success: true })
}

export const updateInfoHandler = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { email, name, skills, bio } = req.body

  const { error } = await updateUser(
    { _id: user?.id },
    { email, name, skills, bio }
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, { success: true })
}

export const updatePasswordHandler = async (req: Request, res: Response) => {
  const { password, newPassword } = req.body
  const user = res.locals.user

  const { error: errorExist, data: u } = await getUserExist(false, {
    _id: user?.id
  })
  if (errorExist) {
    return CommonErrorResponse(res, errorExist)
  }

  const isMatch = await u?.comparePassword(password)
  if (!isMatch) {
    return BadRequestResponse(
      res,
      generateError('Password not match', 'password')
    )
  }

  u!!.password = newPassword
  await u!!.save()

  return HttpResponse(res, 200, { success: true })
}

export const followHandler = async (req: Request, res: Response) => {
  const user = res.locals.user
  const { userId, follow } = req.body

  if (checkType(follow, 'boolean') && !follow) {
    const data = await Promise.all([
      createFollowing({ user: user.id, following: userId }),
      createFollower({ user: userId, follower: user.id }),
      updateUser({ _id: user.id }, { $inc: { following: 1 } }),
      updateUser({ _id: userId }, { $inc: { follower: 1 } })
    ])
    const error = data.some((d: any) => d.error !== undefined)
    if (error) {
      return InternalServerErrorResponse(
        res,
        generateError('Error follow', 'Server')
      )
    }
    await notificationWorker({
      sender: user.id,
      receiver: userId,
      notificationType: NotificationType.FOLLOW,
      message: 'follow'
    })
  } else if (checkType(follow, 'boolean') && follow) {
    const data = await Promise.all([
      deleteFollowing({ user: user.id, following: userId }),
      deleteFollower({ user: userId, follower: user.id }),
      updateUser({ _id: user.id }, { $inc: { following: -1 } }),
      updateUser({ _id: userId }, { $inc: { follower: -1 } })
    ])
    const error = data.some((d: any) => d.error !== undefined)
    if (error) {
      return InternalServerErrorResponse(
        res,
        generateError('Error follow', 'Server')
      )
    }
  } else {
    return BadRequestResponse(res, generateError('Type not match', 'Follow'))
  }

  return HttpResponse(res, 200, { success: true })
}

export const getMyLikes = async (req: Request, res: Response) => {
  const user = res.locals.user

  const { filters, options } = FilterMyLikes(req.query)
  const { data: myLikes, error } = await getAllLike(
    Object.assign(filters, { user: user.id }),
    '',
    Object.assign(options, {
      populate: {
        path: 'post',
        select: projectionCons.Post.all
      }
    })
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true,
    records: myLikes?.length,
    myLikes
  })
}

export const getMyBookmarks = async (req: Request, res: Response) => {
  const user = res.locals.user

  const { filters, options } = FilterMyBookmarks(req.query)
  const { data: myBookmarks, error } = await getAllBookmark(
    Object.assign(filters, { user: user.id }),
    '',
    Object.assign(options, {
      populate: {
        path: 'post',
        model: 'Post',
        select: projectionCons.Post.all,
        populate: {
          path: 'author',
          model: 'User',
          select: projectionCons.User.post
        }
      }
    })
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true,
    records: myBookmarks?.length,
    myBookmarks
  })
}

export const getMyFollowers = async (req: Request, res: Response) => {
  const user = res.locals.user

  const { filters, options } = FilterMyFollows(req.query)
  const { data: myFollowers, error } = await getAllFollower(
    Object.assign(filters, { user: user.id }),
    'follower',
    Object.assign(options, {
      populate: {
        path: 'follower',
        model: 'User',
        select: projectionCons.User.all
      }
    })
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true,
    records: myFollowers?.length,
    myFollowers
  })
}

export const getMyFollowings = async (req: Request, res: Response) => {
  const user = res.locals.user

  const { filters, options } = FilterMyFollows(req.query)
  const { data: myFollowings, error } = await getAllFollowing(
    Object.assign(filters, { user: user.id }),
    'following',
    Object.assign(options, {
      populate: {
        path: 'following',
        model: 'User',
        select: projectionCons.User.all
      }
    })
  )
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, {
    success: true,
    records: myFollowings?.length,
    myFollowings
  })
}
