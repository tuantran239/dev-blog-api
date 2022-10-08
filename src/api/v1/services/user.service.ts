import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose'
import User, { UserDocument } from '@api/models/User'
import { destroyCloudinary, uploadToCloudinary } from '@api/utils/cloudinary'
import { FuncHandleService } from '@api/utils/functions/funcService'
import { createDoc, getDoc, getAllDocs, deleteDoc, updateDoc, docExist } from './db.service'

export const createUser = (body: Partial<UserDocument>) =>
  createDoc('Error create user', User, body)

export const getUserExist = (
  exist: boolean,
  filter?: FilterQuery<UserDocument>,
  projection?: ProjectionType<UserDocument>,
  options?: QueryOptions<UserDocument>
) => docExist('Error get user exist', User, 'User', exist, filter, projection, options)

export const getUser = (
  filter?: FilterQuery<UserDocument>,
  projection?: ProjectionType<UserDocument>,
  options?: QueryOptions<UserDocument>
) => getDoc('Error get user', User, filter, projection, options)

export const getAllUser = (
  filter: FilterQuery<UserDocument>,
  projection?: ProjectionType<UserDocument>,
  options?: QueryOptions<UserDocument>
) => getAllDocs('Error get all users', User, filter, projection, options)

export const deleteUser = (
  filter: FilterQuery<UserDocument>,
  options?: QueryOptions<UserDocument>
) => deleteDoc('Error delete user', User, filter, options)

export const updateUser = (
  filter: FilterQuery<UserDocument>,
  update?: UpdateQuery<UserDocument>,
  options?: QueryOptions<UserDocument>
) => updateDoc('Error update user', User, filter, update, options)

export const deleteAvatar = (publicId: any) =>
  FuncHandleService('Error delete avatar', async () => {
    if (publicId === null) return true
    await destroyCloudinary(publicId)
    return true
  })
