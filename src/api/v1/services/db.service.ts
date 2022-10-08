import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import { throwValidationError } from '@api/error/mongodb-error'
import { FuncHandleService } from '@api/utils/functions/funcService'

export const createDoc = <T>(log: string, model: Model<T>, body: Partial<T>) =>
  FuncHandleService(log, async () => {
    const data = await model.create(body)
    return data
  })

export const docExist = <T>(
  log: string,
  model: Model<T>,
  path: string,
  exist: boolean,
  filter?: FilterQuery<T>,
  projection?: ProjectionType<T>,
  options?: QueryOptions<T>
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOne(filter, projection, options)
    if (data && exist) {
      throwValidationError(path, `${path} already exist`, true)
    } else if (!data && !exist) {
      throwValidationError(path, `${path} not found`, true)
    }
    return data
  })

export const getNumberOfDocs = <T>(
  log: string,
  model: Model<T>,
  filter: FilterQuery<T>
) =>
  FuncHandleService(log, async () => {
    const data = await model.find(filter, '_id').count()
    return data
  })

export const getDoc = <T>(
  log: string,
  model: Model<T>,
  filter?: FilterQuery<T>,
  projection?: ProjectionType<T>,
  options?: QueryOptions<T>
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOne(filter, projection, options)
    return data
  })

export const getAllDocs = <T>(
  log: string,
  model: Model<T>,
  filter: FilterQuery<T>,
  projection?: ProjectionType<T>,
  options?: QueryOptions<T>
) =>
  FuncHandleService(log, async () => {
    const data = await model.find(filter, projection, options)
    return data
  })

export const deleteDoc = <T>(
  log: string,
  model: Model<T>,
  filter: FilterQuery<T>,
  options?: QueryOptions<T>
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOneAndRemove(filter, options)
    if (!data) {
      throwValidationError('Doc', 'Not found', true)
    }
    return data
  })

const deleteManyAsync = <T>(
  model: Model<T>,
  filter?: FilterQuery<T>,
  options?: QueryOptions<T>
) => {
  return new Promise((resolve, reject) => {
    model.deleteMany(filter, options, (err) => {
      if (err) {
        throw err
      }
      return resolve(true)
    })
  })
}

export const deleteDocs = <T>(
  log: string,
  model: Model<T>,
  filter?: FilterQuery<T>,
  options?: QueryOptions<T>
) =>
  FuncHandleService(log, async () => {
    await deleteManyAsync<T>(model, filter, options)
    return true
  })

export const updateDoc = <T>(
  log: string,
  model: Model<T>,
  filter: FilterQuery<T>,
  update?: UpdateQuery<T>,
  options?: QueryOptions<T>
) =>
  FuncHandleService(log, async () => {
    const data = await model.findOneAndUpdate(filter, update, options)
    if (!data) {
      throwValidationError('Doc', 'Not found', true)
    }
    return data
  })
