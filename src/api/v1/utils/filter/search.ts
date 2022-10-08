export const FilterSearch = ({
  q = '',
  sort = 'newest',
  index = '',
  filter
}: any) => {
  let filters = {}
  let options = {}

  const f = filter || 'post'

  if (f === 'post' || f === 'user') {
    filters = Object.assign(filters, {
      $text: { $search: q }
    })
  } else if (f === 'tag') {
    filters = Object.assign(filters, {
      tags: `#${q}`
    })
  }

  if (sort === 'newest') {
    options = Object.assign(options, { sort: { _id: -1 } })
    if (index && (index as string).trim().length > 0) {
      filters = Object.assign(filters, { _id: { $lt: index } })
    }
  } else if (sort === 'oldest') {
    options = Object.assign(options, { sort: { _id: 1 } })
    if (index && (index as string).trim().length > 0) {
      filters = Object.assign(filters, { _id: { $gt: index } })
    }
  }

  options = Object.assign(options, { limit: 100 })

  return { filters, options }
}
