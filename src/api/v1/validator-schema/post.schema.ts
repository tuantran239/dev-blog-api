import { checkSchema } from 'express-validator'
import { required } from '../error/validator-error-message'

export const createPostSchema = checkSchema({
  title: {
    notEmpty: {
      errorMessage: required('title')
    }
  },
  body: {
    notEmpty: {
      errorMessage: required('body')
    }
  },
  tags: {
    notEmpty: {
      errorMessage: required('tags')
    }
  }
})
