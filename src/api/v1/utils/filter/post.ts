export const FilterPosts = ({ q = '', sort = 'newest', index = '' }: any) => {
  let filters = {}
  let options = {}

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

// db.posts.find({ tags: '#nodejs', _id: { $gt: 6337bddb79398e4478c5dbef } }).limit(50).explain('executionStats')
