import { projectionCons } from '@api/constants'
import { CommonErrorResponse } from '@api/error/http-error'
import { createTag, deleteTag, getAllTag } from '@api/services/tag.service'
import { HttpResponse } from '@api/utils'
import { FilterPostTag } from '@api/utils/filter'
import { Request, Response } from 'express'

export const createTagHanlder = async (req: Request, res: Response) => {
  const arr = (req.body.name as string).replace('#', '').split('')
  arr.unshift('#')
  const name = arr.join('')

  const { error } = await createTag({ name })
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, { success: true })
}

export const getAllTagHanlder = async (req: Request, res: Response) => {
  console.log(global.socket)
  const { data: tags } = await getAllTag({})
  return HttpResponse(res, 200, { success: true, tags: tags || [] })
}

export const getPostTagHanlder = async (req: Request, res: Response) => {
  const { filters, options } = FilterPostTag(req.query)

  const { data: posts } = await getAllTag(
    filters,
    projectionCons.Post.all,
    Object.assign(options, {
      populate: { path: 'author', select: projectionCons.User.post }
    })
  )

  return HttpResponse(res, 200, { success: true, posts: posts || [] })
}

export const deleteTagHanlder = async (req: Request, res: Response) => {
  const { error } = await deleteTag({ _id: req.params.id })
  if (error) {
    return CommonErrorResponse(res, error)
  }

  return HttpResponse(res, 200, { success: true })
}
