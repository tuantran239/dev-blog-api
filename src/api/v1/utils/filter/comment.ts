export const filterComments = ({ id, index = '' }: any) => {
  let filters = {}
  let options = {}

  const postId = new RegExp(`${id}_`)

  filters = Object.assign(filters, {
    postId
  })

  if (index && (index as string).trim().length > 0) {
    filters = Object.assign(filters, {
      _id: { $lt: index }
    })
  }

  options = Object.assign(options, {
    limit: 1,
    sort: {
      _id: -1
    }
  })

  return { filters, options }
}
