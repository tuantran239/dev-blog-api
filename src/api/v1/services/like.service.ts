import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Like, { LikeDocument } from '@api/models/Like'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'

export const createLike = (body: Partial<LikeDocument>) =>
  createDoc('Error create Like', Like, body)

export const getLikeExist = (
  exist: boolean,
  filter?: FilterQuery<LikeDocument>,
  projection?: ProjectionType<LikeDocument>,
  options?: QueryOptions<LikeDocument>
) =>
  docExist(
    'Error get Like exist',
    Like,
    'Like',
    exist,
    filter,
    projection,
    options
  )

export const getLike = (
  filter?: FilterQuery<LikeDocument>,
  projection?: ProjectionType<LikeDocument>,
  options?: QueryOptions<LikeDocument>
) => getDoc('Error get Like', Like, filter, projection, options)

export const getAllLike = (
  filter: FilterQuery<LikeDocument>,
  projection?: ProjectionType<LikeDocument>,
  options?: QueryOptions<LikeDocument>
) => getAllDocs('Error get all Likes', Like, filter, projection, options)

export const deleteLike = (
  filter: FilterQuery<LikeDocument>,
  options?: QueryOptions<LikeDocument>
) => deleteDoc('Error delete Like', Like, filter, options)

export const updateLike = (
  filter: FilterQuery<LikeDocument>,
  update?: UpdateQuery<LikeDocument>,
  options?: QueryOptions<LikeDocument>
) => updateDoc('Error update Like', Like, filter, update, options)
