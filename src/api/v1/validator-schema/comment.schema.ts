import { checkSchema } from 'express-validator'
import { required } from '../error/validator-error-message'

export const createCommentSchema = checkSchema({
  comment: {
    notEmpty: {
      errorMessage: required('comment')
    }
  }
})


export const createReplySchema = checkSchema({
  reply: {
    notEmpty: {
      errorMessage: required('reply')
    }
  }
})
