const User = {
  post: 'name avatar -_id',
  all: 'name avatar -_id'
}

const Post = {
  all: 'title mainImage tags url author',
  one: 'title body mainImage tags url author createdAt'
}

const Comment = {
  all: 'comments',
  reply: 'reply user -_id'
}

const projectionCons = {
  Post,
  Comment,
  User
}

export default projectionCons
