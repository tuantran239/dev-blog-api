import { Request, Response } from 'express'
import { CommonErrorResponse } from '@api/error/http-error'
import { getAllPost } from '@api/services/post.service'
import { getAllUser } from '@api/services/user.service'
import { HttpResponse } from '@api/utils'
import { FilterSearch } from '@api/utils/filter'
import { projectionCons } from '@api/constants'

export const searchHandler = async (req: Request, res: Response) => {
  const filter = req.body.filter || 'post'
  const { filters, options } = FilterSearch(req.query)

  let err, results, records

  if (filter === 'post' || filter === 'tag') {
    const { error, data } = await getAllPost(
      filters,
      projectionCons.Post.all,
      Object.assign(options, {
        populate: { path: 'author', select: 'name avatar' }
      })
    )
    err = error
    results = data
    records = data?.length
  } else if (filter === 'user') {
    const { error, data } = await getAllUser(filters, '', options)
    err = error
    results = data
    records = data?.length
  }

  if (err) {
    return CommonErrorResponse(res, err)
  }

  return HttpResponse(res, 200, {
    success: true,
    records,
    results
  })
}
