export const FilterMyLikes = ({ sort = 'newest', index = '' }: any) => {
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

  options = Object.assign(options, { limit: 50 })

  return { filters, options }
}

export const FilterMyBookmarks = ({ sort = 'newest', index = '' }: any) => {
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

  options = Object.assign(options, { limit: 50 })

  return { filters, options }
}


export const FilterMyFollows = ({ sort = 'newest', index = '' }: any) => {
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

  options = Object.assign(options, { limit: 50 })

  return { filters, options }
}
