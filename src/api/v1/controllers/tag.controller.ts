import { CommonErrorResponse } from '@api/error/http-error'
import { createTag } from '@api/services/tag.service'
import { HttpResponse } from '@api/utils'
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

export const getAllTagHanlder = async (req: Request, res: Response) => {}
export const getTagHanlder = async (req: Request, res: Response) => {}
export const updateTagHanlder = async (req: Request, res: Response) => {}
export const deleteTagHanlder = async (req: Request, res: Response) => {}
