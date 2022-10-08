import { checkSchema } from 'express-validator'
import { required } from '../error/validator-error-message'

export const createTagSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: required('name')
    }
  }
})
