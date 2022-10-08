import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Following, { FollowingDocument } from '@api/models/Following'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'

export const createFollowing = (body: Partial<FollowingDocument>) =>
  createDoc('Error create Following', Following, body)

export const getFollowingExist = (
  exist: boolean,
  filter?: FilterQuery<FollowingDocument>,
  projection?: ProjectionType<FollowingDocument>,
  options?: QueryOptions<FollowingDocument>
) =>
  docExist(
    'Error get Following exist',
    Following,
    'Following',
    exist,
    filter,
    projection,
    options
  )

export const getFollowing = (
  filter?: FilterQuery<FollowingDocument>,
  projection?: ProjectionType<FollowingDocument>,
  options?: QueryOptions<FollowingDocument>
) => getDoc('Error get Following', Following, filter, projection, options)

export const getAllFollowing = (
  filter: FilterQuery<FollowingDocument>,
  projection?: ProjectionType<FollowingDocument>,
  options?: QueryOptions<FollowingDocument>
) =>
  getAllDocs('Error get all Followings', Following, filter, projection, options)

export const deleteFollowing = (
  filter: FilterQuery<FollowingDocument>,
  options?: QueryOptions<FollowingDocument>
) => deleteDoc('Error delete Following', Following, filter, options)

export const updateFollowing = (
  filter: FilterQuery<FollowingDocument>,
  update?: UpdateQuery<FollowingDocument>,
  options?: QueryOptions<FollowingDocument>
) => updateDoc('Error update Following', Following, filter, update, options)
